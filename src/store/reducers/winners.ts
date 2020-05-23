import * as types from "../types";
import {IWinner} from "@interfaces/winner";

const winners = (state: IWinner[] = [], action) => {
    switch (action.type) {
        case types.winners.SET_WINNERS:
            return action.payload
        default:
            return state;
    }
};

export { winners };
