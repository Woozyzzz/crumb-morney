const localStorageKeyName = "tags";
type Tag = {
  id: string;
  name: string;
};
type TagsModel = {
  data: Tag[];
  fetch: () => Tag[];
  create: (name: string) => "success" | "duplicated"; // 联合类型
  update: (id: string, name: string) => "success" | "not found" | "duplicated";
  remove: (id: string) => boolean;
  save: () => void;
};
const tagsModel: TagsModel = {
  data: [],
  fetch() {
    this.data = window.JSON.parse(
      window.localStorage.getItem(localStorageKeyName) || "[]"
    );
    return this.data;
  },
  create(name: string) {
    const names = this.data.map((item) => item.name);
    if (names.indexOf(name) >= 0) {
      return "duplicated";
    } else {
      this.data.push({ id: name, name });
      this.save();
      return "success";
    }
  },
  update(id, name) {
    const idList = this.data.map((item) => item.id);
    const names = this.data.map((item) => item.name);
    if (idList.indexOf(id) >= 0) {
      if (names.indexOf(name) >= 0) {
        return "duplicated";
      } else {
        const tag = this.data.filter((item) => item.id === id)[0];
        tag.name = name;
        this.save();
        return "success";
      }
    } else {
      return "not found";
    }
  },
  remove(id: string) {
    let index = -1;
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].id === id) {
        index = i;
        break;
      }
    }
    this.data.splice(index, 1);
    this.save();
    return true;
  },
  save() {
    return window.localStorage.setItem(
      localStorageKeyName,
      JSON.stringify(this.data)
    );
  },
};
export { tagsModel };
