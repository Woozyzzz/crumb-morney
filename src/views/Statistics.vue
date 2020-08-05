<template>
  <Layout>
    <Tabs classPrefix="types" :dataSource="recordTypeList" :dataType.sync="type" />
    <ol v-if="groupedList.length>0">
      <li v-for="(group,index) in groupedList" :key="index">
        <h3 class="title">
          {{beautify(group.title)}}
          <span>￥{{group.total}}</span>
        </h3>
        <ol>
          <li
            class="record"
            :class="{selectedOut:type==='-',selectedIn:type==='+'}"
            v-for="item in group.items"
            :key="item.id"
          >
            <span>{{tagString(item.selectedTags)}}</span>
            <span class="notes">{{item.note}}</span>
            <span>￥{{item.amount}}</span>
          </li>
        </ol>
      </li>
    </ol>
    <div v-else class="noResult">—— 暂无更多收支 ——</div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import recordTypeList from "@/constants/recordTypeList.ts";
import dayjs from "dayjs";
import clone from "@/lib/clone.ts";

@Component({
  components: { Tabs },
})
export default class Statistics extends Vue {
  // data
  type = "-";
  recordTypeList = recordTypeList;
  // computed
  get recordList() {
    return this.$store.state.recordList;
  }
  get groupedList() {
    const { recordList } = this;
    const newList = clone(recordList).filter(
      (r: RecordItem) => r.type === this.type
    );
    if (newList.length === 0) {
      return [];
    }
    newList.sort(
      (a: RecordItem, b: RecordItem) =>
        dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
    );
    const result: Result = [
      { title: dayjs(newList[0].createdAt).format(), items: [newList[0]] },
    ];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createdAt), "day")) {
        last.items.push(current);
      } else {
        result.push({
          title: dayjs(current.createdAt).format(),
          items: [current],
        });
      }
    }
    result.map((group) => {
      group.total = group.items.reduce(
        (sum, item) => sum + parseFloat(item.amount),
        0
      );
    });
    return result;
  }

  get result() {
    const { recordList } = this;
    const hashTable: { [key: string]: HashTableValue } = {};
    for (let i = 0; i < recordList.length; i++) {
      const [date, time] = recordList[i].createdAt.split("T");
      hashTable[date] = hashTable[date] || { title: date, items: [] };
      hashTable[date].items.push(recordList[i]);
    }
    return hashTable;
  }

  beforeCreate() {
    this.$store.commit("fetchRecordList");
  }
  // methods
  tagString(tagList: Tag[]) {
    return tagList.length === 0
      ? "无"
      : tagList.map((item) => item.name).join(", ");
  }
  beautify(string: string) {
    const now = dayjs();
    const day = dayjs(string);
    if (day.isSame(now, "day")) {
      return "今天";
    } else if (day.isSame(now.subtract(1, "day"), "day")) {
      return "昨天";
    } else if (day.isSame(now.subtract(2, "day"), "day")) {
      return "前天";
    } else if (day.isSame(now, "year")) {
      return day.format("M月D日");
    } else {
      return day.format("YYYY年M月D日");
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

%item {
  padding: 0 16px;
  min-height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title {
  @extend %item;
}
.record {
  background: white;
  @extend %item;
  &.selectedOut {
    // border: 1px solid $color-out;
    color: $color-out;
    background: lighten($color: $color-out, $amount: 45);
  }
  &.selectedIn {
    // border: 1px solid $color-in;
    color: $color-in;
    background: lighten($color: $color-in, $amount: 35);
  }
}
.notes {
  margin-right: auto;
  margin-left: 16px;
  color: #999;
}
.noResult {
  padding: 16px;
  text-align: center;
}
</style>
