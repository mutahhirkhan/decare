import storage from "redux-persist/lib/storage";
import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import campaignExplorerReducer from "./../containers/CampaignExplorer/slice";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

const persistConfig = {
	key: "root",
	version: 1,
	storage,
	whitelist: ["campaignExplorer"], //whielisting it for just checking
};

const reducers = combineReducers({
	campaignExplorer: campaignExplorerReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware({
		serializableCheck: {
			ignoredActions: [FLUSH, REHYDRATE, PAUSE, PURGE, REGISTER, PERSIST],
		},
	}),
});

export let persistor = persistStore(store);
