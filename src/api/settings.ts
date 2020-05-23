import { axiosInstance } from './axiosInstance'


export const getSettings = ():Promise<any> => {
    return axiosInstance.get('/game-settings').then(res => res.data)
}