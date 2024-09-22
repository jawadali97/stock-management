import React from 'react'
import {
    Box,
    FormControl,
    Grid,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from '@mui/material';
import { useState, useEffect } from 'react';
import { LoadingButton } from '@mui/lab';
import { unitOptions } from '../app.constants';
import ProductsService from '../services/products.service';
import OrdersService from '../services/orders.service';

function ProductForm({ addProduct }) {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [unit, setUnit] = useState('kg');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);

        const data = { name, availableQuantity: quantity, unit }
        addProduct(data);
        clearForm()
        setIsLoading(false);
    };

    const clearForm = () => {
        setName('');
        setQuantity('')
    }

    return (
        <Box sx={{
            my: 5,
            px: 12,
            pb: 5,
            width: '100%',
            border: '1px solid lightgrey',
            borderRadius: 5,
        }}>
            <h3>Add Product</h3>
            <Grid container columnSpacing={2} rowSpacing={2}
                component="form"
                onSubmit={handleSubmit}>
                <Grid item xs={6} display='flex' justifyContent='left'>
                    <TextField
                        fullWidth
                        size="small"
                        required
                        id="name"
                        label="Product Name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Grid>

                <Grid item xs={5}>
                    <TextField
                        label="Quantity"
                        type="number"
                        placeholder='quantity'
                        size="small"
                        required
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={1}>
                    <FormControl >
                        <Select
                            size='small'
                            value={unit}
                            onChange={(e) => setUnit(e.target.value)}
                        >
                            {unitOptions.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} display='flex' justifyContent='right'>
                    <LoadingButton
                        loading={isLoading}
                        type="submit"
                        variant="contained"
                        sx={{ px: '30px' }}
                    >
                        Save
                    </LoadingButton>
                </Grid>
            </Grid>
        </Box >
    )
}

export default function ProductsManagement({ }) {
    const [products, setProducts] = useState([]);
    const [showFields, setShowFields] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, [])

    const fetchProducts = async () => {
        try {
            const response = await ProductsService.getAllProducts();
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const addProduct = async (data) => {
        try {
            const response = await ProductsService.createProduct(data);
            fetchProducts();
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const placeOrder = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const data = {
                products: products.filter(item => item.quantity).map(prod => ({ product: prod._id, orderedQuantity: prod.quantity }))
            }
            const response = await OrdersService.createOrder(data);
            setShowFields(false);
            fetchProducts();
        } catch (error) {
            console.error('Error creating order:', error);
        }
        setIsLoading(false);
    };

    // Event handler to update the quantity
    const handleQuantityChange = (index, newQuantity) => {
        setProducts(prevProducts =>
            prevProducts.map((product, i) =>
                i === index ? { ...product, quantity: parseFloat(newQuantity) } : product
            )
        );
    };

    // Event handler to update the unit
    const handleUnitChange = (index, newUnit) => {
        setProducts(prevProducts =>
            prevProducts.map((product, i) =>
                i === index ? { ...product, unit: newUnit } : product
            )
        );
    };

    return (

        <Grid container >
            <Grid item xs={12} px='200px'>
                <ProductForm addProduct={addProduct} />
            </Grid>
            {products.length > 0 &&
                <Grid item xs={12} sx={{ px: { md: '100px', lg: '150px', xl: '300px' } }}>
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer sx={{ maxHeight: 400 }}>
                            <Table stickyHeader aria-label="simple table">
                                <TableHead sx={{ backgroundColor: '#0F1431' }}>
                                    <TableRow>
                                        <TableCell width={50} sx={{ backgroundColor: '#0F1431', color: 'white' }}>Sr#</TableCell>
                                        <TableCell width={150} sx={{ backgroundColor: '#0F1431', color: 'white' }}>Product Name</TableCell>
                                        <TableCell width={150} sx={{ backgroundColor: '#0F1431', color: 'white' }}>Available Quantity</TableCell>
                                        {showFields && <TableCell width={180} align='left' sx={{ backgroundColor: '#0F1431', color: 'white' }}>Order Quantity</TableCell>}
                                    </TableRow>
                                </TableHead>
                                <TableBody >
                                    {products.map((prod, index) => (
                                        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{prod.name}</TableCell>
                                            <TableCell >{prod.availableQuantity + ' ' + prod.unit}</TableCell>
                                            {showFields &&
                                                <TableCell sx={{ py: '0px' }}>
                                                    <Grid key={index} container alignItems='center' >
                                                        <Grid item xs={6}>
                                                            <TextField
                                                                type="number"
                                                                placeholder='quantity'
                                                                size="small"
                                                                required
                                                                value={prod?.quantity}
                                                                onChange={(e) => handleQuantityChange(index, e.target.value)}
                                                                fullWidth
                                                            />
                                                        </Grid>
                                                        {/* <Grid item xs={4}>
                                                            <FormControl >
                                                                <Select
                                                                    size='small'
                                                                    value={prod.unit}
                                                                    onChange={(e) => handleUnitChange(index, e.target.value)}
                                                                >
                                                                    {unitOptions.map(option => (
                                                                        <MenuItem key={option.value} value={option.value}>
                                                                            {option.label}
                                                                        </MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>
                                                        </Grid> */}
                                                    </Grid>
                                                </TableCell>
                                            }
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>}
            {products.length > 0 &&
                <Grid item xs={12} display='flex' justifyContent='center' py={2}>
                    {!showFields ?
                        <LoadingButton
                            variant="contained"
                            sx={{ px: '30px' }}
                            onClick={() => setShowFields(true)}
                        >
                            Make an Order
                        </LoadingButton>
                        :
                        <LoadingButton
                            loading={isLoading}
                            type="submit"
                            variant="contained"
                            sx={{ px: '30px' }}
                            onClick={(e) => placeOrder(e)}
                        >
                            Order
                        </LoadingButton>
                    }
                </Grid>}
        </Grid>
    )
}