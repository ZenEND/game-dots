import { axiosInstance} from "./axiosInstance";


export const getWinners = () => {
    return axiosInstance.get("/winners").then(res => res.data)
}