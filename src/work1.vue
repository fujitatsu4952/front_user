<template>
  <div class="selectWrap1">
    <select class="select1" v-model="work1">
      <option value>type of industry...</option>
      <option value="広告/メディア">広告/メディア</option>
      <option value="販売">販売</option>
      <option value="飲食">飲食</option>
      <option value="不動産">不動産</option>
      <option value="介護">介護</option>
      <option value="その他(自由記述)" >その他(自由記述)</option>
    </select>
    <input v-if="work1 === 'その他(自由記述)'" placeholder="自由記述欄" class="input1" v-model="work2" />
  </div>
</template>

<script>
export default {
  name: "Work1",

  data() {
    return {
      work1: "",
      work2: ""
    };
  },

  updated: function() {
    this.$emit(
      "input",
      this.work1 === "その他(自由記述)" ? this.work2 : this.work1
      // ?はif文でも構成できる
    );
  }
};
</script>

<style>
.selectWrap1 {
  width: 100%;
  position: relative;
  display: inline-block;
}

.select1 {
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

.input1 {
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