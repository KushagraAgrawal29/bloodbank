import axios from "axios";

const baseURL = "http://bloodbank-flame.vercel.app";

export default axios.create({ baseURL: baseURL });
