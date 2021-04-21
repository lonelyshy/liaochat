<template>
  <div class="chat-room">
    <div class="chat">
      <div class="chat-name">
        <h1>roomName:{{ roomName }}</h1>
      </div>
      <!-- 聊天内容 -->
      <div class="chat-content">
        <el-scrollbar style="height:100%" ref="myScrollbar">
          <chat-message
            v-for="(item, key) in chatList"
            :key="key"
            :data="item.data"
            :userName="item.userName"
            :userIcon="item.userIcon"
            :direction="item.direction"
            :type="item.type"
            :time="item.time"
          >
          </chat-message>
          <!-- <chat-message type="sound"></chat-message> -->
        </el-scrollbar>
      </div>
      <!-- 当前聊天用户 -->
      <div class="chat-user">
        <div>
          当前用户<span style="margin-left:5px">{{ userLength }}名</span>
        </div>
        <user-card
          v-for="(user, key, index) in userList"
          :key="index"
          :userName="user.userName"
          :userIcon="user.userIcon"
        >
        </user-card>
      </div>
      <div class="chat-send">
        <div class="chat-send-content">
          <!-- <el-input
            type="textarea"
            resize="none"
            v-model="chatSendContent"
            @keypress.enter.native="sendMessage($event)"
            :autosize="{ minRows: 4, maxRows: 4 }"
            placeholder="请输入要发送的内容..."
          ></el-input> -->
          <div
            ref="userInput"
            id="user-input"
            contenteditable="true"
            @keypress.enter.exact="sendMessage($event)"
            v-html="chatSendContent"
            @input="inputMessage($event)"
            @focus="isDivChange = false"
            @blur="userInputBlur($event)"
          ></div>
        </div>
        <div class="chat-send-file">
          <el-upload
            class="upload-image"
            :before-upload="beforePicUpload"
            :show-file-list="false"
            action="http://127.0.0.1:3000/uploadPic"
            :data="{ roomName: roomName }"
            name="uploadPic"
            :on-success="picUploadSuccess"
            accept=".jpg,.jpeg,.png,.gif,.bmp,.JPG,.JPEG,.GIF,.BMP"
          >
            <i class="el-icon-picture" @click="sendFile"></i>
          </el-upload>
          <div class="emoji emoji-class">
            <el-popover placement="top-start" width="200" trigger="click">
              <img
                slot="reference"
                class="img"
                src="@/assets/emoji.svg"
                alt=""
              />
              <span
                class="emoji-class"
                v-for="(item, index) in emojiList"
                :key="index"
                @click="emojiClick($event, item)"
              >
                {{ item }}
              </span>
            </el-popover>
          </div>
          <el-upload
            class="upload-file"
            :before-upload="beforeFileUpload"
            :show-file-list="false"
            action="http://127.0.0.1:3000/uploadFile"
            :data="{ roomName: roomName }"
            name="uploadFile"
            :on-success="fileUploadSuccess"
            accept="*"
          >
            <i class="el-icon-files emoji emoji-class"></i>
          </el-upload>
          <div class="record-sound emoji emoji-class">
            <el-popover
              ref="sound"
              placement="top-start"
              width="200"
              trigger="click"
              @show="soundShow"
              @hide="soundHide"
            >
              <img
                slot="reference"
                class="img"
                src="@/assets/record.png"
                alt=""
              />
              <el-progress
                :percentage="percentage"
                :format="soundFormat"
              ></el-progress>
              <el-button type="text" size="mini" @click="soundHideSend"
                >发送</el-button
              >
              <el-button type="text" size="mini" @click="soundHideClose"
                >取消</el-button
              >
            </el-popover>
          </div>
        </div>
        <div class="chat-send-button">
          <el-button>关闭</el-button>
          <el-button @click="sendMessage">发送</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import ChatMessage from "../../components/ChatMessage/index.vue"
