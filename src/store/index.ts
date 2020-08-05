import Vue from "vue";
import Vuex from "vuex";
import clone from "@/lib/clone.ts";
import createId from "@/lib/createId.ts";
import dayjs from "dayjs";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    recordList: [],
    tagList: [],
    currentTag: undefined,
  } as RootState,
  mutations: {
    // record
    fetchRecordList(state) {
      state.recordList = JSON.parse(
        window.localStorage.getItem("recordList") || "[]"
      );
    },
    createRecord(state, record) {
      const record2 = clone(record);
      record2.createdAt = dayjs().format();
      state.recordList.push(record2);
      store.commit("saveRecordList");
    },
    saveRecordList(state) {
      window.localStorage.setItem(
        "recordList",
        JSON.stringify(state.recordList)
      );
    },
    // tag
    fetchTagList(state) {
      state.tagList = JSON.parse(
        window.localStorage.getItem("tagList") || "[]"
      );
      if (!state.tagList || state.tagList.length === 0) {
        const tagList: string[] = [
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
        tagList.forEach((item) => {
          store.commit("createTag", item);
        });
      }
    },
    createTag(state, name: string) {
      const names = state.tagList.map((item) => item.name);
      if (names.indexOf(name) >= 0) {
        window.alert("该标签已存在！");
      } else {
        const id = createId().toString();
        state.tagList.push({ id, name });
        store.commit("saveTagList");
        // window.alert("添加成功");
      }
    },
    saveTagList(state) {
      window.localStorage.setItem("tagList", JSON.stringify(state.tagList));
    },
    setCurrentTag(state, id: string) {
      state.currentTag = state.tagList.filter((item) => item.id === id)[0];
    },
    updateTag(state, payload: { id: string; name: string }) {
      const { id, name } = payload;
      const names = state.tagList.map((item) => item.name);
      if (names.indexOf(name) >= 0) {
        window.alert("标签名重复了");
      } else {
        const tag = state.tagList.filter((item) => item.id === id)[0];
        tag.name = name;
        store.commit("saveTagList");
      }
    },
    removeTag(state, id: string) {
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          state.tagList.splice(i, 1);
          store.commit("saveTagList");
          break;
        }
      }
    },
  },
  actions: {},
  modules: {},
});

export default store;
