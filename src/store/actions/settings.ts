import * as types from '../types'
import * as settingsApi from '@api/settings'
import { ThunkAction } from 'redux-thunk'
import { ISettings } from '@interfaces/settings'

type ThunkResult<R> = ThunkAction<R, any, undefined, any>;

export const getSettings = ():ThunkResult<Promise<ISettings>> => async dispatch => {
    const payload = await settingsApi.getSettings()
    dispatch({
        type: types.settings.SET_SETTINGS,
        payload
    })
    return payload
}
