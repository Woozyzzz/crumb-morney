<template>
  <div class="layoutWrapper">
    <header>点滴记账</header>
    <div class="content" :class="classPrefix && `${classPrefix}Content`">
      <slot />
    </div>
    <Navigation />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class Layout extends Vue {
  @Prop(String) readonly classPrefix: string | undefined;

  created() {
    const layoutWrapper: Element | null = document.querySelector(
      ".layoutWrapper"
    );
    if (layoutWrapper) {
      layoutWrapper.setAttribute(
        "style",
        `--vh:${window.innerHeight * 0.01}px`
      );
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.layoutWrapper {
  --vh: 1vh;
  height: 100vh;
  height: calc(var(--vh) * 100);
  display: flex;
  flex-direction: column;
  header {
    background: $color-out;
    color: #fff;
    text-align: center;
    font-size: 16px;
  }
  .content {
    overflow: auto;
    flex-grow: 1;
  }
}
</style>