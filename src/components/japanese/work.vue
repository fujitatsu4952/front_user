<template>
  <div class="selectWrap">
    <select class="select" v-model="work">
      <option value>ご職業...</option>
      <option value="学生">学生</option>
      <option value="自営業(社員あり)">自営業(社員あり)</option>
      <option value="個人事業主">個人事業主</option>
      <option value="会社員(平日休み)">会社員(平日休み)</option>
      <option value="会社員(土日祝休み)">会社員(土日祝休み)</option>
      <option value="その他">その他</option>
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