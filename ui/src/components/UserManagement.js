
import * as React from 'react';
import {
    Box,
    FormControl,
    IconButton,
    InputLabel,
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
import { Delete, Edit } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import UserService from '../services/user.service';

const tableHead = ['First Name', 'Last Name', 'Email', 'Status', 'Action']

function UserForm({ selectedUser = {}, updateUser }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (selectedUser) {
            setFirstName(selectedUser.firstName);
            setLastName(selectedUser.lastName);
            setEmail(selectedUser.email);
            setSelectedStatus(selectedUser.status);
        }
    }, [selectedUser]);

    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);

        const data = {
            ...selectedUser,
            firstName,
            lastName,
            email,
            status: selectedStatus,
        }
        updateUser(data);
        clearForm()
        setIsLoading(false);
    };

    const clearForm = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setSelectedStatus('');
    }

    return (
        <Box sx={{ my: 5, px: 5, width: '100%', border: '1px solid lightgrey', borderRadius: 5 }}>
            <h3>Update User</h3>
            <Box
                component="form" onSubmit={handleSubmit}
                sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                <TextField
                    size="small"
                    margin="normal"
                    required
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                    size="small"
                    margin="normal"
                    required
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <TextField
                    size="small"
                    margin="normal"
                    required
                    id="email"
                    label="Email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <FormControl sx={{ width: 'auto', minWidth: 110 }} size="small">
                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="status"
                        name="status"
                        value={selectedStatus}
                        label="Status"
                        autoWidth
                        onChange={handleStatusChange}
                    >
                        <MenuItem key={'active'} value={'active'}>Activate</MenuItem>
                        <MenuItem key={'inactive'} value={'inactive'}>Deactivate</MenuItem>
                    </Select>
                </FormControl>
                <LoadingButton
                    loading={isLoading}
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Submit
                </LoadingButton>
            </Box>
        </Box >
    )
}

export default function UserManagement({ }) {

    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState({})
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/signin')
        }

        UserService.getAllUsers().then((data) => {
            setUsers(data);
        }).catch((err) => {
            console.log(err);
            if (err.response.data.statusCode === 403) {
                navigate('/signin');
            }
        });
    }, []);

    const deleteUser = (id) => {
        UserService.deleteUser(id).then((data) => {
            setUsers(users.filter(user => user._id !== id));
        }).catch((err) => {
            console.log(err);
            if (err.response.data.statusCode === 403) {
                navigate('/signin');
            }
        });
    }

    const editUser = (id) => {
        setSelectedUser(users.find(user => user._id === id));
    }

    const updateUser = (user) => {
        console.log({ user })
        if (user._id && user._id === selectedUser._id) {
            // Update user
            UserService.updateUser(user._id, user).then((data) => {
                setUsers(users.map(user => user._id === data._id ? data : user));
            }).catch((err) => {
                console.log(err);
                if (err.response.data.statusCode === 403) {
                    navigate('/signin');
                }
            });
        }
    }

    return (
        <Box sx={{
            width: '80%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <UserForm selectedUser={selectedUser} updateUser={updateUser} />
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
                            {users.map((user, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{user.firstName}</TableCell>
                                    <TableCell >{user.lastName}</TableCell>
                                    <TableCell >{user.email}</TableCell>
                                    <TableCell >{user.status.toUpperCase()}</TableCell>
                                    <TableCell >
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <IconButton
                                                size='small'
                                                onClick={() => deleteUser(user._id)}>
                                                <Delete sx={{ color: 'red' }} />
                                            </IconButton>
                                            <IconButton
                                                size='small'
                                                onClick={() => editUser(user._id)}>
                                                <Edit />
                                            </IconButton>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
}
