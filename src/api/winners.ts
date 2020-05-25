import { axiosInstance } from "./axiosInstance";


export const getWinners = () => {
    return axiosInstance.get("/winners").then(res => res.data)
}



export const postWinner = ({ name, date }) => {
    return axiosInstance.post("/winners", { name, date }).then(res => res.data)
}
