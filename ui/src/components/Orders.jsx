import React from 'react'
import {
    Button,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { useState, useEffect } from 'react';

export default function Orders({ }) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const ordersData = [
            {
                orderId: '120',
                date: '10-20-2023',
                status: 'Sent',
                products: [
                    { name: 'Meat', orderedQuantity: 3, unit: 'kg' },
                    { name: 'Tomato', orderedQuantity: 3, unit: 'pcs' },
                    { name: 'Bun', orderedQuantity: 3, unit: 'kg' },
                ]
            },
            {
                orderId: '121',
                date: '10-20-2023',
                status: 'Accepted',
                products: [
                    { name: 'Meat', orderedQuantity: 3, unit: 'kg' },
                    { name: 'Tomato', orderedQuantity: 3, unit: 'pcs' },
                    { name: 'Bun', orderedQuantity: 3, unit: 'kg' },
                ]
            },
            {
                orderId: '124',
                date: '10-20-2023',
                status: 'Sent',
                products: [
                    { name: 'Meat', orderedQuantity: 3, unit: 'kg' },
                    { name: 'Tomato', orderedQuantity: 3, unit: 'pcs' },
                    { name: 'Bun', orderedQuantity: 3, unit: 'kg' },
                ]
            },
            {
                orderId: '125',
                date: '10-20-2023',
                status: 'Sent',
                products: [
                    { name: 'Meat', orderedQuantity: 3, unit: 'kg' },
                    { name: 'Tomato', orderedQuantity: 3, unit: 'pcs' },
                    { name: 'Bun', orderedQuantity: 3, unit: 'kg' },
                ]
            }
        ];
        setOrders(ordersData);
    }, [])

    // Event handler to update the quantity
    const onAcceptClick = (index) => {
        setOrders(prevOrders =>
            prevOrders.map((order, i) =>
                i === index ? { ...order, status: 'Accepted' } : order
            )
        );
    };

    const dateFormat = (timestamp) => {
        // Create a Date object from the timestamp string
        const dateObject = new Date(timestamp);

        // Get day, month, and year from the Date object
        const day = dateObject.getDate().toString().padStart(2, '0');
        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
        const year = dateObject.getFullYear();

        // Format the date into the desired format "dd-mm-yyyy"
        return `${day}-${month}-${year}`;
    }

    return (

        <Grid container pt={8}>
            <Grid item xs={12}>
                <h2>Orders</h2>
            </Grid>
            {orders.length > 0 &&
                <Grid item xs={12} px='300px'>
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer sx={{ maxHeight: 500 }}>
                            <Table stickyHeader aria-label="simple table">
                                <TableHead sx={{ backgroundColor: '#0F1431' }}>
                                    <TableRow>
                                        <TableCell width={50} sx={{ backgroundColor: '#0F1431', color: 'white' }}>ID</TableCell>
                                        <TableCell width={80} sx={{ backgroundColor: '#0F1431', color: 'white' }}>Date</TableCell>
                                        <TableCell width={150} sx={{ backgroundColor: '#0F1431', color: 'white' }}>Ordered Products</TableCell>
                                        <TableCell width={50} sx={{ backgroundColor: '#0F1431', color: 'white' }}>Status</TableCell>
                                        <TableCell width={30} align='left' sx={{ backgroundColor: '#0F1431', color: 'white' }}>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody >
                                    {orders.map((order, index) => (
                                        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell>{order.orderId}</TableCell>
                                            <TableCell >{order.date}</TableCell>
                                            <TableCell sx={{ display: 'flex', flexDirection: 'column' }}>
                                                {order?.products.map(prod => (<span><b>{prod.name}</b>  {prod.orderedQuantity + prod.unit}</span>))}
                                            </TableCell>
                                            <TableCell >{order.status}</TableCell>
                                            <TableCell sx={{ py: '0px' }}>
                                                <Button
                                                    disabled={order.status !== 'Sent'}
                                                    size='small'
                                                    variant='outlined'
                                                    onClick={(e) => onAcceptClick(index)}
                                                >
                                                    Accept
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>}
        </Grid>
    )
}