import React from "react";
import "./App.css";
import { Layout } from "./Layout/Layout";
import { GlobalProvider } from "./context/GlobalState";
import { persistor, store } from "./reduxStore";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export const App = () => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<GlobalProvider>
					<Layout />
				</GlobalProvider>
			</PersistGate>
		</Provider>
	);
};