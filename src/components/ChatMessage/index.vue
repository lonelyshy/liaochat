<template>
  <div class="chat-message">
    <div class="left-content">
      <div class="img"></div>
    </div>
    <div class="right-content">
      <div class="user-name">
        {{ userName }}
      </div>
      <div class="user-content">
        {{ msg }}
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
  //聊天用户的名称
  @Prop({ type: String, default: "这是用户名" }) userName?: string
  //用户发送的消息
  @Prop({
    type: String,
    default: "这是学习"
  })
  msg?: string
}
</script>

<style lang="scss" scoped>
.chat-message {
  border: 1px solid blue;
  width: 100%;
  min-height: 70px;
  .left-content {
    float: left;
    .img {
      width: 35px;
      height: 35px;
      border-radius: 10px;
      border: 1px solid black;
    }
  }
}
</style>
