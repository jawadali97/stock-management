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
import OrdersService from '../services/orders.service';

export default function Orders({ }) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await OrdersService.getAllOrders();
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    // Event handler to update the quantity
    const onAcceptClick = async (id) => {
        try {
            const response = await OrdersService.acceptOrder(id);
            fetchOrders();
        } catch (error) {
            console.error('Error accepting order:', error);
        }
    };

    /**
     * Format timestamp to dd-mm-yyyy format
     * @param {*} timestamp 
     * @returns 
     */
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

        <Grid container pt={8} textAlign='center'>
            <Grid item xs={12}>
                <h2>Orders</h2>
            </Grid>
            {orders.length > 0 ?
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
                                            <TableCell >{dateFormat(order.date)}</TableCell>
                                            <TableCell sx={{ display: 'flex', flexDirection: 'column' }}>
                                                {order?.products.map((prod, i) => (<span key={i}><b>{prod?.product.name}</b> - {prod.orderedQuantity + prod?.product.unit}</span>))}
                                            </TableCell>
                                            <TableCell >{order.status}</TableCell>
                                            <TableCell sx={{ py: '0px' }}>
                                                <Button
                                                    disabled={order.status !== 'Sent'}
                                                    size='small'
                                                    variant='outlined'
                                                    onClick={(e) => onAcceptClick(order._id)}
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
                </Grid>
                : <Grid item xs={12}>
                    <div>There are not any orders yet</div>
                </Grid>
            }
        </Grid>
    )
}