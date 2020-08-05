<template>
  <div class="tags">
    <ul class="current">
      <li
        v-for="tag in tagList"
        :key="tag.id"
        :class="{selectedOut:selectedTags.indexOf(tag.name)>=0 && dataType==='-',
        selectedIn:selectedTags.indexOf(tag.name)>=0 && dataType==='+'}"
        @click="toggle(tag.name)"
      >{{tag.name}}</li>
    </ul>
    <div class="new">
      <button @click="createTag">添加标签</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Mixins } from "vue-property-decorator";
import TagHelper from "../../mixins/TagHelper";

@Component
export default class Tags extends Mixins(TagHelper) {
  // props
  @Prop(Array) readonly dataSelectedTags: string[] | undefined;
  @Prop(String) readonly dataType: string | undefined;
  // data
  selectedTags: string[] = this.dataSelectedTags || [];
  // computed
  get tagList() {
    return this.$store.state.tagList;
  }
  // hooks
  created() {
    this.$store.commit("fetchTagList");
  }
  // methods
  toggle(tagName: string) {
    const index = this.selectedTags.indexOf(tagName);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tagName);
    }
    this.$emit("update:selectedTags", this.selectedTags);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.tags {
  flex-grow: 1;
  height: 0;
  font-size: 14px;
  $h: 24px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  .current {
    width: 280px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    li {
      background: lighten($color: $color-normal, $amount: 25);
      color: $color-normal;
      height: $h;
      line-height: $h;
      border-radius: $h/2;
      padding: 0 8px;
      margin: 0 5px;
      margin-bottom: 6px;
      &.selectedOut {
        color: #fff;
        background: $color-out;
      }
      &.selectedIn {
        color: #fff;
        background: $color-in;
      }
    }
  }
  .new {
    margin: 1% auto;
    button {
      background: lighten($color: $color-normal, $amount: 25);
      color: $color-normal;
      border: none;
      $h: 24px;
      height: $h;
      line-height: $h;
      border-radius: $h/2;
      padding: 0 8px;
    }
  }
}
</style>