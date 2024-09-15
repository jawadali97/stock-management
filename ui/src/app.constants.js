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
    login: '/user/login',
    signup: '/user/signup',
    users: '/user',
    updateUser: '/user/update',
    deleteUser: '/user/delete',
    profile: '/user/profile',
    books: '/book',
    addBook: '/book/add',
    updateBook: '/book/update',
    deleteBook: '/book/delete',
    searchBook: '/book/search',
    requests: '/requests',
    updateRequest: '/requests/update',
    createRequest: '/requests/create',
    deleteRequest: '/requests/delete',
    userRequests: '/requests/user-requests',
    notifications: '/notifications',
    reminder: 'requests/reminder'
};

export const unitOptions = [
    { value: 'kg', label: 'kg' },
    { value: 'pcs', label: 'pcs' },
];
