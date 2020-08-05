<template>
  <button class="pressButton" @click="$emit('click',$event)">
    <slot />
  </button>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class PressButton extends Vue {}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.pressButton {
  background: $color-normal;
  color: #ffffff;
  border-radius: 4px;
  border: none;
  height: 40px;
  padding: 0 16px;
}
</style>