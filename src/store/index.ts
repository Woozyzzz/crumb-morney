import Vue from "vue";
import Vuex from "vuex";
import clone from "@/lib/clone.ts";
import createId from "@/lib/createId.ts";
import dayjs from "dayjs";

Vue.use(Vuex);

const DEFAULT_TAGS = [
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

function readArray(key: string, isValidItem: (item: any) => boolean): any[] {
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isValidItem);
  } catch (error) {
    console.warn("Invalid local data for " + key + "; using an empty list.", error);
    return [];
  }
}

function writeArray(key: string, value: any[]) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // Keep the in-memory state usable when storage is disabled or full.
    console.warn("Could not persist " + key + ".", error);
  }
}

function isRecord(value: any): boolean {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function isTag(value: any): boolean {
  return isRecord(value) && typeof value.id === "string" &&
    typeof value.name === "string" && value.name.trim().length > 0;
}

const store = new Vuex.Store({
  state: {
    recordList: [],
    tagList: [],
    currentTag: undefined,
  } as RootState,
  mutations: {
    // record
    fetchRecordList(state) {
      state.recordList = readArray("recordList", isRecord);
    },
    createRecord(state, record) {
      if (!isRecord(record)) return;
      const record2 = clone(record);
      record2.createdAt = dayjs().format();
      state.recordList.push(record2);
      writeArray("recordList", state.recordList);
    },
    saveRecordList(state) {
      writeArray("recordList", state.recordList);
    },
    // tag
    fetchTagList(state) {
      const savedTags = readArray("tagList", isTag);
      if (savedTags.length > 0) {
        state.tagList = savedTags;
        return;
      }

      state.tagList = DEFAULT_TAGS.map((name) => ({
        id: createId().toString(),
        name,
      }));
      writeArray("tagList", state.tagList);
    },
    createTag(state, rawName: string) {
      const name = typeof rawName === "string" ? rawName.trim() : "";
      if (!name) return;
      if (state.tagList.some((item) => item.name === name)) {
        window.alert("该标签已存在！");
        return;
      }
      state.tagList.push({ id: createId().toString(), name });
      writeArray("tagList", state.tagList);
    },
    saveTagList(state) {
      writeArray("tagList", state.tagList);
    },
    setCurrentTag(state, id: string) {
      state.currentTag = state.tagList.find((item) => item.id === id);
    },
    updateTag(state, payload: { id: string; name: string }) {
      if (!payload || typeof payload.id !== "string" || typeof payload.name !== "string") return;
      const name = payload.name.trim();
      if (!name) return;
      const tag = state.tagList.find((item) => item.id === payload.id);
      if (!tag) return;

      const duplicate = state.tagList.some(
        (item) => item.id !== payload.id && item.name === name
      );
      if (duplicate) {
        window.alert("标签名重复了");
        return;
      }
      tag.name = name;
      writeArray("tagList", state.tagList);
    },
    removeTag(state, id: string) {
      const index = state.tagList.findIndex((item) => item.id === id);
      if (index < 0) return;
      state.tagList.splice(index, 1);
      if (state.currentTag && state.currentTag.id === id) {
        state.currentTag = undefined;
      }
      writeArray("tagList", state.tagList);
    },
  },
  actions: {},
  modules: {},
});

export default store;
