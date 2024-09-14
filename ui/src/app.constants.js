import { AccountCircle, LibraryBooks, Person, RequestPage } from "@mui/icons-material";
import MealsManagement from "./components/MealManagement";

export const sidebarList = [
    {
        key: 1,
        label: 'Meal Management',
        // icon: <LibraryBooks sx={{ color: 'white' }} />,
        path: '/meal-management',
    },
    {
        key: 2,
        label: 'Manage Products',
        // icon: <RequestPage sx={{ color: 'white' }} />,
        path: '/products'
    },
    {
        key: 3,
        label: 'Product Orders',
        // icon: <RequestPage sx={{ color: 'white' }} />,
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

}
