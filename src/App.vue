<template>
  <div>
    <h2>Check in form</h2>

    <div>
      <p>name</p>
      <textarea class="name" v-model="url.name"></textarea>
    </div>

    <div class ="tell-area">
      <p>tell</p>
      <textarea class="tell" v-model="url.tell"/>
    </div>

    <div class="country">
      <p>country</p>
      <Country v-model="country" />
    </div>

    <div class="contents-box">
      <div class="content">
        <p>sex</p>
        <Sex v-model="sex" />
      </div>
      <div class="content">
        <p>age</p>
        <Age v-model="age" />
      </div>
    </div>

    <div class="contents-box"> 
      <div class="content-work">
        <p>your work</p>
        <WorkMain v-model="work"/>
      </div>
      <div class="content-work">
        <p>type of industry</p>
        <WorkType v-model="work_type"/>
      </div>
    </div>

    <p>address</p>
    <div>
      <textarea class="address" placeholder="都道府県から記述ください" v-model="address" rows="4" cols="40"></textarea>
    </div>

    <br/>
    <button class="btn-square" @click="completeCheck">complete</button>

    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    

    <div>
      <p>Q1,何を目的に来ましたか</p>
      <select class="question">
        <option>観光</option>
        <option>ビジネス</option>
        <option>帰省</option>
        <option>その他</option>
      </select>
    </div>
    <button type="button" class="btn-square" onclick="location.href='https://www.lngglobiz.com/'">complete</button>
  </div>
</template>

<script>
import { callApi, post } from "./Api.js";
import Country from "./components/Country";
import Age from "./components/Age";
import Sex from "./components/Sex";
import WorkMain from "./components/work";
import WorkType from "./components/work_type";

export default {
  name: "Component",
  components: {
    Country,
    Age,
    Sex,
    WorkMain,
    WorkType
  },
  data() {
    return {
      country: "",
      age: "",
      sex: "",
      address: "",
      work: "",
      work_type:"",
      tell: "",
      people: "",
      name:"",
      checkingtime:"",
      url:{
        name:"",
        tell:"",
        reserve:"",
        hotel:"",
      },
      // 連想配列のキーに連想配列を与えている
    };
  },
  methods: {
    setInfo: function(info) {
      this.info = info;
    },
    callApi(url) {
      Api.callApi(url, this.setInfo);
    },
    completeCheck() {
      //記述が全て完了していることを確かめるif文
      if(this.country!=="" &&
         this.url.name!=="" &&
         this.age!=="" &&
         this.address!=="" &&
         this.sex!=="" &&
         this.work!=="" &&
         this.url.tell!=="" &&
         this.url.reserve!==""
         ){
        var end;
        end = new Date();
        var Complete_Time = end.getTime();
        this.checkingtime = Complete_Time
        var date = Date(this.checkingtime);
        
      post("http://localhost:3005/api/v1/checkin", {
        country: this.country,
        name: this.url.name,
        age: this.age,
        address: this.address,
        work: this.work,
        work_type: this.work_type,
        tell: this.url.tell,
        people: this.people,
        sex: this.sex,
        reserve: this.url.reserve,
        hotel:this.url.hotel,
        checkingtime: this.checkingtime,
      }).then(res => {
        console.log(res);
      });
      //アンケート項目へ自動スクロールする
      var element = document.documentElement;
      var bottom = element.scrollHeight - element.clientHeight;
      scrollTo({
        top: bottom,
        behavior: "smooth"
      });
    }
    else{
      confirm("項目を全て埋めてください(Please fill out this form)")
    }},
  },

  mounted() {
    callApi("http://localhost:3005/api/v1/").then(data => {
      console.log(JSON.stringify(data.data));
    });
    var url = window.location.href;
    console.log(url);
    var decoded = decodeURI(url);
    decoded.split("?")[1].split("&");
    const map = {};
    decoded
      .split("?")[1]
      .split("&")
      .forEach((autoform) => {
        const parsed = autoform.split('=');
        map[parsed[0]]= parsed[1];
      });
    this.url = map;
  }
};
</script>

<style>
html {
  background: #efefef;
}

h2 {
  text-align: center
}

p {
  text-align: center;
}

.name {
  display: block;
  margin:0 auto;
  width:60%;
  border: 1px solid #b4b3b3;
  border-radius: 2px;
  border-bottom: solid 4px #b4b4b4;
  text-align: center;
}

.tell-area {
  text-align: center;
  margin: 0 auto;
  }
  .tell {
    border: 1px solid #b4b3b3;
    border-radius: 2px;
    border-bottom: solid 4px #b4b4b4;
    text-align: center;
    width:60%;
}

.country {
  width: 60%;
  margin:0 auto;
  text-align: center;
} 

.contents-box {
  display: table;
  width: 80%;
  table-layout: fixed;
  margin: 0 auto;
  }
  .content {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }
  .content-work {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
}

.address {
  display: block;
  margin:0 auto;
  width:60%;
  border: 1px solid #b4b3b3;
  border-radius: 2px;
  border-bottom: solid 4px #b4b4b4;
  text-align: center;
}

.btn-square {
  width:150px;
  border-radius: 20px;
  display: block;
  position: relative;
  margin: 0 auto;
  padding: 0.5em 1em;
  text-decoration: none;
  background: #a4a4a4; /*ボタン色*/
  color: #fff;
  border-bottom: solid 4px #b4b4b4;
  }
  .btn-square:active {
  /*ボタンを押したとき*/
  -webkit-transform: translateY(4px);
  transform: translateY(4px); /*下に動く*/
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.2); /*影を小さく*/
  border-bottom: none;
}

.question {
  margin: 0 auto;
  display: block;
  border:solid 2px #b4b4b4;
}

</style>