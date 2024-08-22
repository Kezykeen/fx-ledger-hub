"use client";

import { ThemeProvider } from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import { theme } from "../theme";
import GlobalStyle from "../globals/globalStyles";
import StyledComponentsRegistry from "./registry";

// eslint-disable-next-line react/prop-types
export const Provider = ({ children }) => {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
};
