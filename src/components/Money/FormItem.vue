<template>
  <label class="notes">
    <input
      type="text"
      :placeholder="dataPlaceholder"
      :value="dataNote"
      @change="changeNote($event.target.value)"
    />
    <!-- <input type="text" :placeholder="dataPlaceholder" v-model="dataNote" /> -->
  </label>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class FormItem extends Vue {
  // props
  @Prop({ default: "" }) readonly dataNote!: string;
  @Prop({ default: "" }) readonly dataPlaceholder!: string;
  // methods
  changeNote(note: string) {
    this.$emit("update:dataNote", note);
  }
}
</script>

<style lang="scss" scoped>
.notes {
  display: flex;
  input {
    font-size: 16px;
    color: darkslateblue;
    height: 28px;
    width: 100%;
    background: transparent;
    border: none;
    margin: 1% 6%;
    &::-webkit-input-placeholder {
      color: darkslateblue;
    }
  }
}
</style>