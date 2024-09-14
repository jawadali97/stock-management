import { Box, Typography } from "@mui/material";
import SideBar from './Navbar/Sidebar'
import restaurant from '../assets/restaurant.jpg'

export default function DashboardLayout({ children, title }) {

    return (
        <div style={{ display: 'flex' }}>
            <SideBar />

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Box sx={{
                    width: '100%',
                    height: '10rem',
                    backgroundImage: 'url(https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg)',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Typography color='white' fontSize={40} fontWeight={600}>
                        {title}
                    </Typography>
                </Box>
                <main style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>{children}</main>
            </div>

        </div>
    )
}