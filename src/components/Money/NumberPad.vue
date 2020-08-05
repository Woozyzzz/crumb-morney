<template>
  <div class="numberPad">
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="backSpace">
        <Icon name="delete" />
      </button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="clear">AC</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button
        class="ok"
        :class="{selectedOut:dataType==='-',selectedIn:dataType==='+'}"
        @click="ok"
      >确定</button>
      <button class="zero" @click="inputContent">0</button>
      <button @click="inputContent">.</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch, Prop } from "vue-property-decorator";

@Component
export default class NumberPad extends Vue {
  // props
  @Prop(String) readonly dataType: string | undefined;
  @Prop(String) readonly dataAmount!: string;
  // data
  amount = this.dataAmount.toString();
  // watch
  // @Watch("dataAmount")
  // onDataAmountChange(val: string, oldVal: string) {
  //   console.log(val);
  // }
  // methods
  inputContent(event: MouseEvent) {
    const button = event.target as HTMLButtonElement;
    const input = button.textContent as string;
    if (this.amount.length === 8) {
      return;
    }
    if (this.amount === "0") {
      if ("0123456789".indexOf(input) >= 0) {
        this.amount = input;
      } else {
        this.amount += input;
      }
    } else if (this.amount.indexOf(".") >= 0 && input === ".") {
      return;
    } else {
      this.amount += input;
    }
    this.$emit("update:dataAmount", this.amount);
  }
  clear() {
    this.amount = "0";
    this.$emit("update:dataAmount", this.amount);
  }
  backSpace() {
    if (this.amount.length === 1) {
      this.amount = "0";
    } else {
      this.amount = this.amount.slice(0, -1);
    }
    this.$emit("update:dataAmount", this.amount);
  }
  ok() {
    this.$emit("submit", this.amount);
    this.amount = "0";
    this.$emit("update:dataAmount", this.amount);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.numberPad {
  .buttons {
    @extend %clearFix;
    background: lighten($color: $color-normal, $amount: 30);
    button {
      font-size: 20px;
      margin-top: 8px;
      margin-left: 2%;
      width: 22.5%;
      height: 48px;
      float: left;
      background: #fff;
      border: none;
      border-radius: 4px;
      &.ok {
        height: 48px * 2 + 8px;
        float: right;
        margin-right: 2%;
        color: #fff;
        &.selectedOut {
          background: $color-out;
        }
        &.selectedIn {
          background: $color-in;
        }
      }
      &.zero {
        width: 23.5 * 2%;
        margin-bottom: 2%;
      }
    }
  }
}
</style>