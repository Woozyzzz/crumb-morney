<template>
  <Layout>
    <div>
      <Icon name="left" />
      <span>编辑标签</span>
      <FormItem field-name="标签名" placeholder="在这里输入标签名" />
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { tagsModel } from "../models/tagsModel";
import FormItem from "../components/Money/FormItem.vue";

@Component({ components: { FormItem } })
export default class EditLabel extends Vue {
  created() {
    const id = this.$route.params.id;
    tagsModel.fetch();
    const tags = tagsModel.data;
    const tag = tags.filter(item => item.id === id);
    if (tag) {
      console.log(tag);
    } else {
      this.$router.replace("/404");
    }
  }
}
</script>

<style lang="scss" scoped>
</style>