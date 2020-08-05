<template>
  <div class="types">
    <ul>
      <!-- <li
        :class="{selectedOut:dataType === '-',[classPrefix + '-item']:classPrefix}"
        @click="selectType('-')"
      >支出</li>
      <li
        :class="{selectedIn:dataType === '+',[classPrefix + '-item']:classPrefix}"
        @click="selectType('+')"
      >收入</li>-->
      <li
        v-for="item in dataSource"
        :key="item.value"
        :class="liClass(item)"
        @click="select(item)"
      >{{item.text}}</li>
    </ul>
    <div class="amount" v-if="dataAmount!==undefined">
      <span>￥{{dataAmount}}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class Types extends Vue {
  // props
  @Prop(String) readonly dataAmount: string | undefined;
  @Prop(String) readonly dataType: string | undefined;
  @Prop({ required: true, type: Array }) readonly dataSource!: DateSourceItem[];
  @Prop(String) readonly classPrefix?: string;
  // methods
  liClass(item: DateSourceItem) {
    if (this.dataType === "-") {
      return {
        selectedOut: this.dataType === item.value,
        [this.classPrefix + "-tabs-item"]: this.classPrefix,
      };
    } else if (this.dataType === "+") {
      return {
        selectedIn: this.dataType === item.value,
        [this.classPrefix + "-tabs-item"]: this.classPrefix,
      };
    }
  }
  select(item: DateSourceItem) {
    this.$emit("update:dataType", item.value);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.types {
  ul {
    font-size: 20px;
    display: flex;
    justify-content: space-between;
    margin: 2% 6% 0 6%;
    li {
      width: 40%;
      $h: 36px;
      height: $h;
      line-height: $h;
      border-radius: $h/2;
      color: $color-normal;
      background: lighten($color: $color-normal, $amount: 25);
      display: flex;
      justify-content: center;
      align-items: center;
      &.selectedOut {
        border: 1px solid $color-out;
        color: $color-out;
        background: lighten($color: $color-out, $amount: 45);
      }
      &.selectedIn {
        border: 1px solid $color-in;
        color: $color-in;
        background: lighten($color: $color-in, $amount: 35);
      }
    }
  }
  .amount {
    font-weight: bold;
    margin: 0 6% 2% 6%;
    border-bottom: 1px solid lighten($color: $color-normal, $amount: 25);
    span {
      display: block;
      font-size: 40px;
    }
  }
}
</style>