<template>
  <div class="selectWrap">
    <select class="select" v-model="selected">
      <option value>性别...</option>
      <option value="男性">男</option>
      <option value="女性">女</option>
      <option value="その他">其他</option>
      <option value="回答しない">未答复</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "Sex",

  data() {
    return {
      selected: ""
    };
  },

  updated: function() {
    this.$emit("input", this.selected);
  }
};
</script>

<style>
.selectWrap {
  width: 90%;
  position: relative;
  display: inline-block;
}

.select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 100%;
  height: 40px;
  background: transparent;
  position: relative;
  z-index: 1;
  padding: 0 40px 0 10px;
  border: 1px solid #b4b3b3;
  border-radius: 2px;
  border-bottom: solid 4px #b4b4b4;
}
</style>