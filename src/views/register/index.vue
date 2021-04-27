<template>
  <div class="register">
    <div class="created">
      <el-button
        class="created-chat"
        type="primary"
        round
        plain
        @click="chatVisibleChange"
      >
        创建聊天室
      </el-button>
      <el-input
        v-show="chatVisible"
        v-model="chatName"
        placeholder="请输入创建的聊天室名称"
        @keypress.enter.native="creatChatRoom"
        class="created-chat-body"
      >
        <div slot="prepend">
          聊天室名称
        </div>
        <el-button slot="append" icon="el-icon-zoom-in" @click="creatChatRoom">
        </el-button>
      </el-input>
      <el-button
        class="join-chat"
        type="primary"
        round
        plain
        @click="joinVisibleChange"
      >
        加入聊天室
      </el-button>
      <!-- <el-form v-show="joinChatVisible" @submit.native.prevent>
        <el-form-item label="聊天室名称">
          <el-input
            v-model="chatId"
            placeholder="请输入聊天室名称"
            @keyup.enter.native="joinChatRoom"
          ></el-input>
        </el-form-item>
        <el-button @click="joinChatRoom">
          进入
        </el-button>
      </el-form> -->
      <el-input
        v-show="joinChatVisible"
        v-model="chatId"
        placeholder="请输入加入的聊天室名称"
        @keypress.enter.native="joinChatRoom"
        class="join-chat-body"
      >
        <div slot="prepend">
          聊天室名称
        </div>
        <el-button
          slot="append"
          icon="el-icon-s-promotion"
          @click="joinChatRoom"
        >
        </el-button>
      </el-input>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator"
import API from "../../api/index"
@Component({
  name: "Register" //一定要用装饰器 声明这个类是组件
})
export default class Register extends Vue {
  //创建聊天室 是否显示
  chatVisible = false
  //聊天室名称
  chatName = ""
  //加入聊天室 是否显示
  joinChatVisible = false
  //查询聊天室名称
  chatId = ""
  //控制创建聊天室显影
  chatVisibleChange() {
    this.chatVisible = !this.chatVisible
    this.joinChatVisible = false
  }
  //加入聊天室显影
  async joinVisibleChange() {
    this.joinChatVisible = !this.joinChatVisible
    this.chatVisible = false
  }
  //创建聊天室
  async creatChatRoom() {
    const params = {
      name: this.chatName
    }
    if (this.chatName == "") {
      this.$message({
        showClose: true,
        message: "创建失败，聊天室名称不能为空",
        type: "error"
      })
      return false
    }
    try {
      const res = await API.addRoom(params)
      if (!res.data.code) {
        this.$message({
          showClose: true,
          message: "创建房间成功",
          type: "success"
        })
        this.$router.push({
          name: "ChatRoom",
          query: { roomName: this.chatName }
        })
      } else {
        this.$message({
          showClose: true,
          message: "创建房间失败,房间已存在",
          type: "error"
        })
      }
    } catch (err) {
      console.log(err)
    }
  }
  async joinChatRoom() {
    const params = {
      name: this.chatId
    }
    if (this.chatId == "") {
      this.$message({
        showClose: true,
        message: "加入房间失败，聊天室名称不能为空",
        type: "error"
      })
      return false
    }
    try {
      const res = await API.queryRoom(params)
      if (!res.data.code) {
        this.$message({
          showClose: true,
          message: "加入房间成功",
          type: "success"
        })
        this.$router.push({
          name: "ChatRoom",
          query: {
            roomName: this.chatId
          }
        })
      } else {
        this.$message({
          showClose: true,
          message: "加入房间失败,房间不存在",
          type: "error"
        })
      }
    } catch (e) {
      console.log(e)
    }
  }
  mounted() {
    console.log(this.$store.state.userInfo)
    window.document.title = "选择聊天室"
  }
}
</script>

<style lang="scss" scoped>
.register {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .created {
    display: flex;
    flex-direction: column;
    align-items: center;
    .el-button + .el-button {
      margin-left: 0px;
    }
    .created-chat {
      width: 300px;
    }
    .created-chat-body,
    .join-chat-body {
      margin-top: 30px;
    }
    .join-chat {
      margin-top: 30px;
      width: 300px;
    }
  }
}
</style>
