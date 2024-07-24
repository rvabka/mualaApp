// eslint-disable-next-line no-unused-vars
import React from "react";
import { Routes, Route } from "react-router-dom";
import Map from "./components/Map/Map";
import Layout from "./components/Layout";
import "./styles/index.css";
import "./styles/tailwind.css";
import MarkerDetail from "./components/Map/MarkerDetail";
import List from "./components/List";

// eslint-disable-next-line react-refresh/only-export-components
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Map />} />
        <Route path="/:id" element={<MarkerDetail />} />
        <Route path="/list" element={<List />} />
      </Route>
    </Routes>
  );
}
