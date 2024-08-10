import Router from "routes";

import Navbar from "./shared/components/Navbar";

import { ToastContainer } from "react-toastify";

import { Content } from "shared/styles/styles";

function App() {
  return (
    <>
      <Navbar />
      <Content>
        <Router />
      </Content>
      <ToastContainer />
    </>
  );
}

export default App;
