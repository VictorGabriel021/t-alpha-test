import { Route, Routes } from "react-router-dom";

import { Login, NotFound } from "pages";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
