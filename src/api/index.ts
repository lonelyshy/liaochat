import Axios from "axios"
Axios.defaults.baseURL = "http://127.0.0.1:3000"
const API = {
  //创建房间
  addRoom: (params: any) => Axios.get("/addRoom", { params }),
  //增加房间
  queryRoom: (params: any) => Axios.get("/queryRoom", { params }),
  //查询用户名是否重复
  queryUserName: (params: any) => Axios.get("/queryUserName", { params })
}

export default API
