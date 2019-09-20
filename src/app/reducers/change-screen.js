import { initialState } from "./initial-state";
import * as types from '../constants/redux';

export function stepsReducer (state = initialState, action) {
	switch (action.type) {
    case types.START_SCREEN:
			return {
				...state,
				currentScreen: types.START_SCREEN,
      };

		case types.GAME_SCREEN:
			return {
				...state,
				currentScreen: types.GAME_SCREEN,
			};

		default:
			return state;
	}
}