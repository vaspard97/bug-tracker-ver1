import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import { AppProvider } from "../src/context/globalContext";
import {
	createTheme,
	responsiveFontSizes,
	ThemeProvider,
} from "@mui/material/styles";
import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import combinedReducer from "./redux/index";

const store = createStore(combinedReducer, compose(applyMiddleware(thunk)));
let theme = createTheme();
theme = responsiveFontSizes(theme);
ReactDOM.render(
	<Provider store={store}>
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</Provider>,
	document.getElementById("root")
);
