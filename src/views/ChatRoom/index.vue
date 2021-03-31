<template>
  <div class="chat-room">
    <div class="chat">
      <div class="chat-name">
        <h1>roomName:{{ roomName }}</h1>
      </div>
      <div class="chat-content">
        <chat-message
          v-for="(item, key) in chatList"
          :key="key"
          :data="item.data"
          :userName="item.userName"
          :userIcon="item.userIcon"
          :direction="item.direction"
          :type="item.type"
        >
        </chat-message>
      </div>
      <div class="chat-user">
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
          <el-input
            type="textarea"
            resize="none"
            v-model="chatSendContent"
            @keypress.enter.native="sendMessage($event)"
          ></el-input>
        </div>
        <div class="chat-send-file">
          <el-upload
            class="upload-image"
            :before-upload="beforeUpload"
            :show-file-list="false"
            action="http://127.0.0.1:3000/singup"
            :data="{ roomName: roomName }"
            name="singleFile"
            :on-success="fileUploadSuccess"
          >
            <i class="el-icon-picture" @click="sendFile"></i>
          </el-upload>

          <i class="el-icon-files"></i>
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
  userList: any = []
  socket: any
  chatList: any = []
  //退出当前房间
  quitRoom() {
    this.$router.push({ name: "Register" })
  }
  sendMessage($event: any) {
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
  }

  sendFile() {
    console.log("sendFile")
  }
  fileUploadSuccess(response: any, file: any, fileList: any) {
    //code为0上传成功
    if (response.code === 0) {
      console.log(response)
      this.socket.emit("sendMessageServer", {
        type: "image",
        data: { imagePath: response.data.path.path }
      })
      console.log("")
    }
  }
  beforeUpload(file: any) {
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
  created() {
    this.roomName = this.$route.query.roomName as string
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
        data.direction = socketId === this.socket.id ? "right" : "left"
        this.chatList.push(data)
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
    .chat-name {
      height: 100px;
      width: 800px;
      top: 0px;
      border: 1px solid red;
      position: absolute;
    }
    .chat-content {
      overflow-x: hidden;
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

      .chat-send-file {
        .upload-image {
          display: inline-block;
          margin-right: 5px;
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
