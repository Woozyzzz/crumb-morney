<template>
  <label class="formItem">
    <span class="name">{{fieldName}}</span>
    <!-- <input type="text" :placeholder="placeholder" :value="value" @input="value=$event.target.value" /> -->
    <input
      type="text"
      :placeholder="placeholder"
      :value="value"
      @input="onValueChanged($event.target.value)"
    />
  </label>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch, Prop } from "vue-property-decorator";

@Component
export default class FormItem extends Vue {
  @Prop({ default: "" }) readonly value!: string;
  @Prop(String) readonly fieldName!: string;
  @Prop(String) readonly placeholder: string | undefined;
  onValueChanged(value: string, oldValue: string) {
    this.$emit("update:value", value);
  }
}
</script>

<style lang="scss" scoped>
.formItem {
  font-size: 14px;
  padding-left: 16px;
  display: flex;
  align-items: center;
  .name {
    padding-right: 16px;
  }
  input {
    height: 40px;
    flex-grow: 1;
    background: transparent;
    border: none;
    padding-right: 16px;
  }
}
</style>