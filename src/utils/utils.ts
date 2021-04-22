const utils = {
  sleep: (time: number) => {
    return new Promise((resolve) => setTimeout(resolve, time))
  },
  getNowTime: function() {
    let dateTime = ""
    const yy = new Date().getFullYear()
    const mm = new Date().getMonth() + 1
    const dd = new Date().getDate()
    const hh = new Date().getHours()
    const mf =
      new Date().getMinutes() < 10
        ? "0" + new Date().getMinutes()
        : new Date().getMinutes()
    const ss =
      new Date().getSeconds() < 10
        ? "0" + new Date().getSeconds()
        : new Date().getSeconds()
    dateTime = yy + "-" + mm + "-" + dd + " " + hh + ":" + mf + ":" + ss
    console.log(dateTime)
    return dateTime
  },
  compareListMore(
    oldList: Array<any>,
    newList: Array<any>,
    userList: any,
    data: any
  ) {
    //旧的比新的多 那么就表明有人退出了
    //返回退出的人 少的人
    const LessList: any = []
    oldList.forEach((item: any) => {
      //
      if (!newList.includes(item)) {
        LessList.push(userList[item].userName)
      }
    })
    return LessList
  },
  compareListLess(
    oldList: Array<any>,
    newList: Array<any>,
    userList: any,
    data: any
  ) {
    //旧的比新的少 那么就表明有人新来了
    //返回新来的人
    const MoreList: any = []
    newList.forEach((item: any) => {
      //
      if (!oldList.includes(item)) {
        MoreList.push(data[item].userName)
      }
    })
    return MoreList
  }
}

export default utils
