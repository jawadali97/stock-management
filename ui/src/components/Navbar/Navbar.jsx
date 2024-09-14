
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { LocalLibrary, NotificationAdd, Notifications } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import MenuSimple from '../Notification/Notification';

const pages = [
    {
        page: 'Home',
        path: '/'
    },
    {
        page: 'Requests',
        path: '/requests'
    },
    {
        page: 'Borrowed Books',
        path: '/borrowed-books'
    }
];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Navbar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const navigate = useNavigate();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (path) => {
        setAnchorElNav(null);
        navigate(path);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const onLogout = () => {
        localStorage.clear();
        navigate('/signin');
    }

    return (
        <AppBar position="static" sx={{ background: '#0F1431' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <LocalLibrary />
                    <Typography
                        variant="h6"
                        noWrap
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            ml: 1,
                            mr: 5,
                            display: { xs: "none", md: "flex" },
                            fontWeight: 500,
                            fontSize: "22px",
                            textDecoration: "none",
                        }}
                    >
                        Local Library
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((pageObj) => (
                                <MenuItem key={pageObj.page} onClick={() => handleCloseNavMenu(pageObj.path)}>
                                    <Typography textAlign="center">{pageObj.page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((pageObj) => (
                            <Button
                                key={pageObj.page}
                                onClick={() => handleCloseNavMenu(pageObj.path)}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {pageObj.page}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{
                        display: 'flex'
                    }}>
                        <MenuSimple />
                        <MenuItem onClick={() => handleCloseNavMenu('/profile')}>
                            <Typography textAlign="center">Profile</Typography>
                        </MenuItem>
                        <Button
                            variant='outlined'
                            sx={{ color: 'white' }}
                            onClick={onLogout}>
                            Logout
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Navbar;