import axios from "axios";

const api = axios.create({
  baseURL: "https://react-node-to-do-list-ws.onrender.com",
});

export default api;
