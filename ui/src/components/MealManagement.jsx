import * as React from 'react';
import {
    Autocomplete,
    Box,
    Button,
    Checkbox,
    createFilterOptions,
    FormControl,
    Grid,
    IconButton,
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
import { CheckBoxOutlineBlank, Delete } from '@mui/icons-material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useState, useEffect } from 'react';
import { LoadingButton } from '@mui/lab';
import { unitOptions } from '../app.constants';
import MealsService from '../services/meals.service';
import ProductsService from '../services/products.service';

const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function MealForm({ addUpdateMeal }) {
    const [name, setName] = useState('');
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const filter = createFilterOptions();

    /**
     * Hook called on page load
     */
    useEffect(() => { fetchProducts() }, []);

    /**
     * Function to make API call to fetch products
     */
    const fetchProducts = async () => {
        try {
            const response = await ProductsService.getAllProducts();
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    /**
     * Handler function to handle save button
     * @param {*} event 
     */
    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        const data = {
            name,
            products: selectedProducts.map(prod => ({ product: prod._id, quantity: prod.quantity })),
        }
        addUpdateMeal(data);
        setIsLoading(false);
    };

    /**
     * Function to handle the products selection
     * @param {*} newValue  list of all selected products
     */
    const handleProductChange = async (newValue) => {
        let newAddedProd = null;

        // Check if there is a new product to add that not exist in the list
        const newProductToAdd = newValue.find(item => item.inputValue && !selectedProducts.find(prod => prod.name === item.inputValue));
        if (newProductToAdd) {
            // Add new product to DB
            try {
                const newProd = {
                    name: newProductToAdd.inputValue,
                    availableQuantity: 0,
                    unit: 'kg'
                };
                const response = await ProductsService.createProduct(newProd);
                newAddedProd = response.data;
                setProducts([...products, newAddedProd]);
            } catch (error) {
                console.error('Error adding new product:', error);
            }
        }

        //  Clean the selected products list and update state
        const cleanedNewValue = newValue.map(item => newAddedProd && item.inputValue === newAddedProd.name ? newAddedProd : item);
        const updatedValues = cleanedNewValue.map(value => ({ ...value, name: value.inputValue || value.name }))
            .map(val => {
                const prod = selectedProducts.find(prod => prod.name === val.name);
                return prod || { ...val, quantity: 0 }
            });
        setSelectedProducts([...updatedValues]);
    };

    // Event handler to update the quantity
    const handleQuantityChange = (index, newQuantity) => {
        setSelectedProducts(prevProducts =>
            prevProducts.map((product, i) =>
                i === index ? { ...product, quantity: parseFloat(newQuantity) } : product
            )
        );
    };

    // Event handler to update the unit
    // const handleUnitChange = (index, newUnit) => {
    //     setSelectedProducts(prevProducts =>
    //         prevProducts.map((product, i) =>
    //             i === index ? { ...product, unit: newUnit } : product
    //         )
    //     );
    // };


    return (
        <Box sx={{
            my: 5,
            px: 12,
            pb: 5,
            width: '100%',
            border: '1px solid lightgrey',
            borderRadius: 5,
        }}>
            <h3>Add Meal</h3>
            <Grid container columnSpacing={5} rowSpacing={2}
                component="form"
                onSubmit={handleSubmit}>
                <Grid item xs={12} display='flex' justifyContent='left'>
                    <TextField
                        fullWidth
                        size="small"
                        required
                        id="name"
                        label="Meal Name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Grid>

                <Grid item xs={6} display='flex' alignItems='top' >
                    <Autocomplete
                        multiple
                        sx={{ width: '100%' }}
                        size='small'
                        disableCloseOnSelect
                        // renderTags={() => null}
                        id="products"
                        options={products}
                        // value={selectedProducts}
                        onChange={(event, newValue) => handleProductChange(newValue)}
                        filterOptions={(options, params) => {
                            const filtered = filter(options, params);
                            const { inputValue } = params;
                            // Suggest the creation of a new value
                            const isExisting = options.find((option) => inputValue.toLowerCase() === option.name.toLowerCase());
                            if (inputValue !== '' && !isExisting) {
                                filtered.push({
                                    inputValue,
                                    name: `Add "${inputValue}"`,
                                });
                            }
                            return filtered;
                        }}
                        getOptionLabel={(option) => {
                            // Value selected with enter, right from the input
                            if (typeof option === 'string') {
                                return option;
                            }
                            // Add "xxx" option created dynamically
                            if (option.inputValue) {
                                return option.inputValue;
                            }
                            // Regular option
                            return option.name;
                        }}
                        renderOption={(props, option, { selected }) => {
                            const { key, ...optionProps } = props;
                            return (
                                <li key={key} {...optionProps}>
                                    <Checkbox
                                        icon={icon}
                                        checkedIcon={checkedIcon}
                                        checked={selected}
                                    />
                                    {option.name}
                                </li>
                            );
                        }}
                        renderInput={(params) => (
                            <TextField {...params} label="products" />
                        )}
                    />
                </Grid>

                <Grid item xs={6}>
                    {selectedProducts.map((product, index) => (
                        <Grid key={index} container mb='5px' alignItems='center' >
                            <Grid item xs={4} paddingRight={2} textAlign='right'>
                                <span>{product.name}</span>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    type="number"
                                    placeholder='quantity'
                                    sx={{ width: '100%' }}
                                    size="small"
                                    required
                                    value={product.quantity}
                                    onChange={(e) => handleQuantityChange(index, e.target.value)}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={4}>
                                {/* <FormControl >
                                    <Select
                                        size='small'
                                        value={product.unit}
                                        onChange={(e) => handleUnitChange(index, e.target.value)}
                                    >
                                        {unitOptions.map(option => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl> */}
                            </Grid>
                        </Grid>
                    ))}
                </Grid>

                <Grid item xs={6} display='flex' justifyContent='left'>
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

export default function MealsManagement({ }) {
    const [meals, setMeals] = useState([])

    useEffect(() => {
        fetchMeals();
    }, []);

    /**
     * Fetch all meals from DB
     */
    const fetchMeals = async () => {
        try {
            const response = await MealsService.getAllMeals();
            setMeals(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    /**
     * Make API call to delete a meal
     * @param {*} e 
     * @param {*} id 
     */
    const deleteMeal = async (e, id) => {
        e.preventDefault();
        try {
            const response = await MealsService.deleteMeal(id);
            setMeals(meals.filter(meal => meal._id !== response.data._id));
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    const onSellMeal = async (id) => {
        try {
            const response = await MealsService.sellMeal(id);
            fetchMeals();
        } catch (error) {
            console.error('Error selling meal:', error);
        }
    }

    const addMeal = async (mealData) => {
        try {
            const response = await MealsService.createMeal(mealData);
            fetchMeals();
        } catch (error) {
            console.error('Error adding new meal:', error);
        }
    }

    return (
        <Grid container>
            <Grid item xs={12} px='200px'>
                <MealForm addUpdateMeal={addMeal} />
            </Grid>
            {meals.length > 0 && <Grid item xs={12} px='300px'>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 500 }}>
                        <Table stickyHeader aria-label="simple table">
                            <TableHead sx={{ backgroundColor: '#0F1431' }}>
                                <TableRow>
                                    <TableCell width={80} sx={{ backgroundColor: '#0F1431', color: 'white' }}>Sr#</TableCell>
                                    <TableCell width={300} sx={{ backgroundColor: '#0F1431', color: 'white' }}>Meal Name</TableCell>
                                    <TableCell width={150} sx={{ backgroundColor: '#0F1431', color: 'white' }}>Quantity</TableCell>
                                    <TableCell width={180} align='left' sx={{ backgroundColor: '#0F1431', color: 'white' }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody >
                                {meals.map((meal, index) => (
                                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{meal.name}</TableCell>
                                        <TableCell >{meal.quantity}</TableCell>
                                        <TableCell >
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <Button
                                                    disabled={meal.quantity === 0}
                                                    size='small'
                                                    variant='outlined'
                                                    onClick={() => onSellMeal(meal._id)}
                                                >
                                                    Sell
                                                </Button>
                                                <IconButton
                                                    size='small'
                                                    onClick={(e) => deleteMeal(e, meal._id)}>
                                                    <Delete sx={{ color: 'red' }} />
                                                </IconButton>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Grid>}
        </Grid>
    );
}
