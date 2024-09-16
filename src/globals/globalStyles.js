import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle` 
:root{
  --ds-background-selected:#1CA198 !important;
}

* {
    box-sizing: border-box;
    font-family: "Montserrat", sans-serif ;
     font-optical-sizing: auto;
     font-style: normal;
     scroll-behavior: smooth;
  }

  html,
  body,p,h1,h2,h3,h4,h5,h6 {
    color: ${({ theme }) => theme.colors.black};
    padding: 0;
    margin: 0;
    font-family: "Montserrat", sans-serif;                       
  }

  input {
  font-family: "Montserrat", sans-serif; 
    ::placeholder {
    font-family: "Montserrat", sans-serif;  
    }
  }

  html{
    display: flex;
    width: 100vw;
    justify-content: center;
    box-sizing: border-box;
    font-size: 16px;
    @media(max-width: 500px) {
      font-size: 14px;
    }        
  }
  
  body{
    width: 100%;
    flex:1;
    font-size: 16px;
    font-family: "Montserrat", sans-serif;  

  }

  a {
    color: inherit;
    text-decoration: none;
    font-family: "Montserrat", sans-serif;  

  }

  button {
    outline: none;
    font-family: "Montserrat", sans-serif;  

  }

  .react-tel-input .form-control {
    width: 100%;
    height: 50px;

    &:focus {
    outline: none;
    border: 1px solid #f4a261;
    box-shadow: 0 0 0 2px rgba(244, 162, 97, 0.2);
    }
  }
  .react-tel-input .flag-dropdown {
    background: #fff;
  }

  .react-tel-input .selected-flag {
    padding: 0 5px; 
  }

  svg {
    flex-shrink: 0;
  }

/** Used to define container behavior: width, position: fixed etc... **/
.Toastify__toast-container {
  border-radius: 8px;
  min-width: 450px !important;
  background: transparent !important;
  right: 112px !important;
  top: 50px !important;
  z-index: 1000000000 !important;
}

.Toastify__toast {
  width: 100%;
  padding: 16px !important;
  /* height: 94px; */
  margin-bottom: 0px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.08);
  background-color: white !important;
}

.Toastify__toast.Toastify__toast--error {
  background-color:#fef6f6 !important;
}

.Toastify__toast.Toastify__toast--success {
 background-color:#F4FBF7 !important;
}
.Toastify__toast.Toastify__toast--info {
 background-color:white !important;
}

.Toastify__toast-body {
  gap: 24px;
  padding: 8px !important;
  width: calc(100% - 24px);
}

.Toastify__toast-icon {
  width: 28px !important;
  height: 28px;
  -webkit-margin-end: 0px !important;
  margin-inline-end: 0px !important;
}

/* Modal animate in and out styling */
.ReactModal__Overlay {
	opacity: 0;
	transition: opacity 500ms ease-in-out;
}

.ReactModal__Overlay--after-open {
	opacity: 1;
}

.ReactModal__Overlay--before-close {
	opacity: 0;
	transition: opacity 0.5s;
}

`;

export default GlobalStyle;
