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
          <span>{{ userName }}</span>
          <span style="margin-left:10px">{{ time }}</span>
        </div>
        <div class="user-content" style="padding-left:60px">
          <div v-if="type == 'txt'" v-html="data"></div>
          <div v-if="type == 'image'">
            <el-image
              style="width: 100px; height: 100px"
              :src="'http://127.0.0.1:3000/' + data.path"
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
              <span class="size" style="margin-left:5px"
                >{{ data.size }}MB</span
              >
            </div>
            <div>
              <span style="margin-left:10px" class="size"
                >您已经成功上传,请尽快下载</span
              >
            </div>
          </div>
          <div v-if="type == 'sound'" class="sound" @click="soundClick">
            <span>{{ soundTime }}"</span>
            <img
              src="@/assets/sound.png"
              style="width:40px;margin-left:10px"
              alt=""
            />

            <i
              v-if="isPlaying"
              class="el-icon-loading"
              style="margin-left:5px"
            ></i>
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
          <span style="margin-right:10px">{{ time }}</span>
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
              <span class="size" style="margin-left:5px"
                >{{ data.size }}MB</span
              >
            </div>
            <div>
              <span style="margin-left:10px" class="size"
                >您已经成功上传,请尽快下载</span
              >
            </div>
          </div>
          <div v-if="type == 'sound'" class="sound" @click="soundClick">
            <i
              v-if="isPlaying"
              class="el-icon-loading"
              style="margin-right:5px"
            ></i>
            <img
              src="@/assets/sound.png"
              style="width:40px;margin-right:10px"
              alt=""
            />
            <span>{{ soundTime }}"</span>
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

  sound: any = "" //保存音频
  isPlaying = false //音频是否正在播放
  soundTime: any = ""
  async soundClick() {
    if (this.isPlaying) {
      this.sound.pause() //暂停播放
      this.isPlaying = false
    } else {
      await this.sound.play().then(() => {
        console.log("播放完成")
      })
      this.isPlaying = true
    }
  }
  async mounted() {
    if (this.type == "sound") {
      this.sound = new Audio("http://127.0.0.1:3000/" + this.data.path)
      this.soundTime = Math.round(this.data.duration)
      this.sound.addEventListener("ended", () => {
        this.isPlaying = false
      })
    }
  }
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
.sound {
  border: 1px solid black;
  padding: 10px;
  .sound-audio {
    visibility: hidden;
  }
}
.chat-message {
  margin: 5px 0px;
  // border: 1px solid blue;
  padding: 5px;
  border-radius: 20px;
  box-shadow: 0 8px 10px 0 rgb(0 0 0 / 10%);
  width: 580px;
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
    }
  }
}
</style>
