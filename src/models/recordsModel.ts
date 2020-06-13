const localStorageKeyName = "records";
const recordsModel = {
  data: [] as RecordItem[],
  fetch() {
    this.data = window.JSON.parse(
      window.localStorage.getItem(localStorageKeyName) || "[]"
    );
    return this.data;
  },
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  },
  clone(data: RecordItem) {
    return JSON.parse(JSON.stringify(data));
  },
};
export { recordsModel };
