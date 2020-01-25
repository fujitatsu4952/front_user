<template>
  <div class="selectWrap">
    <select class="select" v-model="work">
      <option value>工作...</option>
      <option value="学生">学生</option>
      <option value="自営業(社員あり)">自雇人士(有员工)</option>
      <option value="個人事業主">自雇人士(没有员工)</option>
      <option value="会社員(平日休み)">上班族(平日不营业)</option>
      <option value="会社員(土日祝休み)">上班族(周末和节假日不营业)</option>
      <option value="その他">其他</option>
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