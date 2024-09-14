
import * as React from 'react';
import {
    Box,
    Button,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
    Modal
} from '@mui/material';

import { Delete, Edit } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import RequestService from '../services/request.service';
import { ApiService } from '../services/api';
import { apiUrls } from '../app.constants';

const tableHead = ['Book Title', 'User', 'User Email', 'Status', 'Request Date', 'Return Date', 'Action']

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

let timeout = null;


export default function BorrowedBooksManagement({ }) {

    const [requests, setRequests] = useState([])
    const [open, setOpen] = useState(false);
    const [dueDate, setDueDate] = useState('');
    const [selectedReqId, setSelectedReqId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/signin')
        }


        RequestService.getAllRequests().then((data) => {
            const filtered = data.filter(req => ['approved', 'returned'].includes(req.status));
            setRequests(filtered);
        }).catch((err) => {
            console.log(err);
            if (err.response.data.statusCode === 403) {
                navigate('/signin');
            }
        });

        timeout = setInterval(() => {
            RequestService.getAllRequests().then((data) => {
                const filtered = data.filter(req => ['approved', 'returned'].includes(req.status));
                setRequests(filtered);
            }).catch((err) => {
                console.log(err);
                if (err.response.data.statusCode === 403) {
                    navigate('/signin');
                }
            });
        }, 4000);

        return () => {
            clearInterval(timeout)
        }

    }, [setRequests]);

    const acceptDenyRequest = (request, action) => {
        updateRequest(request._id, { status: action });
    }

    const handleOpen = (request) => {
        setSelectedReqId(request._id);
        setOpen(true)
    };
    const handleClose = () => setOpen(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);

        console.log({ selectedReqId });
        updateRequest(selectedReqId, { dueDate })
        setIsLoading(false);
        handleClose();
    };

    const updateRequest = (id, reqData) => {
        RequestService.updateRequest(id, reqData).then((data) => {
            setRequests(requests.map(request => request._id === data._id ? { ...request, dueDate: data.dueDate, status: data.status } : request));
        }).catch((err) => {
            console.log(err);
            if (err.response.data.statusCode === 403) {
                navigate('/signin');
            }
        });
    }

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

    const sendReturnReminder = (id) => {
        ApiService.post(`${apiUrls.reminder}/${id}`, {}).then((data) => {
            console.log({ data });
        }).catch((err) => {
            console.log(err);
            if (err.response.data.statusCode === 403) {
                navigate('/signin');
            }
        });
    }

    return (
        <Box sx={{
            width: '80%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            mt: 10
        }}>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="simple table">
                        <TableHead sx={{ backgroundColor: '#0F1431' }}>
                            <TableRow>
                                <TableCell sx={{ backgroundColor: '#0F1431', color: 'white' }}>Sr#</TableCell>
                                {tableHead.map(head => (<TableCell key={head} sx={{ backgroundColor: '#0F1431', color: 'white' }}>{head}</TableCell>))}
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {requests.map((request, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{request?.book.title}</TableCell>
                                    <TableCell >{request?.user.firstName + " " + request?.user?.lastName}</TableCell>
                                    <TableCell >{request?.user.email}</TableCell>
                                    <TableCell >{request.status.toUpperCase()}
                                    </TableCell>
                                    <TableCell >{dateFormat(request.requestDate)}</TableCell>
                                    <TableCell >{
                                        request.dueDate ?
                                            <div>
                                                {request.dueDate}
                                                <IconButton
                                                    disabled={['denied', 'withdrawn', 'returned'].includes(request.status)}
                                                    onClick={() => {
                                                        setDueDate(request.dueDate)
                                                        handleOpen(request);
                                                    }
                                                    }>
                                                    <Edit />
                                                </IconButton>
                                            </div>

                                            : <Button
                                                size='small'
                                                disabled={['withdrawn', 'denied', 'returned'].includes(request.status)}
                                                onClick={() => handleOpen(request)}>
                                                Add</Button>
                                    }
                                    </TableCell>
                                    <TableCell >
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <Button
                                                size='small'
                                                disabled={['returned'].includes(request.status)}
                                                onClick={() => acceptDenyRequest(request, 'returned')}>
                                                Book Returned
                                            </Button>
                                            <Button
                                                size='small'
                                                disabled={request.status !== 'approved'}
                                                onClick={() => sendReturnReminder(request._id)}>
                                                Return Reminder
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>

                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Return Date
                        </Typography>
                        <TextField
                            size="small"
                            margin="normal"
                            required
                            id="dueDate"
                            label="Return Date"
                            name="dueDate"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                        />
                        <LoadingButton
                            loading={isLoading}
                            size='small'
                            type="submit"
                            variant="contained"
                            onClick={handleSubmit}
                        >
                            Submit
                        </LoadingButton>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
}
