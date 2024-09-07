import styled from "styled-components";
import { Providers } from "./layouts/provider";
import Router from "./router";
import { Bounce, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <StyledContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <Providers>
        <Router />
      </Providers>
    </>
  );
}

export default App;

const StyledContainer = styled(ToastContainer)`
  &&&.Toastify__toast-container {
    right: 45px !important;
    top: 30px !important;
  }
  .Toastify__toast {
  }
  .Toastify__toast-body {
    align-items: unset;
  }
  .Toastify__progress-bar {
  }
`;
