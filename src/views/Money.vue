<template>
  <Layout class-prefix="layout">
    <number-pad @update:value="onUpdateAmount" @submit="saveRecord" />
    <!-- <Types :value="record.type" @update:value="onUpdateTypes" /> -->
    <Types :value.sync="record.type" />
    <Notes @update:value="onUpdateNotes" />
    <Tags :data-source.sync="tags" @update:value="onUpdateTags" />
    {{ records }}
  </Layout>
</template>

<script lang="ts">
  import Vue from "vue";
  import NumberPad from "@/components/Money/NumberPad.vue";
  import Types from "@/components/Money/Types.vue";
  import Notes from "@/components/Money/Notes.vue";
  import Tags from "@/components/Money/Tags.vue";
  import { Component, Watch } from "vue-property-decorator";
  import { recordsModel } from "@/models/recordsModel.ts";
  import { tagsModel } from "@/models/tagsModel.ts";

  @Component({
    components: { NumberPad, Types, Notes, Tags }
  })
  export default class Money extends Vue {
    tags = tagsModel.fetch();
    record: RecordItem = { tags: [], notes: "", type: "-", amount: 0 };
    records = recordsModel.fetch();

    onUpdateTags(value: string[]) {
      this.record.tags = value;
    }
    onUpdateNotes(value: string) {
      this.record.notes = value;
    }
    onUpdateAmount(value: string) {
      this.record.amount = parseFloat(value);
    }
    saveRecord() {
      this.record.createAt = new Date();
      this.records.push(recordsModel.clone(this.record));
    }
    @Watch("records")
    onRecordsChanged() {
      recordsModel.save(this.records);
    }
  }
</script>

<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }
</style>
