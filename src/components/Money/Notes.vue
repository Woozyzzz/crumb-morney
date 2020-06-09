<template>
  <label class="notes">
    <span class="name">备注</span>
    <!-- <input type="text" placeholder="在这里输入备注" :value="value" @input="value=$event.target.value" /> -->
    <input type="text" placeholder="在这里输入备注" v-model="value" />
  </label>
</template>

<script lang="ts">
  import Vue from "vue";
  import { Component } from "vue-property-decorator";

  @Component
  export default class Notes extends Vue {
    value = "";
  }
</script>

<style lang="scss" scoped>
  .notes {
    font-size: 14px;
    background: #f5f5f5;
    padding-left: 16px;
    display: flex;
    align-items: center;
    .name {
      padding-right: 16px;
    }
    input {
      height: 64px;
      flex-grow: 1;
      background: transparent;
      border: none;
      padding-right: 16px;
    }
  }
</style>