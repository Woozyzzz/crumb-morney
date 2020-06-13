import clone from "@/lib/clone.ts";

const localStorageKeyName = "records";
const recordsModel = {
  data: [] as RecordItem[],
  fetch() {
    this.data = window.JSON.parse(
      window.localStorage.getItem(localStorageKeyName) || "[]"
    );
    return this.data;
  },
  create(record: RecordItem) {
    const record2: RecordItem = clone(record);
    record2.createAt = new Date();
    this.data.push(record2);
  },
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  },
};
export { recordsModel };
