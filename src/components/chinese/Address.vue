<template>
  <div class="selectWrap">
    <div>
      <textarea class="address" v-model="address" rows="4" cols="40"></textarea>
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