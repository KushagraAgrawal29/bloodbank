import axios from "axios";

const baseURL = "https://bloodbank-flame.vercel.app";

export default axios.create({ baseURL: baseURL });
