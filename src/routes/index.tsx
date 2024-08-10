import { Route, Routes } from "react-router-dom";

import { Login, Register, NotFound, Products } from "pages";

import PrivateRoute from "./PrivateRoute";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/products" element={<PrivateRoute />}>
        <Route index element={<Products />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
