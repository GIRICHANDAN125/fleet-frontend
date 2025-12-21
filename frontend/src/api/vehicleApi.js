import axios from "./axios";

export const getVehicles = () => axios.get("/vehicles");
export const addVehicle = (data) => axios.post("/vehicles", data);
