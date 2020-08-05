<template>
  <Layout classPrefix="layout">
    <!-- {{record}} -->
    <Tabs
      classPrefix="types"
      :dataSource="typeList"
      :dataAmount="record.amount"
      :dataType.sync="record.type"
    />
    <Tags :dataSelectedTags="record.selectedTags" :dataType="record.type" />
    <FormItem :dataNote.sync="record.note" data-placeholder="请输入备注内容" />
    <NumberPad
      :dataType="record.type"
      :dataAmount="record.amount"
      @update:dataAmount="onUpdateAmount"
      @submit="saveRecord"
    />
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import Tags from "../components/Money/Tags.vue";
import FormItem from "../components/Money/FormItem.vue";
import NumberPad from "../components/Money/NumberPad.vue";
import recordTypeList from "@/constants/recordTypeList.ts";

@Component({ components: { Tabs, Tags, FormItem, NumberPad } })
export default class Money extends Vue {
  // data
  typeList = recordTypeList;
  record: RecordItem = {
    amount: "0",
    type: "-",
    selectedTags: [],
    note: "",
  };
  tagList: string[] = [
    "服饰",
    "餐饮",
    "住房",
    "交通",
    "购物",

    "美容",
    "学习",
    "娱乐",
    "运动",
    "旅游",

    "医疗",
    "人情",
    "红包",
    "转账",
    "其他",
  ];
  // hooks
  created() {
    this.$store.commit("fetchRecordList");
  }
  // methods
  onUpdateAmount(value: string) {
    this.record.amount = value;
  }
  saveRecord() {
    window.alert("已记录一笔！");
    this.$store.commit("createRecord", this.record);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

::v-deep .layoutContent {
  display: flex;
  flex-direction: column;
}
</style>