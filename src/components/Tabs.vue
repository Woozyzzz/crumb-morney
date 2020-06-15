<template>
  <ul class="tabs">
    <li
      v-for="item in dataSource"
      :key="item.value"
      @click="select(item)"
      :class="liClass(item)"
      class="tabs-item"
    >{{item.text}}</li>
  </ul>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

type DateSourceItem = {
  text: string;
  value: string;
};

@Component
export default class Tabs extends Vue {
  @Prop({ required: true, type: Array }) readonly dataSource!: DateSourceItem[];
  @Prop(String) readonly value!: string;
  @Prop(String) classPrefix?: string;

  liClass(item: DateSourceItem) {
    return {
      selected: item.value === this.value,
      [this.classPrefix + "-tabs-item"]: this.classPrefix
    };
  }

  select(item: DateSourceItem) {
    this.$emit("update:value", item.value);
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  background: #c4c4c4;
  display: flex;
  text-align: center;
  font-size: 24px;
  &-item {
    width: 50%;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &.selected::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 4px;
      background: #333;
    }
  }
}
</style>