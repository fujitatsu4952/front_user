<template>
  <div class="selectWrap">
    <select class="select" v-model="work_select">
      <option value>什么样的工作...</option>
      <option value="広告/メディア">广告/媒体</option>
      <option value="販売">销售</option>
      <option value="飲食">饮食</option>
      <option value="不動産">不动产</option>
      <option value="介護">护理</option>
      <option value="その他(自由記述)">其他(请描述)</option>
    </select>
    <input
      v-if="work_select === 'その他(自由記述)'"
      placeholder="自由填写栏"
      class="input"
      v-model="work_write"
    />
  </div>
</template>

<script>
export default {
  name: "Work_type",

  data() {
    return {
      work_select: "",
      work_write: ""
    };
  },

  updated: function() {
    this.$emit(
      "input",
      this.work_select === "その他(自由記述)"
        ? this.work_write
        : this.work_select
      // ?はif文でも構成できる
    );
  }
};
</script>

<style>
.selectWrap {
  width: 100%;
  position: relative;
  display: inline-block;
}

.select {
  display: block;
  margin: 0 auto;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 90%;
  height: 40px;
  background: transparent;
  position: relative;
  z-index: 1;
  padding: 0 0px 0 5px;
  border: 1px solid #b4b3b3;
  border-radius: 2px;
  border-bottom: solid 4px #b4b4b4;
  background-color: white;
}

.input {
  display: block;
  border: 1px solid #b4b3b3;
  border-radius: 2px;
  border-bottom: solid 4px #b4b4b4;
  margin: 0 auto;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 60%;
  height: 40px;
  background: transparent;
  position: relative;
  z-index: 1;
  padding: 0 40px 0 10px;
  background-color: white;
}
</style>