<template>
  <Layout>
    <div class="tags">
      <router-link :to="`/labels/edit/${tag.id}`" class="tag" v-for="tag in tagList" :key="tag.id">
        <span>{{tag.name}}</span>
        <Icon name="right"></Icon>
      </router-link>
    </div>
    <div class="createTagWrapper">
      <PressButton class="createTag" @click="createTag">添加标签</PressButton>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Mixins } from "vue-property-decorator";
import PressButton from "../components/PressButton.vue";
import TagHelper from "../mixins/TagHelper";

@Component({ components: { PressButton } })
export default class Labels extends Mixins(TagHelper) {
  // computed
  get tagList() {
    return this.$store.state.tagList;
  }
  // hooks
  beforeCreate() {
    this.$store.commit("fetchTagList");
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.tags {
  font-size: 16px;
  max-height: 80%;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  .tag {
    margin: 0 4%;
    padding-left: 4%;
    min-height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid lighten($color: $color-normal, $amount: 25);
    svg {
      width: 24px;
      height: 24px;
    }
  }
}
.createTagWrapper {
  text-align: center;
  padding: 16px;
  margin-top: 28px;
  .createTag {
    background: $color-in;
    color: #ffffff;
    border-radius: 4px;
    border: none;
    height: 40px;
    padding: 0 16px;
  }
}
</style>