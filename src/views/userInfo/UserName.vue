<template>
  <div class="user-name">
    <h1>
      请输入你的用户名
    </h1>
    <el-input
      class="user-input"
      v-loading="loading"
      placeholder="请输入你的用户名,回车结束,单击选择头像"
      v-model="userName"
      suffix-icon="el-icon-edit"
      @keyup.native.enter="submitUserName"
    >
      <template slot="prepend"
        ><div class="img">
          <el-image :src="userIcon"></el-image></div
      ></template>
    </el-input>
    <div class="img-list">
      <div
        class="img"
        v-for="(item, index) in iconList"
        :key="index"
        @click="imgClick(item)"
      >
        <el-image :src="item"></el-image>
      </div>
    </div>
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
  iconList: any = []
  userIcon: any = ""
  imgClick(item: any) {
    this.userIcon = item
  }
  async submitUserName() {
    this.loading = true //开启加载动画
    await utils.sleep(1000) //延迟一秒
    const params = {
      name: this.userName
    }
    if (this.userName == "") {
      this.$message({
        message: "用户名不能为空,请输入用户名",
        type: "error"
      })
      this.loading = false //加载动画结束
      return false
    }
    const res = await API.queryUserName(params) //查询用户名是否重复

    this.loading = false //加载动画结束
    if (res.data.code) {
      this.$message({
        message: "用户名重复,清重新输入用户名",
        type: "error"
      })
      return false //用户名重复返回false
    }
    this.$store.commit("userInfo/UPDATE_USER_NAME", this.userName) //由于 userInfo开启了子模块，所以要有这种命名方式
    console.log(
      "this.$store.state.userInfo.userName",
      this.$store.state.userInfo.userName
    )
    this.$router.push({ name: "Register" })
  }
  async created() {
    window.document.title = "输入用户名"
    const { data } = await API.getIconList()
    this.iconList = data.data
    this.userIcon = this.iconList[
      Math.floor(Math.random() * this.iconList.length)
    ]
  }
  beforeDestroy() {
    this.$store.commit("userInfo/UPDATE_USERICON", this.userIcon) //提交用户头像
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
.img-list {
  margin-top: 30px;
  width: 400px;
  display: flex;
  flex-wrap: wrap;
}
.img {
  width: 35px;
  height: 35px;
  border-radius: 10px;
  &:hover {
    cursor: pointer;
  }
}
</style>
