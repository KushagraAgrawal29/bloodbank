import axios from "axios";

const baseURL = "https://bloodbank-x7lu.vercel.app/";

export default axios.create({ baseURL: baseURL });
