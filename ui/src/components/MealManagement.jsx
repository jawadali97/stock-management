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
import { useNavigate } from 'react-router-dom';
import { unitOptions } from '../app.constants';

const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function BookForm({ selectedBook = {}, addUpdateMeal }) {
    const [name, setName] = useState('');
    // const [products, setProducts] = useState(['Meat', 'Tomato', 'Bun', 'Bread'])
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);

    const filter = createFilterOptions();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const productsData = [
            { name: 'Meat' },
            { name: 'Tomato' },
            { name: 'Bun' },
            { name: 'Bread' }
        ];
        setProducts(productsData)
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);

        const data = {
            name,
            products: selectedProducts,
        }
        addUpdateMeal(data);
        // clearForm()
        setIsLoading(false);
        console.log(data)
    };

    const clearForm = () => {
        setName('');
        setSelectedProducts([]);
    }

    const handleProductChange = (newValue) => {
        const newValues = newValue.map((value) => ({ name: value.inputValue || value.name }));
        const updatedList = newValues.map(val => {
            const prod = selectedProducts.find(prod => prod.name === val.name);
            return prod || { ...val, quantity: 0, unit: 'kg' }
        });
        setSelectedProducts([...updatedList]);
        // const elementsNotInProducts = newValues.filter(newValue => !products.some(product => product.name === newValue.name));
        // setProducts([...products, ...elementsNotInProducts]);
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
    const handleUnitChange = (index, newUnit) => {
        setSelectedProducts(prevProducts =>
            prevProducts.map((product, i) =>
                i === index ? { ...product, unit: newUnit } : product
            )
        );
    };


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
                        onChange={(event, newValue) => {
                            // if (typeof newValue === 'string') {
                            //     handleProductChange(newValue.name)
                            //     // setProductValue(newValue);
                            // } else 
                            // if (newValue && newValue.inputValue) {
                            //     // Create a new value from the user input
                            //     handleProductChange(newValue.inputValue)
                            //     // setProductValue(newValue.inputValue);
                            //     // setProducts([...products, { name: newValue.inputValue }])
                            // } else {
                            //     // setProductValue(newValue);
                            // }
                            handleProductChange(newValue)
                        }}
                        filterOptions={(options, params) => {
                            const filtered = filter(options, params);
                            const { inputValue } = params;
                            // Suggest the creation of a new value
                            const isExisting = options.some((option) => inputValue === option);
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
                                <FormControl >
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
                                </FormControl>
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
    const [selectedBook, setSelectedBook] = useState({})
    const navigate = useNavigate();

    useEffect(() => {
        const mealsData = [
            {
                _id: '123345',
                name: 'Burger',
                quantity: 6
            },
            {
                _id: '123346',
                name: 'Pizza',
                quantity: 6
            }
        ];
        setMeals(mealsData);

        // if (!localStorage.getItem('token')) {
        //     navigate('/signin')
        // }

        // BookService.getAllBooks().then((data) => {
        //     setBooks(data);
        // }).catch((err) => {
        //     console.log(err);
        //     if (err.response.data.statusCode === 403) {
        //         navigate('/signin');
        //     }
        // });
    }, []);

    const deleteMeal = (id) => {
        // BookService.deleteBook(id).then((data) => {
        //     setBooks(books.filter(book => book._id !== id));
        // }).catch((err) => {
        //     console.log(err);
        //     if (err.response.data.statusCode === 403) {
        //         navigate('/signin');
        //     }
        // });
    }

    // const editBook = (id) => {
    //     setSelectedBook(books.find(book => book._id === id));
    // }

    const addUpdateMeal = (meal) => {
        // TODO: save meal in DB, Fetch latest meals and update state

        setMeals([...meals, meal])
        // if (book._id && book._id === selectedBook._id) {
        //     // Update book
        //     BookService.updateBook(book._id, book).then((data) => {
        //         setBooks(books.map(book => book._id === data._id ? data : book));
        //     }).catch((err) => {
        //         console.log(err);
        //         if (err.response.data.statusCode === 403) {
        //             navigate('/signin');
        //         }
        //     });
        // } else {
        //     // Add book
        //     BookService.addBook(book).then((data) => {
        //         setBooks((books) => [...books, data]);
        //     }).catch((err) => {
        //         console.log(err);
        //         if (err.response.data.statusCode === 403) {
        //             navigate('/signin');
        //         }
        //     })
        // }
    }

    return (
        <Grid container>
            <Grid item xs={12} px='200px'>
                <BookForm addUpdateMeal={addUpdateMeal} />
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
                                                    size='small'
                                                    variant='outlined'
                                                >
                                                    Sell
                                                </Button>
                                                <IconButton
                                                    size='small'
                                                    onClick={() => deleteMeal(meal._id)}>
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
