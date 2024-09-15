import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, redirect, Route, Routes } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import MealsManagement from './components/MealManagement';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import ProductsManagement from './components/ProductsManagement';
import Orders from './components/Orders';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0F1431',
    },
    secondary: {
      main: '#888',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <DashboardLayout title={'Meal Management'}>
                <MealsManagement />
              </DashboardLayout>
            }
          />
          <Route
            path='/meal-management'
            element={
              <DashboardLayout title={'Meal Management'}>
                <MealsManagement />
              </DashboardLayout>
            }
          />
          <Route
            path='/products'
            element={
              <DashboardLayout title={'Manage Products'}>
                <ProductsManagement />
              </DashboardLayout>
            }
          />
          <Route
            path='/product-orders'
            element={
              <DashboardLayout title={'Product Orders'}>
                <Orders />
              </DashboardLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App
