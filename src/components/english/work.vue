<template>
  <div class="selectWrap">
    <select class="select" v-model="work">
      <option value>your work...</option>
      <option value="学生">students</option>
      <option value="自営業(社員あり)">self-employed(having employee)</option>
      <option value="個人事業主">self-employed(no employee)</option>
      <option value="会社員(平日休み)">office worker(off during weekdays)</option>
      <option value="会社員(土日祝休み)">office worker(off during weekends and holidays)</option>
      <option value="その他">other</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "Work",

  data() {
    return {
      work: ""
    };
  },

  updated: function() {
    this.$emit("input", this.work);
  }
};
</script>

<style>
</style>