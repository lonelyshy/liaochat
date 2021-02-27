const userInfo = {
  namespaced: true,
  state: () => ({
    userName: "test",
    userPicUrl: "",
    socket: ""
  }),
  mutations: {
    UPDATE_USER_NAME(state: any, userName: string) {
      //mutation最好这样写
      state.userName = userName
    },
    UPDATE_SOCKET(state: any, socket: any) {
      state.socket = socket
    }
  },
  actions: {}
}
export default userInfo
