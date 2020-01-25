<template>
  <div id="app">
    <div id="language">
      <div class="language" @click="japan">和文/</div>
      <div class="language" @click="english">English/</div>
      <div class="language" @click="chinese">中文/</div>
    </div>
    <br />
  </div>
</template>
<script>
export default {
  name: "Language",
  data() {
    return {
      kept: ""
    };
  },

  methods: {
    japan() {
      this.$router.push("/qrcode/japanese/?" + `${this.kept}`);
    },
    english() {
      this.$router.push("/qrcode/english/?" + `${this.kept}`);
    },
    chinese() {
      this.$router.push("/qrcode/chinese/?" + `${this.kept}`);
    }
  },
  mounted() {
    var url = window.location.href;
    console.log(url);
    var decoded = decodeURI(url);
    const keep = decoded.split("?")[1];
    console.log(keep);
    this.kept = keep;
  }
};
</script>>
<style scoped>
#language {
  text-align: center;
}

.language {
  display: inline-block;
}
</style>