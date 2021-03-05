<template>
  <div class="user-card">
    <div class="user-icon">
      <el-image :src="userIcon"> </el-image>
    </div>
    <div class="user-name">
      {{ userName }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
@Component({
  name: "UserCard"
})
export default class UserCard extends Vue {
  @Prop({ type: String, default: "用户名" }) userName!: string
  @Prop({ type: String, default: "" }) userIcon!: string
}
</script>

<style lang="scss" scoped>
.user-card {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .user-icon {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  .user-name {
    margin-left: 8px;
  }
}
</style>
