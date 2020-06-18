<template>
  <Layout class-prefix="layout">
    <!-- <div class="Wrapper"> -->
    <number-pad :value="record.amount" @update:value="onUpdateAmount" @submit="saveRecord" />
    <Tabs :data-source="recordTypeList" :value.sync="record.type" />
    <div class="notes">
      <FormItem field-name="备注" placeholder="在这里输入备注" @update:value="onUpdateFormItem" />
    </div>
    <Tags :value.sync="record.tags" @update:value="onUpdateTags" />
    <!-- </div> -->
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import NumberPad from "@/components/Money/NumberPad.vue";
import Tabs from "@/components/Tabs.vue";
import FormItem from "@/components/Money/FormItem.vue";
import Tags from "@/components/Money/Tags.vue";
import recordTypeList from "@/constants/recordTypeList.ts";

@Component({
  components: { NumberPad, FormItem, Tags, Tabs }
})
export default class Money extends Vue {
  // data
  recordTypeList = recordTypeList;
  record: RecordItem = { tags: [], notes: "", type: "-", amount: 0 };
  // watch
  get recordList() {
    return this.$store.state.recordList;
  }
  // hooks
  created() {
    this.$store.commit("fetchRecords");
  }
  // methods
  onUpdateFormItem(value: string) {
    this.record.notes = value;
  }
  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value);
  }
  onUpdateTags(value: Tag[]) {
    this.record.tags = value;
  }
  saveRecord() {
    this.$store.commit("createRecord", this.record);
  }
}
</script>

<style lang="scss" scoped>
::v-deep .layout-content {
  // .Wrapper {
  display: flex;
  // align-items: flex-end;
  flex-direction: column-reverse;
}
.notes {
  padding: 12px 0;
}
</style>
