import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Menu from "../pages/shop/Menu";
import Signup from "../componenets/Signup";
import Login from '../componenets/Login';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
    ],
  },
  {
    path:"/signup",
    element:<Signup/>
  },
  // {
  //   path: "/login",
  //   element: <Login/>
  // },
]);

export default router;
