import { combineReducers, configureStore } from '@reduxjs/toolkit';
import reducer from "./reducer";


const rootReducer = combineReducers({
    search: reducer,
});

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
