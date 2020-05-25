import * as winnersApi from '@api/winners'
import * as types from '../types'
import { ThunkAction } from 'redux-thunk'
import { IWinner } from '@interfaces/winner'


type ThunkResult<R> = ThunkAction<R, any, undefined, any>;


export const getWinners = (): ThunkResult<Promise<IWinner[]>> => dispatch => {
    return winnersApi.getWinners().then(payload => {
        dispatch({
            type: types.winners.SET_WINNERS,
            payload
        })
        return payload
    })
}



export const postWinner = (name, date): ThunkResult<Promise<IWinner[]>> => dispatch => {
    return winnersApi.postWinner({ winner: name, date }).then(payload => {
        dispatch({
            type: types.winners.SET_WINNERS,
            payload
        })
        return payload
    })
}