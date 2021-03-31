<template>
  <div class="chat-message">
    <div v-if="direction === 'left'" class="left">
      <div class="left-content">
        <div class="img">
          <el-image :src="userIcon"></el-image>
        </div>
      </div>
      <div class="right-content">
        <div class="user-name">
          {{ userName }}
        </div>
        <div class="user-content">
          <div v-if="type == 'txt'">{{ data }}</div>
          <div v-if="type == 'image'">
            <el-image
              style="width: 100px; height: 100px"
              :src="'http://127.0.0.1:3000/' + data.imagePath"
              fit="fit"
            ></el-image>
          </div>
        </div>
      </div>
    </div>
    <div v-if="direction === 'right'" class="right">
      <div class="left-content">
        <div class="img">
          <el-image :src="userIcon"></el-image>
        </div>
      </div>
      <div class="right-content">
        <div class="user-name">
          {{ userName }}
        </div>
        <div class="user-content">
          <div v-if="type == 'txt'">{{ data }}</div>
          <div v-if="type == 'image'">
            <el-image
              style="width: 100px; height: 100px"
              :src="'http://127.0.0.1:3000/' + data.imagePath"
              fit="fit"
            ></el-image>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
@Component({
  name: "ChatMessage"
})
export default class ChatMessage extends Vue {
  @Prop({ type: String, default: "left" }) direction?: string
  //聊天用户的名称
  @Prop({ type: String, default: "这是用户名" }) userName?: string
  //用户发送的消息
  @Prop() data?: any
  //  @Prop({
  //   type: String,
  //   default: "这是学习"
  // })
  // data?: any
  @Prop({
    type: String,
    default: ""
  })
  userIcon?: string
  @Prop({
    type: String,
    default: ""
  })
  type?: string
}
</script>

<style lang="scss" scoped>
.chat-message {
  border: 1px solid blue;
  width: 100%;
  min-height: 70px;
  word-wrap: break-word;
  .left {
    .left-content {
      margin: 5px 8px 0px 8px;
      float: left;
      .img {
        width: 35px;
        height: 35px;
        border-radius: 10px;
        // border: 1px solid black;
      }
    }
  }
  .right {
    .left-content {
      margin: 5px 8px 0px 8px;
      float: right;
      .img {
        width: 35px;
        height: 35px;
        border-radius: 10px;
        // border: 1px solid black;
      }
    }
    .right-content {
      text-align: right;
    }
  }
}
</style>
