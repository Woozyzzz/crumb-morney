import Vue from "vue";
import Component from "vue-class-component";

@Component
export class TagHelper extends Vue {
  createTag() {
    const name = window.prompt("请输入新的标签:");
    if (name === "") {
      window.alert("标签名不能为空!");
    } else if (name !== null) {
      this.$store.commit("createTag", name);
    }
  }
}

export default TagHelper;
