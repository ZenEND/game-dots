import { axiosInstance } from "./axiosInstance";


export const getWinners = () => {
    return axiosInstance.get("/winners").then(res => res.data)
}



export const postWinner = ({ winner, date }) => {
    return axiosInstance.post("/winners", { winner, date }).then(res => res.data)
}
