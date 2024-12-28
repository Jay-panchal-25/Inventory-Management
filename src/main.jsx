import { Children, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import store from "./store/store.js";
import SignupPage from "./components/Signup.jsx";
import LoginPage from "./components/Login.jsx";
import DashBoard from "./components/DashBoard.jsx";
import AddItem from "./components/AddItem.jsx";
import Stock from "./components/Stock.jsx";
import ItemCard from "./components/ItemCard.jsx";
import UpdateItem from "./components/UpdateItem.jsx";
import Logout from "./components/Logout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/stock",
        element: <Stock />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/dashBoard",
        element: <DashBoard />,
      },
      {
        path: "/addItem",
        element: <AddItem />,
      },
      {
        path: "/updateItem/:id",
        element: <UpdateItem />,
      },

      {
        path: "/itemCard",
        element: <ItemCard />,
      },
      {
        path: "/logout",
        element: <Logout />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
