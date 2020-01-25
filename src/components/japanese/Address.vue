<template>
  <div class="selectWrap">
    <div>
      <textarea class="address" placeholder="都道府県よりご記入ください" v-model="address" rows="4" cols="40"></textarea>
    </div>
  </div>
</template>

<script>
export default {
  name: "Address",

  data() {
    return {
      address: ""
    };
  },

  updated: function() {
    this.$emit("input", this.address);
  }
};
</script>