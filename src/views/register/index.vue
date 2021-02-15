<template>
  <div class="register">
    <div class="created">
      <el-button
        class="created-chat"
        type="primary"
        round
        plain
        @click.native="chatVisibleChange"
      >
        创建聊天室
      </el-button>
      <div v-show="chatVisible">
        <!-- <el-form>
          <el-form-item label="会议名称">
            <el-input v-model="chatName"></el-input>
          </el-form-item>
        </el-form> -->
        haahah
      </div>

      <el-button class="join-chat" type="primary" round plain>
        加入聊天室
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator"
export default class Register extends Vue {
  chatVisible = true

  chatName = ""

  chatVisibleChange() {
    console.log("为什么不起作用")
    this.chatVisible = !this.chatVisible
    console.log(this.chatVisible)
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
    .el-button + .el-button {
      margin-left: 0px;
    }
    .created-chat {
      width: 300px;
    }
    .join-chat {
      margin-top: 30px;
      width: 300px;
    }
  }
}
</style>
