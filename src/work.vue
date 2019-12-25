<template>
<div class="selectWrap1">
      <select class="select1" v-model="work">
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
  padding: 0 0px 0 10px;
  border: 1px solid #b4b3b3;
  border-radius: 2px;
  border-bottom: solid 4px #b4b4b4;
}


</style>