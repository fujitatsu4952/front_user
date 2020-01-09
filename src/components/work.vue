<template>
<div class="selectWrap">
      <select class="select" v-model="work">
        <option value="">your work...</option>
        <option>学生</option>
        <option>自営業(社員あり)</option>
        <option>個人事業主</option>
        <option>会社員(平日休み)</option>
        <option>会社員(土日祝休み)</option>
        <option>その他</option>
      </select>
    </div>
</template>

<script>
export default {
  name: 'Work',

data() {
    return {
      work: "",
    }
  },

updated: function() {
  this.$emit('input', this.work)
},

}
</script>

<style>

</style>