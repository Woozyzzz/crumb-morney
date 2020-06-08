<template>
  <div class="tags">
    <div class="currentWrapper">
      <ul class="current">
        <li>衣</li>
        <li>食</li>
        <li>住</li>
        <li>行</li>
      </ul>
    </div>
    <div class="new">
      <button>新增标签</button>
    </div>
  </div>
</template>

<script lang="ts">
export default {};
</script>

<style lang="scss" scoped>
.tags {
  height: 0;
  font-size: 14px;
  padding: 16px;
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  flex-direction: column;
  > .currentWrapper {
    overflow: hidden auto;
    > .current {
      display: flex;
      flex-wrap: wrap;
      margin: 0 -6px;
      > li {
        background: #d9d9d9;
        $h: 24px;
        height: $h;
        line-height: $h;
        border-radius: $h/2;
        padding: 0 16px;
        margin: 4px 6px;
      }
    }
  }
  > .new {
    padding: 8px;
    button {
      background: transparent;
      border: none;
      color: #999;
      border-bottom: 1px solid;
      padding: 0 4px;
    }
  }
}
</style>