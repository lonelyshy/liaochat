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
          :msg="item.msg"
          :userName="userList[item.socketId]"
          :direction="item.socketId === socket.id ? 'right' : 'left'"
        >
        </chat-message>
        <!-- <chat-message direction="right"> </chat-message>
        <chat-message> </chat-message>
        <chat-message> </chat-message> -->
      </div>
      <div class="chat-user">
        <user-card
          v-for="(user, index) in userList"
          :key="index"
          :userName="user"
        >
        </user-card>
      </div>
      <div class="chat-send">
        <div class="chat-send-content">
          <el-input type="textarea" v-model="chatSendContent"></el-input>
        </div>
        <div class="chat-send-button">
          <el-button>关闭</el-button>
          <el-button @click="sendMessage">发送</el-button>
        </div>
      </div>
    </div>
    <el-dialog
      title="请输入用户名"
      :visible.sync="userNameDialog"
      width="30%"
      :close-on-click-modal="false"
      max-length="10"
    >
      <el-form ref="userInfoForm" :model="userInfo">
        <el-form-item
          prop="name"
          :rules="[
            {
              required: true,
              message: '用户名不能为空',
              trigger: 'blur'
            }
          ]"
        >
          <el-input
            type="text"
            placeholder="请输入你的用户名称"
            v-model="userInfo.name"
            clearable
            maxlength="10"
            show-word-limit
          >
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="quitRoom">退 出</el-button>
        <el-button type="primary" @click="submitUserName">确 定</el-button>
      </span>
    </el-dialog>
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
  userInfo = {
    name: ""
  }
  roomName = ""
  //当前用户在线列表
  userList: any = []
  userNameDialog = false
  socket: any
  chatList: any = []
  submitUserName() {
    ;(this.$refs.userInfoForm as any).validate((valid: any) => {
      if (valid) {
        //如果校验通过
        this.userNameDialog = false
        // console.log(this.userInfo.name)
        //发送用户名称
        this.socket.emit("addNewUserServer", { userName: this.userInfo.name })
      } else {
        return false
      }
    })
  }
  //退出当前房间
  quitRoom() {
    this.userNameDialog = false
    this.$router.push({ name: "Register" })
  }
  sendMessage() {
    if (this.chatSendContent.match(/^[\s]*$/)) {
      //如果全是空格或者空白符
      console.log("不发送")
    } else {
      this.socket.emit("sendMessageServer", this.chatSendContent)
      this.chatSendContent = "" //清空输入框
    }
  }
  created() {
    this.roomName = this.$route.query.roomName as string
    this.userNameDialog = true
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
        console.log(this.userList)
      })
      this.socket.on("sendMessageClient", (data: any) => {
        this.chatList.push(data)
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
      height: 400px;
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
      bottom: 0px;
      width: 600px;
      height: 100px;
      border: 1px red solid;
      >>> .el-textarea__inner {
        padding: 0px;
      }
      .chat-send-button {
        margin-right: 10px;
        float: right;
      }
    }
  }
}
</style>
