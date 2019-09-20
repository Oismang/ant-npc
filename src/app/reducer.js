import { initialState } from './reducers/initial-state';
import reducerComposer from '../app/shared/reducer-composer';
import * as reducerComponents from './reducers';

/**
 * @param {*} state  current state
 * @param {*} action action
 */
export const appReducer = (state = initialState, action) => reducerComposer(reducerComponents, state, action);
