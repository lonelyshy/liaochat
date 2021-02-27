<template>
  <div class="user-name">
    <h1>
      请输入你的用户名
    </h1>
    <el-input
      class="user-input"
      placeholder="请输入你的用户名"
      v-model="userName"
      @keyup.native.enter="submitUserName"
    >
    </el-input>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
@Component({
  name: "UserName"
})
export default class UserName extends Vue {
  //后面再做名字校验
  userName = ""
  submitUserName() {
    console.log("test")
    this.$store.commit("userInfo/UPDATE_USER_NAME", this.userName) //由于 userInfo开启了子模块，所以要有这种命名方式
    console.log(this.$store.state.userInfo.userName)
    this.$router.push({ name: "Register" })
  }
}
</script>

<style lang="scss" scoped>
.user-name {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .user-input {
    width: 400px;
  }
}
</style>
