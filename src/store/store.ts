import { combineReducers, configureStore } from '@reduxjs/toolkit';
import reducer from "./reducer";

const LOCAL_STORAGE_KEY = 'my-app-state';

const loadState = () => {
    try {
        const serializedState = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

const saveState = (state:RootState) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(LOCAL_STORAGE_KEY, serializedState);
    } catch(err){
       console.log(err);
    }
};

const rootReducer = combineReducers({
    search: reducer,
});

const persistedState = loadState();

export const store = configureStore({
    reducer: rootReducer,
    preloadedState: persistedState,
});

store.subscribe(() => {
    saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;