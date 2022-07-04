import React from "react";
import "./App.css";
import { Layout } from "./Layout/Layout";
import { GlobalProvider } from "./context/GlobalState";
import { store } from './reduxStore'
import { Provider } from 'react-redux'

export const App = () => {
	return (
		<Provider store={store}>
			<GlobalProvider>
				<Layout />
			</GlobalProvider>
		</Provider>
	);
};
