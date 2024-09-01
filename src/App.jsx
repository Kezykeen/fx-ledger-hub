import styled from "styled-components";
import { Provider } from "./layouts/provider";
import Router from "./router";
import { Slide, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <StyledContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
      <Provider>
        <Router />
      </Provider>
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
