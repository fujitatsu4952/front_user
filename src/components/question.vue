<template>
<div>
  <div><p>{{ countrya }}</p></div>
<div id="formWrapper">
    <form target="dummyIframe" name="questiontext" action="https://docs.google.com/forms/u/0/d/e/1FAIpQLScCikOLn-0LN5cYIr8aXnyzDlkljBtaI4nfAQ2EH0hnEYnukw/formResponse">

      <label for="name">お名前</label>
      <input id="name" type="text" name="entry.1168091994" placeholder="お名前をお書きください" :value=name>
      <br>
      <label for="country">国籍</label>
      <input id="country" name="entry.899960820" placeholder="国籍" :value=countrya >
      <br>
      <label for="time">チェックイン時刻</label>
      <input id="time" name="entry.2111076632" placeholder="時間" :value=getTimeStatement(checktime) >
   <p>{{flag}}</p>
        <button @click="changeFlag">切り替え</button>
      <button id="btn"  class="btn-square" @click="CompleteQuestion" value="送信">Complete</button>
    </form>
  <iframe name="dummyIframe" style="display:none;"></iframe>
</div>
  <div id="thxMessage" style="display:none;">お問い合わせありがとうございました。</div>
</div>
<!-- お名前　性別　年齢　国籍　職業　お電話番号　住所　回答言語　今回の滞在の目的を教えてください　知ったきっかけを教えてください。(複数回答可)　決め手の順位を教えてください　誰ときましたか？　 宿泊は何回めですか？　ホテルに求めるものはなんですか？　SHE,に求めるものはなんですか？　日本での滞在は何ヶ所目ですか？　(周遊される方)次にどちらの国/都市に行きますか？-->
</template>

<script>
import _ from 'lodash'
import dayjs from "dayjs";
import "dayjs/locale/ja";
dayjs.locale("ja");

export default {
  name: 'Question',
  props: ['countrya', 'name', 'checktime'],
data() {
    return {
      flag: true
    }
  },
methods: {
  CompleteQuestion: function(){
      document.questiontext.submit();
      document.getElementById('formWrapper').style.display = 'none';
      document.getElementById('thxMessage').style.display = 'block';
      this.flag = !this.flag;
  },

  changeFlag: function () {
                    this.flag = !this.flag;
  },

  nextPage: function (){
    this.nextPage = this.$router.push("/thankyou");
  },

  getTimeStatement(time) {
      return dayjs(time).format("YYYY/MM/DD HH:mm:ss");
  },
},
created: function() {
  this.delayFunc = _.debounce(this.nextPage, 1000);
},
watch: {
  flag: function (newFlag, oldFlag) {
    console.log(newFlag, oldFlag);
    this.delayFunc();
    }
  }
}
</script>

<style>
form {
  text-align: center;
}


</style>