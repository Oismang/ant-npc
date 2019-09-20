import { combineReducers, createStore } from 'redux';
import { appReducer } from './reducer';


const appReducers = combineReducers({
	appState: appReducer,
});

export const store = createStore(
	appReducers
);
