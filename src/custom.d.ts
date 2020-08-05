type RecordItem = {
  amount: string;
  type: string;
  selectedTags: string[];
  note: string;
  createdAt?: Date;
};
type Tag = {
  id: string;
  name: string;
};
type TagListModel = {
  data: Tag[];
  fetch: () => Tag[];
  save: () => void;
  create: (name: string) => "success" | "duplicated";
  update: (id: string, name: string) => "success" | "notFound" | "duplicated";
  remove: (id: string) => boolean;
};
type RootState = {
  recordList: RecordItem[];
  tagList: Tag[];
  currentTag?: Tag;
};
type DateSourceItem = {
  text: string;
  value: string;
};
type HashTableValue = { title: string; items: RecordItem[] };
type Result = { title: string; total?: number; items: RecordItem[] }[];
