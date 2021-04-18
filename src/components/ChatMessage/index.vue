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
          <span></span>
          <span>{{ userName }}</span>
          <span style="margin-left:5px">{{ time }}</span>
        </div>
        <div class="user-content" style="padding-left:60px">
          <div v-if="type == 'txt'" v-html="data"></div>
          <div v-if="type == 'image'">
            <el-image
              style="width: 100px; height: 100px"
              :src="'http://127.0.0.1:3000/' + data.imagePath"
              fit="fit"
            ></el-image>
          </div>
          <div v-if="type == 'file'" class="file">
            <div class="file-img" style="float:left">
              <img style="width:100%" src="@/assets/file.svg" alt="" />
            </div>
            <div>
              <a
                :href="'http://127.0.0.1:3000/' + data.path"
                style="margin:0px 5px ;color:#409eff"
                target="_black"
                >{{ data.fileName }}
              </a>
              <span class="size" style="margin-left:5px">(112.12kb)</span>
            </div>
            <div>
              <span style="margin-left:10px" class="size"
                >您已经成功上传,请尽快下载</span
              >
            </div>
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
          <span></span>
          <span style="margin-right:5px">{{ time }}</span>
          <span> {{ userName }}</span>
        </div>
        <div class="user-content" style="padding-right:60px">
          <div v-if="type == 'txt'" v-html="data"></div>
          <div v-if="type == 'image'">
            <el-image
              style="width: 100px; height: 100px"
              :src="'http://127.0.0.1:3000/' + data.path"
              fit="fit"
            ></el-image>
          </div>
          <div v-if="type == 'file'" class="file">
            <div class="file-img" style="float:right">
              <img style="width:100%" src="@/assets/file.svg" alt="" />
            </div>
            <div>
              <a
                :href="'http://127.0.0.1:3000/' + data.path"
                style="margin:0px 5px ;color:#409eff"
                target="_black"
                >{{ data.fileName }}
              </a>
              <span class="size" style="margin-left:5px">(112.12kb)</span>
            </div>
            <div>
              <span style="margin-left:10px" class="size"
                >您已经成功上传,请尽快下载</span
              >
            </div>
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
  @Prop({ type: String, default: "right" }) direction?: string
  //聊天用户的名称
  @Prop({ type: String, default: "这是用户名" }) userName?: string
  //用户发送的消息
  @Prop() data?: any
  //  @Prop({
  //   type: String,
  //   default: "这是学习"
  // })
  // data?: any
  //用户图标
  @Prop({
    type: String,
    default: ""
  })
  userIcon?: string
  //消息type类型
  @Prop({
    type: String,
    default: ""
  })
  // 发送消息的时间
  type?: string
  @Prop({
    type: String,
    default: () => ""
  })
  time?: string
}
</script>

<style lang="scss" scoped>
.size {
  color: #a9a9a9;
  font-size: 12px;
}
.file {
  min-height: 50px;
  padding: 10px;
  .file-img {
    height: 35px;
    width: 35px;
    // border: 1px solid black;
    position: relative;

    &::before {
      position: absolute;
      width: 15px;
      height: 15px;
      right: 0px;
      bottom: 0px;
      content: "";
      background: url("~@/assets/ok.png") no-repeat;
      background-size: contain;
      display: block;
      z-index: 20;
    }
  }
}
.chat-message {
  margin-top: 5px;
  border: 1px solid blue;
  width: 590px;
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
      .user-content {
        padding-left: 50px;
      }
      .img {
        width: 35px;
        height: 35px;
        border-radius: 10px;
        // border: 1px solid black;
      }
    }
    .right-content {
      text-align: right;
      .user-name {
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>
