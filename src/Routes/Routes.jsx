import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import Menu from "../pages/Menu/Menu";
import Order from "../pages/Order/Order";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Secret from "../pages/Shared/Secret";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import Cart from "../pages/Dashboard/Cart/Cart";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AddItems from "../pages/Dashboard/AddItems/AddItems";
import ManageItems from "../pages/Dashboard/ManageItems/ManageItems";
import UpdateItem from "../pages/Dashboard/UpdateItem/UpdateItem";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import UserHome from "../pages/Dashboard/UserHome/UserHome";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";
// import AdminRoute from "./AdminRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/menu',
        element: <Menu></Menu>
      },
      {
        path: '/ourShop/:category',
        element: <Order></Order>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/signup',
        element: <SignUp></SignUp>
      },
      {
        path: '/secret',
        element: <PrivateRoute><Secret></Secret></PrivateRoute>
      }
    ]
  },
  {
   path: 'dashboard',
   element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
   children: [
    // normal user routes
    {
      path: 'userHome',
      element: <UserHome></UserHome>
    },
    {
      path: 'cart',
      element: <Cart></Cart>
    },
    {
      path: 'payment',
      element: <Payment></Payment>
    },
    {
      path: 'paymentHistory',
      element: <PaymentHistory></PaymentHistory>
    },

    // admin only routes
    {
      path: 'adminHome',
      element: <AdminHome></AdminHome>
    },
    {
      path: 'addItems',
      element: <AddItems></AddItems>
    },
    {
      path: 'manageItems',
      element: <ManageItems></ManageItems>
    },
    {
      path: 'updateItem/:id',
      element: <UpdateItem></UpdateItem>,
      loader: ({params}) => fetch(`http://localhost:5000/menu/${params.id}`)
    },
    {
      path: 'allUsers',
      element: <AllUsers></AllUsers>
    }
   ]
  }
]);
// <AdminRoute>