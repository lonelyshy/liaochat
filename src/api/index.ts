import Axios from "axios"
Axios.defaults.baseURL = "http://127.0.0.1:3000"
const API = {
  //创建房间
  addRoom: (params: any) => Axios.get("/addRoom", { params }),
  //增加房间
  queryRoom: (params: any) => Axios.get("/queryRoom", { params })
}

export default API
