import Axios from "axios"
Axios.defaults.baseURL = "http://127.0.0.1:3000"
const API = {
  addRoom: (params: any) => Axios.get("/addRoom", { params })
}

export default API
