import { combineReducers } from "redux";

import { winners } from './winners'
import { settings } from './settings'

export const rootReducer = combineReducers({
	winners,
	settings
});
