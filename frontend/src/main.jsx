import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Provider } from "react-redux";
import store from "../State/store.jsx";
import { BrowserRouter } from "react-router-dom";

const activeLabelStyles = {
  transform: "scale(0.85) translateY(-24px)",
};
const colors = {
  pink: {
    dark: "#F25E8E",
    light: "#E5A4B5",
    mid: "#E53865",
  },
};
const colorScheme = {
  pink: {
    dark: "#F25E8E",
    light: "#E5A4B5",
    mid: "#E53865",
  },
};

export const theme = extendTheme({
  colors: colors,
  colorScheme: colorScheme,
  components: {
    Form: {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles,
              },
            },
            "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label":
              {
                ...activeLabelStyles,
              },
            label: {
              top: 0,
              left: 0,
              zIndex: 2,
              position: "absolute",
              backgroundColor: "#E5EDE9",
              pointerEvents: "none",
              mx: 3,
              px: 1,
              my: 2,
              transformOrigin: "left top",
            },
          },
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <BrowserRouter>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </Provider>
    </BrowserRouter>
  </>
);
