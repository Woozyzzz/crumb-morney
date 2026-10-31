import store from "@/store";

describe("store persistence and tag mutations", () => {
  beforeEach(() => {
    window.localStorage.clear();
    store.state.recordList = [];
    store.state.tagList = [];
    store.state.currentTag = undefined;
  });

  it("recovers from malformed record JSON", () => {
    window.localStorage.setItem("recordList", "{broken");
    store.commit("fetchRecordList");
    expect(store.state.recordList).toEqual([]);
  });

  it("ignores malformed tag data and initializes defaults", () => {
    window.localStorage.setItem("tagList", JSON.stringify([{ id: 1, name: null }]));
    store.commit("fetchTagList");
    expect(store.state.tagList.length).toBeGreaterThan(0);
    expect(store.state.tagList[0]).toEqual(
      expect.objectContaining({ name: expect.any(String), id: expect.any(String) })
    );
  });

  it("allows saving a tag with its existing name", () => {
    store.state.tagList = [{ id: "1", name: "餐饮" }];
    store.commit("updateTag", { id: "1", name: "餐饮" });
    expect(store.state.tagList[0].name).toBe("餐饮");
  });

  it("rejects a duplicate name belonging to another tag", () => {
    store.state.tagList = [
      { id: "1", name: "餐饮" },
      { id: "2", name: "交通" },
    ];
    const alert = jest.spyOn(window, "alert").mockImplementation(() => undefined);
    store.commit("updateTag", { id: "2", name: "餐饮" });
    expect(store.state.tagList[1].name).toBe("交通");
    alert.mockRestore();
  });

  it("does not throw when asked to update a missing tag", () => {
    store.state.tagList = [];
    expect(() => store.commit("updateTag", { id: "missing", name: "新标签" })).not.toThrow();
  });
});
