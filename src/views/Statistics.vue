<template>
  <Layout>
    <Tabs class-prefix="types" :data-source="recordTypeList" :value.sync="type" />
    <ol>
      <li v-for="(group,index) in groupedList" :key="index">
        <h3 class="title">
          {{beautify(group.title)}}
          <span>￥{{group.total}}</span>
        </h3>
        <ol>
          <li class="record" v-for="item in group.items" :key="item.id">
            <span>{{tagString(item.tags)}}</span>
            <span class="notes">{{item.notes}}</span>
            <span>￥{{item.amount}}</span>
          </li>
        </ol>
      </li>
    </ol>
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
  components: { Tabs }
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
    if (recordList.length === 0) {
      return [];
    }
    const newList = clone(recordList)
      .filter((r: RecordItem) => r.type === this.type)
      .sort(
        (a: RecordItem, b: RecordItem) =>
          dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
      );
    type Result = { title: string; total?: number; items: RecordItem[] }[];
    const result: Result = [
      { title: dayjs(newList[0].createdAt).format(), items: [newList[0]] }
    ];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createdAt), "day")) {
        last.items.push(current);
      } else {
        result.push({
          title: dayjs(current.createdAt).format(),
          items: [current]
        });
      }
    }
    result.map(group => {
      group.total = group.items.reduce((sum, item) => sum + item.amount, 0);
    });

    return result;
  }
  // hooks
  beforeCreate() {
    this.$store.commit("fetchRecords");
  }
  // methods
  tagString(tags: Tag[]) {
    return tags.length === 0 ? "无" : tags.map(item => item.name).join(", ");
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
::v-deep {
  .types-tabs-item {
    background: #c4c4c4;
    &.selected {
      background: white;
      &::after {
        display: none;
      }
    }
  }
  .interval-tabs-item {
    height: 48px;
  }
}
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
}
.notes {
  margin-right: auto;
  margin-left: 16px;
  color: #999;
}
</style>