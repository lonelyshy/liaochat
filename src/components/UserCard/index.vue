<template>
  <div class="user-card">
    <div class="user-icon"></div>
    <div class="user-name">{{ userName }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
@Component({
  name: "UserCard"
})
export default class UserCard extends Vue {
  @Prop({ type: String, default: "用户名" }) userName!: string
}
</script>

<style lang="scss" scoped>
.user-card {
  display: flex;
  justify-content: flex-start;
  .user-icon {
    width: 20px;
    height: 20px;
    border-radius: 6px;
    border: 1px red solid;
  }
}
</style>
