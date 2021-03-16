<template>
  <div class="user-name">
    <h1>
      请输入你的用户名
    </h1>
    <el-input
      class="user-input"
      v-loading="loading"
      placeholder="请输入你的用户名,回车结束"
      v-model="userName"
      suffix-icon="el-icon-edit"
      @keyup.native.enter="submitUserName"
    >
    </el-input>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import utils from "@/utils/utils"
import API from "@/api/index"
@Component({
  name: "UserName"
})
export default class UserName extends Vue {
  //后面再做名字校验
  userName = ""
  suffixIcon = ""
  loading = false
  async submitUserName() {
    this.loading = true //开启加载动画
    await utils.sleep(1000) //延迟一秒
    const params = {
      name: this.userName
    }
    const res = await API.queryRoom(params)

    this.loading = false //加载动画结束
    if (!res.data.code) {
      this.$message({
        message: "用户名重复",
        type: "error"
      })
      return false
    }
    this.$store.commit("userInfo/UPDATE_USER_NAME", this.userName) //由于 userInfo开启了子模块，所以要有这种命名方式
    console.log(
      "this.$store.state.userInfo.userName",
      this.$store.state.userInfo.userName
    )
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
