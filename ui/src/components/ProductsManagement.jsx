import React from 'react'
import {
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
import { CheckBoxOutlineBlank } from '@mui/icons-material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useState, useEffect } from 'react';
import { LoadingButton } from '@mui/lab';
import { unitOptions } from '../app.constants';

export default function ProductsManagement({ }) {
    const [products, setProducts] = useState([]);
    const [showFields, setShowFields] = useState(false);

    useEffect(() => {
        const productsData = [
            { name: 'Meat', availableQuantity: 3, unit: 'kg' },
            { name: 'Tomato', availableQuantity: 3, unit: 'kg' },
            { name: 'Bun', availableQuantity: 3, unit: 'kg' },
            { name: 'Bread', availableQuantity: 3, unit: 'pcs' },
            { name: 'Bread', availableQuantity: 3, unit: 'kg' },
            { name: 'Bread', availableQuantity: 3, unit: 'kg' },
            { name: 'Bread', availableQuantity: 3, unit: 'kg' },
            { name: 'Bread', availableQuantity: 3, unit: 'kg' },
            { name: 'Bread', availableQuantity: 3, unit: 'kg' },
            { name: 'Bread', availableQuantity: 3, unit: 'kg' },
            { name: 'Bread', availableQuantity: 3, unit: 'kg' },
            { name: 'Bread', availableQuantity: 3, unit: 'kg' },
            { name: 'Bread', availableQuantity: 3, unit: 'kg' },
            { name: 'Bread', availableQuantity: 3, unit: 'kg' },
            { name: 'Bread', availableQuantity: 3, unit: 'kg' },
            { name: 'Bread', availableQuantity: 3, unit: 'kg' },
            { name: 'Bread', availableQuantity: 3, unit: 'kg' },
            { name: 'Bread', availableQuantity: 3, unit: 'kg' },
            { name: 'Bread', availableQuantity: 3, unit: 'kg' },
            { name: 'Bread', availableQuantity: 3, unit: 'kg' },
            { name: 'Bread', availableQuantity: 3, unit: 'kg' },
            { name: 'Bread', availableQuantity: 3, unit: 'kg' },
            { name: 'Bread', availableQuantity: 3, unit: 'kg' },
            { name: 'Bread', availableQuantity: 3, unit: 'kg' },
            { name: 'Bread', availableQuantity: 3, unit: 'kg' },
            { name: 'Bread', availableQuantity: 3, unit: 'kg' },
            { name: 'Bread', availableQuantity: 3, unit: 'kg' },
        ];
        setProducts(productsData)
    }, [])

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

        <Grid container pt={8}>
            <Grid item xs={12}>
                <h2>Products</h2>
            </Grid>
            {products.length > 0 &&
                <Grid item xs={12} px='300px'>
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer sx={{ maxHeight: 500 }}>
                            <Table stickyHeader aria-label="simple table">
                                <TableHead sx={{ backgroundColor: '#0F1431' }}>
                                    <TableRow>
                                        <TableCell width={50} sx={{ backgroundColor: '#0F1431', color: 'white' }}>Sr#</TableCell>
                                        <TableCell width={150} sx={{ backgroundColor: '#0F1431', color: 'white' }}>Meal Name</TableCell>
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
                                                                sx={{ width: '100%' }}
                                                                size="small"
                                                                required
                                                                value={prod?.quantity}
                                                                onChange={(e) => handleQuantityChange(index, e.target.value)}
                                                                fullWidth
                                                            />
                                                        </Grid>
                                                        <Grid item xs={4}>
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
                                                        </Grid>
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
            <Grid item xs={12} display='flex' justifyContent='center' py={2}>
                {!showFields ?
                    <LoadingButton
                        // loading={isLoading}
                        type="submit"
                        variant="contained"
                        sx={{ px: '30px' }}
                        onClick={() => setShowFields(true)}
                    >
                        Make an Order
                    </LoadingButton>
                    :
                    <LoadingButton
                        // loading={isLoading}
                        type="submit"
                        variant="contained"
                        sx={{ px: '30px' }}
                        onClick={() => setShowFields(false)}
                    >
                        Order
                    </LoadingButton>
                }
            </Grid>
        </Grid>
    )
}