import UserCard from "../../components/UserCard/index.vue"
import Utils from "@/utils/utils"
import Recorder from "js-audio-recorder" //导入音频记录插件
import Axios from "axios"
@Component({
  name: "chatRoom",
  components: {
    ChatMessage,
    UserCard
  }
})
export default class ChatRoom extends Vue {
  chatSendContent = ""
  roomName = ""
  //当前用户在线列表
  userList: any = {}
  socket: any
  chatList: any = []
  percentage = 0 //录音百分比
  emojiList = [
    "😃",
    "😄",
    "😅",
    "😆",
    "😉",
    "😊",
    "😋",
    "😎",
    "😍",
    "😘",
    "😗",
    "😙",
    "😚",
    "😇",
    "😐",
    "😑",
    "😶",
    "😏",
    "😣",
    "😥",
    "😮",
    "😯",
    "😪",
    "😫",
    "😴",
    "😌",
    "😛",
    "😜",
    "😝",
    "😒",
    "😓",
    "😔",
    "😕",
    "😲",
    "😷",
    "😖",
    "😞",
    "😟",
    "😤",
    "😢",
    "😭",
    "😦",
    "😧",
    "😨",
    "😬",
    "😰",
    "😱",
    "😳",
    "😵",
    "😡",
    "😠"
  ]
  isDivChange = true //判断是否正在输入
  soundInterval: any = "" //sound 循环
  soundRecorder: any
  //退出当前房间
  get userLength() {
    return Object.keys(this.userList).length
  }
  soundFormat(percentage: any) {
    return "   " + percentage + "秒"
  }
  soundShow() {
    //开始录音
    ;(Recorder as any).getPermission().then(
      () => {
        console.log("给权限了")
        this.soundInterval = setInterval(() => {
          this.percentage += 1
        }, 1000)
      },
      (error: any) => {
        console.log(`${error.name} : ${error.message}`)
      }
    )

    console.log("this.soundInterval", this.soundInterval)
    this.soundRecorder.start().then(
      () => {
        // 开始录音
      },
      (error: any) => {
        // 出错了
        console.log(`${error.name} : ${error.message}`)
      }
    )
  }
  soundHide() {
    //结束录音
    clearInterval(this.soundInterval)
    this.percentage = 0
    this.soundRecorder.stop()
    // this.soundRecorder.play()
  }
  soundHideSend() {
    //发送录音
    this.soundHideClose()
    const sound = this.soundRecorder.getWAVBlob()
    console.log("sound", sound)
    const data = new FormData()
    data.append("roomName", this.roomName)
    data.append(
      "fileName",
      this.$store.state.userInfo.userName + "-" + new Date().getTime() + ".wav"
    )
    data.append("uploadSound", sound)
    data.append("duration", this.soundRecorder.duration)
    Axios({
      url: "http://127.0.0.1:3000/uploadSound",
      method: "post",
      headers: { "content-type": "multipart/form-data" },
      data: data
    })
      .then((res: any) => {
        const { data } = res
        if (data.code == 0) {
          this.socket.emit("sendMessageServer", {
            type: "sound",
            data: {
              path: data.data.path.path,
              fileName: data.data.path.name,
              duration: data.data.duration
            }
          })
        }
      })
      .catch((err: any) => console.log(err))
  }
  soundHideClose() {
    ;(this.$refs.sound as any).doClose() //el-popover 自带的事件 关闭显示
  }
  emojiClick(e: any, item: any) {
    const text = this.$refs.userInput as any
    console.log((text.innerHTML += item))
  }
  quitRoom() {
    this.$router.push({ name: "Register" })
  }
  inputMessage(e: any) {
    if (this.isDivChange) {
      this.chatSendContent = e.target.innerHTML
    }
  }
  userInputBlur(e: any) {
    this.isDivChange = true
    this.chatSendContent = e.target.innerHTML
  }
  insertBr(e: any) {
    console.log("asdas")
    e.target.innerHTML += "\n"
  }
  sendMessage($event: any) {
    console.log(this.emojiList.length)
    this.chatSendContent = $event.target.innerHTML
    if (this.chatSendContent.match(/^[\s]*$/)) {
      //如果全是空格或者空白符
      console.log("不发送")
    } else {
      this.socket.emit("sendMessageServer", {
        type: "txt",
        data: this.chatSendContent
      })
    }
    if ($event.keyCode === 13) {
      $event.preventDefault() // 阻止浏览器默认换行操作
    }
    this.chatSendContent = ""
    $event.target.innerHTML = ""
  }

