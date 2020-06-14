<template>
  <div class="tags">
    <div class="currentWrapper">
      <ul class="current">
        <li
          v-for="tag in tagList"
          :key="tag.id"
          @click="toggle(tag)"
          :class="{selected:selectedTags.indexOf(tag)>=0}"
        >{{tag.name}}</li>
      </ul>
    </div>
    <div class="new">
      <button @click="create">新增标签</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({
  computed: {
    tagList() {
      return [];
    }
  }
})
export default class Tags extends Vue {
  // tagList = store.fetchTags();
  selectedTags: string[] = [];
  toggle(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
    this.$emit("update:value", this.selectedTags);
  }
  create() {
    const name = window.prompt("请输入新的标签:");
    if (name === "") {
      window.alert("标签名不能为空!");
    }
    // else if (this.tagList) {
    //   // store.createTag(name!);
    // }
  }
}
</script>

<style lang="scss" scoped>
.tags {
  background: white;
  height: 0;
  font-size: 14px;
  padding: 16px;
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
  flex-direction: column;
  > .currentWrapper {
    overflow: hidden auto;
    > .current {
      display: flex;
      flex-wrap: wrap;
      margin: 0 -6px;
      > li {
        $bg: #d9d9d9;
        background: $bg;
        $h: 24px;
        height: $h;
        line-height: $h;
        border-radius: $h/2;
        padding: 0 16px;
        margin: 4px 6px;
        &.selected {
          background: darken($color: $bg, $amount: 50%);
          color: white;
        }
      }
    }
  }
  > .new {
    padding: 8px;
    button {
      background: transparent;
      border: none;
      color: #999;
      border-bottom: 1px solid;
      padding: 0 4px;
    }
  }
}
</style>