const userInfo = {
  namespaced: true,
  state: () => ({
    userName: "",
    userIcon: "",
    socket: ""
  }),
  mutations: {
    UPDATE_USER_NAME(state: any, userName: string) {
      //mutation最好这样写
      state.userName = userName
    },
    UPDATE_SOCKET(state: any, socket: any) {
      state.socket = socket
    },
    UPDATE_USERICON(state: any, userIcon: any) {
      state.userIcon = userIcon
    }
  },
  actions: {}
}
export default userInfo
