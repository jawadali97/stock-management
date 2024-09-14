import * as React from "react";
import { useNavigate } from "react-router-dom";
import { styled, useTheme, Box, Drawer as MuiDrawer, List, Typography, ListItemButton, ListItemIcon, ListItemText, ListItem, Button, Divider } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery'
import './styles.css';
import { sidebarList } from "../../app.constants";
import { LocalLibrary } from "@mui/icons-material";


const drawerWidth = 280;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    backgroundColor: "#0F1431",
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
}));


export default function Sidebar() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const navigate = useNavigate();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))

    React.useEffect(() => {
        if (isSmallScreen) {
            setOpen(false);
        } else {
            setOpen(true);
        }
    }, [isSmallScreen]);


    const handleDrawerToggel = () => {
        setOpen(!open);
    };

    const onLogout = () => {
        localStorage.clear();
        navigate('/signin');
    }

    return (
        <Box sx={{ display: "flex" }}>
            <Drawer variant="permanent" open={open} className='drawer'>
                <DrawerHeader className='drawerHeader'>
                    {theme.direction === "rtl" ? (
                        <div>Nothing to display</div>
                    ) : (
                        <Box className='logoContainer' onClick={handleDrawerToggel}>
                            <Typography sx={{ display: { xs: "flex" } }}>
                                <LocalLibrary sx={{
                                    color: 'white'
                                }} />
                            </Typography>

                            {open && (
                                <Typography
                                    variant="h6"
                                    noWrap
                                    href="/"
                                    sx={{
                                        ml: 1,
                                        display: { xs: "none", md: "flex" },
                                        fontWeight: 700,
                                        fontSize: "22px",
                                        color: "#D3D2D3",
                                        textDecoration: "none",
                                    }}
                                >
                                    Stock Management
                                </Typography>
                            )}
                        </Box>
                    )}
                </DrawerHeader>

                <List className='list'>
                    {sidebarList.map((list, index) => (
                        <ListItem key={list.key} disablePadding sx={{ display: "block" }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? "initial" : "center",
                                    px: 2.5,
                                    "&:hover": {
                                        bgcolor: "#3789FA", // Add hover color here
                                    },
                                }}
                                onClick={() => navigate(`${list.path}`)}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 2 : "auto",
                                        justifyContent: "center",
                                    }}
                                >
                                    {list.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={list.label}
                                    sx={{ opacity: open ? 1 : 0 }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                    {/* <ListItem>
                        <Button fullWidth variant="outlined" sx={{ color: 'white' }} onClick={onLogout}>Logout</Button>
                    </ListItem> */}
                </List>
            </Drawer>
        </Box>
    );
}
