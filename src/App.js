import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import Signin from "./pages/Signin";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ProtectRoutes from "./utilities/ProtectRoutes";

import SpecProduct from "./pages/SpecProduct";

import EachSubCategory from "./pages/EachSubCategory";
import EachCategory from "./pages/EachCategory";
import Topic from "./pages/Topic";
import Top from "./pages/Top";
import Bottoms from "./pages/Bottoms";
import Cart from "./pages/Cart";
import WishList from "./pages/WishList";
import Profile from "./pages/Profile";
import CreateOrder from "./pages/CreateOrder";
import Orders from "./pages/Orders";
import ErrorPage from "./pages/ErrorPage";

function App() {

  
  const routes = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: (
            <ProtectRoutes>
              <Home />
            </ProtectRoutes>
          ),
        },
        { path: "/login", element: <Signin /> },
        { path: "/register", element: <Register /> },
        

        { path: "/topic/:search/:value", element: <ProtectRoutes><Topic /> </ProtectRoutes> },
        { path: "/Tops", element: <ProtectRoutes><Top /> </ProtectRoutes> },
        { path: "/Bottoms", element: <ProtectRoutes><Bottoms />  </ProtectRoutes>},
        { path: "/product/:id", element: <ProtectRoutes><SpecProduct />  </ProtectRoutes>},
        { path: "/:gender/:name/:id", element: <ProtectRoutes><EachSubCategory /> </ProtectRoutes> },
        { path: "/:name/:id", element: <ProtectRoutes><EachCategory /> </ProtectRoutes> },
        { path: "/cart", element: <ProtectRoutes><Cart /> </ProtectRoutes> },
        { path: "/wishList", element: <ProtectRoutes><WishList /> </ProtectRoutes> },
        { path: "/profile", element: <ProtectRoutes><Profile /> </ProtectRoutes> },
        { path: "/createOrder", element: <ProtectRoutes><CreateOrder /> </ProtectRoutes> },
        { path: "/orders", element: <ProtectRoutes><Orders /> </ProtectRoutes> },
        { path: "*", element: <ErrorPage/>  },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
