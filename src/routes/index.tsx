import { Route, Routes } from "react-router-dom";

import { Login, Register, NotFound, Products } from "pages";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

export const Router = () => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path="/products" element={<Products />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
