<template>
  <div class="user-pic">
    <div class="upLoad">
      <el-upload
        class="upload-demo"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          请上传头像，只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
@Component({
  name: "UserPic"
})
export default class UserPic extends Vue {}
</script>

<style lang="scss" scoped>
.user-pic {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .up-load {
  }
}
</style>
