<template>
  <div>
    <div id="center">
      <TextAnimeTop :autoplay="autoplay" />
    </div>
  </div>
</template>
<script>
import TextAnimeTop from "./animation.vue";

export default {
  components: {
    TextAnimeTop
  },
  data() {
    return {
      autoplay: true
    };
  }
};
</script>
<style>
#center {
  text-align: center;
  margin: 0 auto;
  margin-top: 80%;
}
</style>