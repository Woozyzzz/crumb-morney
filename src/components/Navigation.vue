<template>
  <nav>
    <router-link to="/statistics" class="item" active-class="selected">
      <Icon name="statistics" />
      <p>统计</p>
    </router-link>
    <router-link to="/money" class="item" active-class="selected">
      <Icon name="money" />
      <p>记账</p>
    </router-link>
    <router-link to="/labels" class="item" active-class="selected">
      <Icon name="labels" />
      <p>标签</p>
    </router-link>
  </nav>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component
export default class Navigation extends Vue {}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

nav {
  display: flex;
  justify-content: space-around;
  @extend %outerShadow;
  .item {
    display: flex;
    align-items: center;
    flex-direction: column;
    .icon {
      width: 32px;
      height: 32px;
    }
    &.selected {
      color: $color-out;
    }
  }
}
</style>