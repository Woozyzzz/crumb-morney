const localStorageKeyName = "records";
const recordsModel = {
  fetch() {
    return window.JSON.parse(
      window.localStorage.getItem(localStorageKeyName) || "[]"
    ) as RecordItem[];
  },
  save(data: RecordItem[]) {
    return window.localStorage.setItem(
      localStorageKeyName,
      JSON.stringify(data)
    );
  },
  clone(data: RecordItem) {
    return JSON.parse(JSON.stringify(data));
  },
};
export { recordsModel };
