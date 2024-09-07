"use client";

import { ThemeProvider } from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import { theme } from "../theme";
import GlobalStyle from "../globals/globalStyles";
import StyledComponentsRegistry from "./registry";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { persistor, store } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";

// eslint-disable-next-line react/prop-types
export const Providers = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
      },
    },
  });

  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <QueryClientProvider client={queryClient}>
              <GlobalStyle />
              {children}
            </QueryClientProvider>
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
};
