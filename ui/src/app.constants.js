export const sidebarList = [
    {
        key: 1,
        label: 'Meal Management',
        path: '/meal-management',
    },
    {
        key: 2,
        label: 'Manage Products',
        path: '/products'
    },
    {
        key: 3,
        label: 'Product Orders',
        path: '/product-orders'
    },
];

export const apiUrls = {
    meals: '/meals',
    sellMeal: '/meals/sell',
    products: '/products',
    orders: '/orders'
};

export const unitOptions = [
    { value: 'kg', label: 'kg' },
    { value: 'pcs', label: 'pcs' },
];

export const apiBaseUrl = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api';