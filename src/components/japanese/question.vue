<template>
  <div>
    <div>
      <ul>
        <span class="Questions" v-for="(question, idx) in selectJapanese(questions)" :key="idx">
          <!-- 空の質問の処理 -->
          <div v-if='question.content===""'></div>
          <!-- 記述式 -->
          <div v-else-if="question.type==='Text'">
            <li class="menu">{{ question.content }}</li>
            <textarea
              rows="3"
              placeholder="ごちらにご記入ください"
              class="QuestionInput"
              v-model="selectJapanese(questions)[idx].write"
            />
          </div>
          <!-- 複数選択 -->
          <div v-else-if="question.type==='SelectMulti'">
            <li class="menu">{{ question.content }}</li>
            <div
              class="QuestionOption"
              v-for="(option) in getOptionList(question)"
              :key="option.index"
            >
              <input
                :id="`${question.Question_ID}${option}`"
                type="checkbox"
                :value="option"
                v-model="selectJapanese(questions)[idx].write"
              />
              <label class="checkbox" :for="`${question.Question_ID}${option}`">{{option}}</label>
            </div>
          </div>
          <!-- 選択+記述式 -->
          <div class="cp_ipradio" v-else-if="question.type==='SelectAndText'">
            <li class="menu">{{ question.content }}</li>
            <div
              class="QuestionOption"
              v-for="(option) in getOptionList(question)"
              :key="option.index"
            >
              <input
                :id="`${question.Question_ID}${option}`"
                type="radio"
                :value="option"
                v-model="selectJapanese(questions)[idx].write"
              />
              <label class="radio" :for="`${question.Question_ID}${option}`">{{option}}</label>
            </div>
            <textarea
              rows="3"
              placeholder="ごちらにご記入ください"
              class="QuestionInput"
              v-if="selectJapanese(questions)[idx].write === 'その他(自由記述)'"
              v-model="selectJapanese(questions)[idx].free"
            />
          </div>
          <!-- 選択式 -->
          <div v-else>
            <li class="menu">{{ question.content }}</li>
            <div v-for="(option, idxOption) in getOptionList(question)" :key="option">
              <input
                :id="`${question.Question_ID}${getJapaneseOption(question.Question_ID, idxOption)}`"
                type="radio"
                :value="getJapaneseOption(question.Question_ID, idxOption)"
                v-model="selectJapanese(questions)[idx].write"
              />
              <label
                class="radio"
                :for="`${question.Question_ID}${getJapaneseOption(question.Question_ID, idxOption)}`"
              >{{option}}</label>
            </div>
          </div>
        </span>
      </ul>
      <br/>
      <button class="btn-square" @click="submitQuestion">送信</button>
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
    selectJapanese(array) {
      return array.filter(key => key.language === "JP");
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
      form.append("回答の言語", "日本語");
      this.selectJapanese(this.questions).forEach(item => {
        if (item.write === "その他(自由記述)") {
          form.append(item.content, item.free || "無回答");
        } else {
          if (typeof item.write === "string") {
            form.append(item.content, item.write || "無回答");
          } else if (typeof item.write === "object") {
            form.append(
              item.content,
              item.write.length ? item.write : "無回答"
            );
          }
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
          write: "SelectMulti".includes(item.type)
            ? []
            : "" || "Select".includes(item.type)
            ? []
            : "",
          free: ""
        });
      });
      console.log(this.questions);
    });
  }
};
</script>

<style>
ul {
  padding-left: 0px;
}
li {
  list-style-type: none;
  padding: 0.5em 1em;
  border-radius: 20px;
  display: block;
  position: relative;
  margin: 0 auto;
  padding: 0.5em 1em;
  text-decoration: none;
  background: #a4a4a4; /*ボタン色*/
  color: #fff;
  border-bottom: solid 4px #9c9c9c;
}

form {
  text-align: center;
}
input[type="radio"],
input[type="checkbox"] {
  display: none;
}

.radio,
.checkbox {
  box-sizing: border-box;
  -webkit-transition: background-color 0.2s linear;
  transition: background-color 0.2s linear;
  position: relative;
  display: inline-block;
  margin: 0 20px 8px 10px;
  padding: 12px 12px 12px 42px;
  border-radius: 8px;
  background-color: #f6f7f8;
  vertical-align: middle;
  cursor: pointer;
}
.radio:hover,
.checkbox:hover {
  background-color: #e4e4e4;
}
.radio:hover:after,
.checkbox:hover:after {
  border-color: #9c9c9c;
}
.radio:after {
  -webkit-transition: border-color 0.2s linear;
  transition: border-color 0.2s linear;
  position: absolute;
  top: 50%;
  left: 15px;
  display: block;
  margin-top: -10px;
  width: 16px;
  height: 16px;
  border: 2px solid #bbb;
  border-radius: 50%;
  content: "";
}

.checkbox:after {
  -webkit-transition: border-color 0.2s linear;
  transition: border-color 0.2s linear;
  position: absolute;
  top: 50%;
  left: 15px;
  display: block;
  margin-top: -10px;
  width: 16px;
  height: 16px;
  border: 2px solid #bbb;
  border-radius: 4px;
  content: "";
}

.radio:before {
  -webkit-transition: opacity 0.2s linear;
  transition: opacity 0.2s linear;
  position: absolute;
  top: 50%;
  left: 20px;
  display: block;
  margin-top: -5px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #9c9c9c;
  content: "";
  opacity: 0;
}

input[type="radio"]:checked + .radio:before {
  opacity: 1;
}

.checkbox:before {
  -webkit-transition: opacity 0.2s linear;
  transition: opacity 0.2s linear;
  position: absolute;
  top: 50%;
  left: 21px;
  display: block;
  margin-top: -7px;
  width: 5px;
  height: 9px;
  border-right: 3px solid #9c9c9c;
  border-bottom: 3px solid #9c9c9c;
  content: "";
  opacity: 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
input[type="checkbox"]:checked + .checkbox:before {
  opacity: 1;
}

.QuestionInput {
  width: 100%;
  text-align: center;
}
</style>