
import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Menu from "../pages/shop/Menu";
import Signup from "../components/Signup";
import PrivateRouter from "../PrivateRouter/PrivateRouter";
import UpdateProfile from "../pages/dashboard/UpdateProfile";
import CartPage from "../pages/shop/CartPage";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/dashboard/admin/Dashboard";
import Users from "../pages/dashboard/admin/Users";
import AddMenu from "../pages/dashboard/admin/AddMenu";
import ManageItems from "../pages/dashboard/admin/ManageItems";
import UpdateMenu from "../pages/dashboard/admin/UpdateMenu";
import Login from "../components/Login";
import Payment from "../pages/shop/Payment";
import Order from "../pages/dashboard/Order";

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children : [
        {
            path: "/",
            element: <Home/>
        },
        {
          path: "/menu",
          element: <PrivateRouter> <Menu/> </PrivateRouter>
        },
        {
          path: "/menu/:id",
          element: <PrivateRouter><Menu /> </PrivateRouter>,
          loader: ({ params }) => fetch(`${API_BASE_URL}/menu/${params.id}`),
        },
        {
          path :"/order",
          element:<PrivateRouter><Order/></PrivateRouter>
        },
        {
          path: "/cart-page",
          element:<CartPage/>
        },
        {
          path:"/update-profile",
          element:<UpdateProfile/>
        },
        {
          path: "/process-checkout",
          element: <Payment/>
        }
      ],
    },
    {
      path:"/signup",
      element:<Signup/>
    },
    {
      path: "/login",
      element: <Login/>
    },
    // Admin routes
    {
      path: 'dashboard',
      element: <PrivateRouter><DashboardLayout/></PrivateRouter>,
      children: [
        {
          path: '',
          element: <Dashboard/>
        },
        {
          path: 'users',
          element: <Users/>,
        },
        {
          path: 'add-menu',
          element:<AddMenu/>
        },
        {
          path:"manage-items",
          element:<ManageItems/>
        },
        {
          path:"update-menu/:id",
          element:<UpdateMenu/>,
          loader:({params})=>fetch(`${API_BASE_URL}/menu/${params.id}`)
        }
      ]
    }
  ]);

export default router;
