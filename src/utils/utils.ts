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
  }
}

export default utils
