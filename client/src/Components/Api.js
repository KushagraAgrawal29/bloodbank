import axios from "axios";

const baseURL = "https://bloodbank-api-opal.vercel.app/";

export default axios.create({ baseURL: baseURL });
