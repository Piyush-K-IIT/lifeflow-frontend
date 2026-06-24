import axios from "axios";

const API = axios.create({

  baseURL:
    "https://lifeflow-backend-5rm3.onrender.com/api"

});

export default API;