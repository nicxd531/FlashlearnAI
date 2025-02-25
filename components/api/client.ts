import axios from "axios";
const web = "http://localhost:8989";
const androidStudio = "http://10.0.2.2:8989";

const client = axios.create({
  baseURL: androidStudio,
});

export default client;
