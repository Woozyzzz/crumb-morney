<template>
  <nav>
    <router-link to="/money" class="item" active-class="selected">
      <Icon name="money" />记账
    </router-link>
    <router-link to="/labels" class="item" active-class="selected">
      <Icon name="labels" />标签
    </router-link>
    <router-link to="/statistics" class="item" active-class="selected">
      <Icon name="statistics" />统计
    </router-link>
  </nav>
</template>

<script lang="ts">
export default { name: "Nav" };
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

nav {
  @extend %outerShadow;
  display: flex;
  justify-content: space-around;
  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .icon {
      width: 32px;
      height: 32px;
      padding: 2px;
    }
  }
  .selected {
    color: $color-highlight;
  }
}
</style>
