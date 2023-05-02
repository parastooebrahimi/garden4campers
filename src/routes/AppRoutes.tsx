import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import PropertyDetails from "../views/PropertyDetails";
import Home from "../views/Home";
import Layout from "../layouts";

export default function AppRoutes(): JSX.Element {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index path="/" element={<Home />} />
          <Route index path="/home" element={<Home />} />
          <Route path="properties/:guid" element={<PropertyDetails />} />
        </Route>
      </Routes>
      <Outlet />
    </>
  );
}
