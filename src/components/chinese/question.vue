<template>
  <div>
    <div>
      <ul>
        <span class="Questions" v-for="(question, idx) in selectChinese(questions)" :key="idx">
          <!-- 空の質問の処理 -->
          <div v-if='question.content===""'></div>
          <!-- 記述式 -->
          <div v-else-if="question.type==='Text'">
            <li class="menu">{{ question.content }}</li>
            <textarea
              rows="3"
              placeholder="免费说明"
              class="QuestionInput"
              v-model="selectChinese(questions)[idx].write"
            />
          </div>
          <!-- 複数選択式 -->
          <div v-else-if="question.type==='SelectMulti'">
            <li class="menu">{{ question.content }}</li>
            <div
              class="QuestionOption"
              v-for="(option, idxOption) in getOptionList(question)"
              :key="idxOption"
            >
              <input
                :id="`${question.Question_ID}${option}`"
                type="checkbox"
                :value="getJapaneseOption(question.Question_ID, idxOption)"
                v-model="selectChinese(questions)[idx].write"
              />
              <label class="checkbox" :for="`${question.Question_ID}${option}`">{{option}}</label>
            </div>
          </div>
          <!-- 選択+記述式 -->
          <div v-else-if="question.type==='SelectAndText'">
            <li class="menu">{{ question.content }}</li>
            <div
              class="QuestionOption"
              v-for="(option, idxOption) in getOptionList(question)"
              :key="idxOption"
            >
              <input
                :id="`${question.Question_ID}${option}`"
                type="radio"
                :value="getJapaneseOption(question.Question_ID, idxOption)"
                v-model="selectChinese(questions)[idx].write"
              />
              <label class="radio" :for="`${question.Question_ID}${option}`">{{option}}</label>
            </div>
            <textarea
              rows="3"
              placeholder="自由填写栏"
              class="QuestionInput"
              v-if="selectChinese(questions)[idx].write === 'その他(自由記述)'"
              v-model="selectChinese(questions)[idx].free"
            />
          </div>
          <!-- 選択式 -->
          <div v-else>
            <li class="menu">{{ question.content }}</li>
            <div v-for="(option, idxOption) in getOptionList(question)" :key="idxOption">
              <input
                :id="`${question.Question_ID}${getJapaneseOption(question.Question_ID, idxOption)}`"
                type="radio"
                :value="getJapaneseOption(question.Question_ID, idxOption)"
                v-model="selectChinese(questions)[idx].write"
              />
              <label
                class="radio"
                :for="`${question.Question_ID}${getJapaneseOption(question.Question_ID, idxOption)}`"
              >{{option}}</label>
            </div>
          </div>
        </span>
      </ul>

      <br />
      <button class="btn-square" @click="submitQuestion">提交</button>
    </div>
  </div>
</template>

<script>
import { callApi, post } from "../../Api.js";
import _ from "lodash";
import dayjs from "dayjs";
import "dayjs/locale/ja";
dayjs.locale("ja");

export default {
  name: "Question",
  props: [
    "checktime",
    "name",
    "sex",
    "age",
    "country",
    "work",
    "work_type",
    "tell",
    "address"
  ],
  data() {
    return {
      questions: [],
      ApiAddress: ""
    };
  },
  methods: {
    getJapaneseOption(questionID, idx) {
      return this.questions.find(
        item => item.Question_ID === questionID && item.language === "JP"
      )[`OPTION${idx + 1}`];
    },
    getJapaneseContent(questionID) {
      return this.questions.find(
        item => item.Question_ID === questionID && item.language === "JP"
      )["content"];
    },
    selectChinese(array) {
      return array.filter(key => key.language === "CN");
    },

    getOptionList(obj) {
      return Object.keys(obj)
        .filter(key => key.match(/OPTION/))
        .filter(key => obj[key])
        .map(key => obj[key]);
    },

    submitQuestion() {
      const form = new FormData();
      form.append("タイムスタンプ", this.getTimeStatement(this.checktime));
      form.append("お名前", this.name);
      form.append("性別", this.sex);
      form.append("生年月日", this.age);
      form.append("国籍", this.country);
      form.append("ご職業(work)", this.work);
      form.append("業種", this.work_type);
      form.append("お電話番号", this.tell);
      form.append("ご住所", this.address);
      form.append("回答の言語", "中国語");
      this.selectChinese(this.questions).forEach(item => {
        if (item.write === "その他(自由記述)") {
          form.append(this.getJapaneseContent(item.Question_ID), item.free);
        } else {
          if (typeof item.write === "string") {
            form.append(
              this.getJapaneseContent(item.Question_ID),
              item.write || "無回答"
            );
          } else if (typeof item.write === "object") {
            form.append(
              this.getJapaneseContent(item.Question_ID),
              item.write.length ? item.write : "無回答"
            );
          }
          console.log(item.write);
        }
      });
      post(this.ApiAddress, form).then(res => {
        console.log(res);
      });
      this.$router.replace("/thankyou");
    },

    getTimeStatement(time) {
      return dayjs(time).format("YYYY/MM/DD HH:mm:ss");
    }
  },

  mounted() {
    var url = window.location.href;
    var decoded = decodeURI(url);
    const map = {};
    decoded
      .split("?")[1]
      .split("&")
      .forEach(autoform => {
        const parsed = autoform.split("=");
        map[parsed[0]] = parsed[1];
      });
    let Api = "";
    if (map.hotel === "2" || map.hotel === "3") {
      Api =
        "https://script.google.com/macros/s/AKfycbyMS7g1TntX8UEg-sCsTjmq1S0NMPdOuW21jGoB4pOIcnHyB4E0/exec";
    } else if (map.hotel === "1") {
      Api =
        "https://script.google.com/macros/s/AKfycbwjxsXuy-yw-DBATTpTDIfVfkQzy5BHEId_YPn-X2bsgNCyRxHl/exec";
    } else if (map.hotel === "4") {
      Api =
        "https://script.google.com/macros/s/AKfycbwm-0PWCvMelrcL6JrFRfYWSqK-yvvdpxh3bvEWmmNnFgvKeQE/exec";
    } else if (map.hotel === "5") {
      Api =
        "https://script.google.com/macros/s/AKfycbwWmazp-Fhp7HGR6asATTUzGGIX-SZldL4_9a7xWJosHMBV3Ic/exec";
    }
    this.ApiAddress = Api;
    callApi(this.ApiAddress).then(data => {
      console.log(JSON.stringify(data.data));
      var i = data.data[data.data.length - 1];
      data.data.forEach(item => {
        this.questions.push({
          ...item,
          write: "SelectMulti".includes(item.type) ? [] : "",
          free: ""
        });
      });
      console.log(this.questions);
    });
  }
};
</script>

<style>
</style>