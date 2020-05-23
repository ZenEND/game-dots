import * as types from "../types";
import {ISettings} from "@interfaces/settings";

const winners = (state: ISettings = {}, action) => {
    switch (action.type) {
        case types.settings.SET_SETTINGS:
            return action.payload
        default:
            return state;
    }
};

export { winners };
