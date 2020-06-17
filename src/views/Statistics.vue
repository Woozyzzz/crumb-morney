<template>
  <Layout>
    <Tabs class-prefix="types" :data-source="recordTypeList" :value.sync="type" />
    <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval" />
    <ol>
      <li v-for="group in result" :key="group.title">
        <h3 class="title">{{beautify(group.title)}}</h3>
        <ol>
          <li class="record" v-for="item in group.items" :key="item.id">
            <span>{{tagString(item.tags)}}</span>
            <span class="note">{{item.notes}}</span>
            <span>{{type}}￥{{item.amount}}</span>
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
import intervalList from "@/constants/intervalList.ts";
import recordTypeList from "@/constants/recordTypeList.ts";
import dayjs from "dayjs";

@Component({
  components: { Tabs }
})
export default class Statistics extends Vue {
  // data
  type = "-";
  interval = "day";
  intervalList = intervalList;
  recordTypeList = recordTypeList;
  // computed
  get recordList() {
    return this.$store.state.recordList;
  }
  get result() {
    type HashTableValue = { title: string; items: RecordItem[] };
    const { recordList } = this;
    const hashTable: { [key: string]: HashTableValue } = {};
    for (let i = 0; i < recordList.length; i++) {
      const [date, time] = recordList[i].createAt.split("T");
      hashTable[date] = hashTable[date] || { title: date, items: [] };
      hashTable[date].items.push(recordList[i]);
    }
    return hashTable;
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
    console.log(day);

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
    background: white;
    &.selected {
      background: #c4c4c4;
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
.note {
  margin-right: auto;
  margin-left: 16px;
  color: #999;
}
</style>