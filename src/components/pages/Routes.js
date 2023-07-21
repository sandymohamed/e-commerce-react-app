import { selectUser } from "../../redux/reducers/userSlice";
import { useSelector } from "react-redux";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import MainLayout from "../MainLayout";
import Error404 from "./Error404";
import HomePage from "./HomePage";
import Products from "./ProductsPage";
import ProductDetails from "./ProductDetails";
import CartPage from "./CartPage";
import Login from "./Login";
import Signup from "./Signup";
import Checkout from "./Checkout";
import ProfilePage from "./ProfilePage";
import Shipping from "./Shipping";
import PaymentPage from "./PaymentPage";
import OrdersPage from "./OrdersPage";
import LatestProductsPage from "./LatestProductsPage";
// -------------------------------------------------------------------------------------

const router = (isAuth) => createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error404 />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/new-products",
        element: <LatestProductsPage />,
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },

    ],
  },
  {
    path: "/",
    element: isAuth ? <MainLayout /> : <Navigate to="/login" />,
    errorElement: <Error404 />,
    children: [
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/shipping",
        element: <Shipping />,
      },
      {
        path: "/payment",
        element: <PaymentPage />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/orders",
        element: <OrdersPage />,
      },
    ],
  },
  {
    path: '/',
    element: isAuth ? <Navigate to="/" /> : <MainLayout />,
    errorElement: <Error404 />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> },
      { path: '/', element: <Navigate to="/login" /> },
    ],
  },
])


const Routes = () => {

  const user = useSelector(selectUser);
  const isAuth = Object.keys(user).length === 0 ? false : true;


  return (
    <RouterProvider router={router(isAuth)} />

  )
}

export default Routes
