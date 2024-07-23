// eslint-disable-next-line no-unused-vars
import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import "./styles/tailwind.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Map from "./components/Map/Map";
import MarkerDetail from "./components/Map/MarkerDetail";
import List from "./components/List";

const router = createBrowserRouter([
  {
    path: '/mualaApp/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Map />,
      },
      {
        path: ':id',
        element: <MarkerDetail />,
      },
      {
        path: 'list',
        element: <List />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
