<template>
  <Layout>
    <div class="navBarWrapper">
      <div class="navBar">
        <Icon class="leftIcon" name="left" @click="goBack" />
        <span class="title">编辑标签</span>
        <span class="rightIcon"></span>
      </div>
    </div>
    <div class="formWrapper">
      <FormItem :dataNote="currentTag.name" @update:dataNote="update" data-placeholder="在这里输入标签名" />
    </div>
    <div class="buttonWrapper">
      <PressButton class="button" @click="remove">删除标签</PressButton>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import FormItem from "../components/Money/FormItem.vue";
import PressButton from "../components/PressButton.vue";

@Component({ components: { FormItem, PressButton } })
export default class EditLabel extends Vue {
  // computed
  get currentTag() {
    return this.$store.state.currentTag;
  }
  // hooks
  created() {
    this.$store.commit("fetchTagList");
    this.$store.commit("setCurrentTag", this.$route.params.id);
    if (!this.currentTag) {
      this.$router.replace("/404");
    }
  }
  // methods
  update(name: string) {
    if (this.currentTag) {
      if (name.trim()) {
        this.$store.commit("updateTag", { id: this.currentTag.id, name });
      }
    }
  }
  remove() {
    if (this.currentTag) {
      this.$store.commit("removeTag", this.currentTag.id);
      window.alert("已删除！");
      this.goBack();
    } else {
      window.alert("删除失败！");
    }
  }
  goBack() {
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.navBarWrapper {
  font-size: 16px;
  .navBar {
    margin: 0 4%;
    min-height: 40px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid $color-normal;
    .leftIcon {
      width: 24px;
      height: 24px;
    }
    .rightIcon {
      width: 24px;
      height: 24px;
    }
  }
}
.formWrapper {
  margin-top: 8px;
}
.buttonWrapper {
  text-align: center;
  padding: 16px;
  margin-top: 28px;
  .button {
    background: $color-out;
    color: #ffffff;
    border-radius: 4px;
    border: none;
    height: 40px;
    padding: 0 16px;
  }
}
</style>