  sendFile() {
    console.log("sendFile")
  }
  picUploadSuccess(response: any, file: any, fileList: any) {
    //code为0上传成功
    if (response.code === 0) {
      console.log(response)
      this.socket.emit("sendMessageServer", {
        type: "image",
        data: { path: response.data.path.path }
      })
      console.log("")
    }
  }
  fileUploadSuccess(response: any, file: any, fileList: any) {
    //code为0上传成功
    if (response.code === 0) {
      console.log(response)
      console.log(file)
      this.socket.emit("sendMessageServer", {
        type: "file",
        data: { path: response.data.path.path, fileName: file.name }
      })
      console.log("")
    }
  }
  beforePicUpload(file: any) {
    console.log(file)
    const isJPG = file.type === "image/jpeg" || file.type === "image/png"
    const isLt2M = file.size / 1024 / 1024 < 2

    if (!isJPG) {
      this.$message.error("上传头像图片只能是 JPG 格式!")
    }
    if (!isLt2M) {
      this.$message.error("上传头像图片大小不能超过 2MB!")
    }
    return isJPG && isLt2M
  }
  beforeFileUpload(file: any) {
    console.log(file)

    const isLt2M = file.size / 1024 / 1024 < 50

    if (!isLt2M) {
      this.$message.error("上传头像图片大小不能超过 2MB!")
    }
    return isLt2M
  }
  created() {
    this.roomName = this.$route.query.roomName as string
    this.soundRecorder = new Recorder({
      sampleBits: 16, // 采样位数，支持 8 或 16，默认是16
      sampleRate: 48000, // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
      numChannels: 2 // 声道，支持 1 或 2， 默认是1
    })
    try {
      const io = require("socket.io-client")
      this.socket = io("http://localhost:3000", {
        query: {
          roomName: this.roomName
        }
      })
      console.log(this.socket)
      // this.socket.emit("sendMessage", "这是一条新消息")
      this.socket.on("addNewUserclient", (data: any) => {
        this.userList = data
        console.log("addNewUserclient this.userList", this.userList)
      })
      this.socket.on("sendMessageClient", (data1: any) => {
        //收到消息
        const { socketId, data } = data1
        data.userName = this.userList[socketId].userName
        data.userIcon = this.userList[socketId].userIcon
        data.direction = socketId === this.socket.id ? "right" : "left" //判断消息在左还是右边
        data.time = Utils.getNowTime()
        this.chatList.push(data)
        console.log("data", data)
        const scrollBar = this.$refs.myScrollbar as any
        this.$nextTick(() => {
          scrollBar.wrap.scrollTop = scrollBar.wrap.scrollHeight
        })
        console.log("this.userList", this.userList)
      })
      //发送用户名称
      this.socket.emit("addNewUserServer", {
        userName: this.$store.state.userInfo.userName
      })
    } catch (error) {
      console.log(error)
    }
  }
  beforeDestroy() {
    this.socket.close()
  }
}
</script>

<style lang="scss" scoped>
[contenteditable]:focus {
  outline: none;
}
.emoji-class {
  cursor: pointer;
}
::v-deep .el-scrollbar__wrap {
  overflow-y: auto;
  overflow-x: hidden;
}
.chat-room {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .chat {
    overflow: hidden;
    border: 2px solid black;
    width: 800px;
    height: 600px;
    position: relative;
    background-color: rgb(255, 255, 255);
    .chat-name {
      height: 100px;
      width: 800px;
      top: 0px;
      border: 1px solid red;
      position: absolute;
    }
    .chat-content {
      height: 350px;
      width: 600px;
      top: 100px;
      border: 1px solid blueviolet;
      position: absolute;
    }
    .chat-user {
      position: absolute;
      height: 500px;
      width: 198px;
      border: 1px solid blueviolet;
      top: 100px;
      right: 0px;
    }
    .chat-send {
      position: absolute;
      bottom: 50px;
      width: 600px;
      height: 100px;
      // border: 1px red solid;
      .chat-send-content {
        #user-input {
          overflow-x: hidden;
          height: 85px;
          width: 590px;
          margin: 20px 5px 5px 5px;
        }
      }
      .chat-send-file {
        display: flex;
        // background-color: rgb(255, 255, 255);
        align-content: flex-start;
        .upload-image {
          display: inline-block;
          margin-right: 5px;
        }
        .emoji {
          width: 16px;
          height: 16px;
          margin-right: 5px;
          .img {
            width: 100%;
            height: auto;
          }
        }
        width: 600px;
        position: inherit;
        padding: 5px;
        top: 0px;
      }
      ::v-deep .el-textarea__inner {
        background-color: transparent;
        padding: 20px 5px 5px 5px;
        // border: none;
        border: 1px black solid;
        border-top: 1px black solid;
      }
      .chat-send-button {
        margin-right: 10px;
        float: right;
      }
    }
  }
}
</style>
