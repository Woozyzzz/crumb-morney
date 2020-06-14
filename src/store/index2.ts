import { recordsModel } from "@/models/recordsModel";
import { tagsModel } from "@/models/tagsModel";

const store = {
  // record store
  records: recordsModel.fetch(),
  createRecord(record: RecordItem) {
    recordsModel.create(record);
  },
  // tag store
  tags: tagsModel.fetch(),
  findTag(id: string) {
    return this.tags.filter((item) => item.id === id)[0];
  },
  createTag(name: string) {
    const message = tagsModel.create(name);
    if (message === "duplicated") {
      window.alert("标签名重复");
    } else if (message === "success") {
      window.alert("添加成功");
    }
  },
  removeTag(id: string) {
    return tagsModel.remove(id);
  },
  updateTag(id: string, name: string) {
    return tagsModel.update(id, name);
  },
};

export default store;
