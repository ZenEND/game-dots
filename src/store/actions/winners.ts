import * as winnersApi from '@api/winners'
import * as types from '../types'
import { ThunkAction } from 'redux-thunk'
import { IWinner } from '@interfaces/winner'

export const getWinners = (): ThunkAction<Promise<IWinner>, any, any, any> => dispatch => {
    return winnersApi.getWinners().then(payload => {
        dispatch({
            type: types.winners.SET_WINNERS,
            payload
        })
        return payload
    })
}



export const postWinner = (name, date): ThunkAction<Promise<IWinner>, any, any, any> => dispatch => {
    return winnersApi.postWinner({ name, date }).then(payload => {
        dispatch({
            type: types.winners.POST_WINNER,
            winner: { name, date }
        })
        return payload
    })
}