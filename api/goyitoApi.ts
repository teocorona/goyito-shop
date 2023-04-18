import axios from "axios";

const goyitoApi = axios.create({
  baseURL:'/api'
});

export default goyitoApi;