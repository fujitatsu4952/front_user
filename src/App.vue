<template>
  <div>
    <h2>Check in form</h2>
    <div>
      <p>name</p>
      <textarea class="area1" v-model="urlname.q">  </textarea>
    </div>
    <div class ="menu2">
      <p>tell</p>
      <textarea class="area2" v-model="urlname.oq"/>
    </div>
      <div class="country">
    <p>country</p>
    <country v-model="country" />
      </div>
    <div class="container">
      <div class="menu">
    <p>sex</p>
    <sex v-model="selected" />
      </div>
      <div class="menu">
    <p>age</p>
      <agea v-model="age" />
      </div>
    </div>
    <div class="container"> 
      <div class="menu1">
      <p>your work </p>
        <work v-model="work"/>
      </div>
      <div class="menu1">
      <p>type of industry</p>
        <work1 v-model="work1"/>
      </div>
    
    </div>

    <p>address</p>
    <div>
      <textarea class="area1" v-on:mouseover="mouseover" v-model="address" rows="4" cols="40"></textarea>
    </div>
    
<!-- v-ifをつけているのはurlnameのなかを非同期で取りに行っているため、ない場合があるから。もし入っているのであれば挿入されるということを条件づけている。 -->
    <br/>
  
    <button class="btn-square-shadow button_position" @click="completeCheck">complete</button>
    <button class="btn-square-shadow button_position" @click="automove">move</button>
    
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
      <p id="element">Q1,何を目的に来ましたか</p>
      <select>
        <option>観光</option>
        <option>ビジネス</option>
        <option>帰省</option>
        <option>その他</option>
      </select>
    </div>
    <button type="“button”" onclick="location.href='https://www.lngglobiz.com/'">complete</button>
  </div>
</template>

<script>
import { callApi, post } from "./Api.js";
import country from "./Country";
import agea from "./Age";
import sex from "./Sex";
import work from "./work";
import work1 from "./work1";

export default {
  name: "Component",
  components: {
    country,
    agea,
    sex,
    work,
    work1
  },
  data() {
    return {
      country: "",
      age: "",
      // countryとageには依然として不安が残っている。
      selected: "",
      address: "都道府県から記述してください",
      work: "",
      work1:"",
      tell: "",
      people: "",
      name:"",
      urlname:{
        q:"",
        oq:"",
        r:"",
        tt:"",
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
    mouseover() {
      this.address = "";
    },
    completeCheck() {
      post("http://localhost:3004/api/v1/", {
        country: this.country,
        name: this.urlname.q,
        age: this.age,
        address: this.address,
        work: this.work,
        work1: this.work1,
        tell: this.urlname.oq,
        people: this.people,
        selected: this.selected,
        reserve: this.urlname.r,
        hotel:this.urlname.tt,
      }).then(res => {
        console.log(res);
      });

      var element = document.documentElement;
      var bottom = element.scrollHeight - element.clientHeight;
      scrollTo({
      top: bottom,
      behavior: "smooth"
    });
    },
    automove(){
      var element = document.documentElement;
      var bottom = element.scrollHeight - element.clientHeight;
      scrollTo({
      top: bottom,
      behavior: "smooth"
    });
    }
  },

  mounted() {
    callApi("http://localhost:3004/api/v1/").then(data => {
      console.log(JSON.stringify(data.data));
    });
    var url = window.location.href;
    console.log(url);
    var decode1 = decodeURI(url);
    console.log(decode1);
    console.log(decode1);
    decode1.split("?")[1].split("&");
    console.log(decode1.split("?")[1].split("&"));
    const map = {};
    console.log(map);
    decode1
      .split("?")[1]
      .split("&")
      .forEach((autoform) => {
        const parsed = autoform.split('=');
        map[parsed[0]]= parsed[1];
      });
    console.log(map);
    console.log(map.q);
    this.urlname = map;

  }
};
</script>

<style>
h2 {
  text-align: center
}
/* .csa {
  float:inherit
} */
p {
  text-align: center;
}

.country {
  width: 60%;
  margin:0 auto;
  text-align: center;
} 

.container {
  display: table;
  width: 80%;
  table-layout: fixed;
  margin: 0 auto;
}

.menu {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
.menu1{
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}

.menu2{
  text-align: center;
  margin: 0 auto;
}
.area2 {
  border: 1px solid #b4b3b3;
  border-radius: 2px;
  border-bottom: solid 4px #b4b4b4;
  text-align: center;
  width:60%;
}

.area1 {
  display: block;
  margin:0 auto;
  width:60%;
  border: 1px solid #b4b3b3;
  border-radius: 2px;
  border-bottom: solid 4px #b4b4b4;
  text-align: center;
}

.btn-square-shadow {
  width:150px;
  border-radius: 20px;
  display: inline-block;
  padding: 0.5em 1em;
  text-decoration: none;
  background: #a4a4a4; /*ボタン色*/
  color: #fff;
  border-bottom: solid 4px #b4b4b4;
}
.btn-square-shadow:active {
  /*ボタンを押したとき*/
  -webkit-transform: translateY(4px);
  transform: translateY(4px); /*下に動く*/
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.2); /*影を小さく*/
  border-bottom: none;
}

.button_position{
  display: block;
  position: relative;
  margin: 0 auto;
}


html {
  background: #efefef;
}


</style>