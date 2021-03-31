const utils = {
  sleep: (time: number) => {
    return new Promise((resolve) => setTimeout(resolve, time))
  }
}

export default utils
