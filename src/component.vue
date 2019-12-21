<template>
  <p>{{ info }}</p>
</template>

<script>
import { callApi } from "./Api";

export default {
  name: "Component",
  components: { Api },
  data() {
    return {
      info: ""
    };
  },
  methods: {
    setInfo: function(info) {
      this.info = info;
    },
    callApi(url) {
      Api.callApi(url, this.setInfo);
    }
  },
  mounted() {
    callApi("http://localhost:3004/api/v1/").then(data => {
      console.log(data);
    });
  }
};
</script>

<style>
</style>