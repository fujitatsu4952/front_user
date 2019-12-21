<template>
  <div>
    <myheader></myheader>
    <country v-model="country" />
    <!-- <p>国籍</p>
      <div>
        <input type="text" v-model="country" />
    </div>-->
    <p>性別:</p>
    <div>
      <select v-model="selected">
        <option></option>
        <option>男性</option>
        <option>女性</option>
        <option>その他</option>
        <option>回答しない</option>
      </select>
    </div>

    <!-- <p>年齢:</p>
      <div>
        <input type="date" v-model="dated" />
    </div>-->
    <agea v-model="age" />
    
    <p>住所:</p>
    <div>
      <input type="text" value="〒" />
    </div>
    <div>
      <textarea v-on:mouseover="mouseover" v-model="address" rows="4" cols="40"></textarea>
    </div>

    <p>職業:</p>
    <div>
      <input type="text" v-model="work" />
    </div>
    <p>電話番号:</p>
    <div>
      <input type="tel" v-model="urlname.oq" />
    </div>

    <p>宿泊人数:</p>
    <div>
      <select name="人数" v-model="people">
        <option></option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
        <option>7</option>
        <option>8</option>
      </select>
    </div>
    
    <p>署名</p>
    <div>
      <textarea v-model="urlname.q">  </textarea>
    </div>
<!-- v-ifをつけているのはurlnameのなかを非同期で取りに行っているため、ない場合があるから。もし入っているのであれば挿入されるということを条件づけている。 -->
    <br/>

    <button @click="completeCheck">complete</button>

    <button @click="autoscroll">move</button>
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
import myheader from "./components/myheader";
import country from "./Country";
import agea from "./Age";

export default {
  name: "Component",
  components: {
    myheader,
    country,
    agea
  },
  data() {
    return {
      country: "",
      age: "",
      // countryとageには依然として不安が残っている。
      selected: "",
      address: "都道府県から記述してください",
      work: "",
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
      scrollTo(0, bottom);
    },
    autoscroll(){
      var element = document.documentElement;
      var bottom = element.scrollHeight - element.clientHeight;
      scrollTo(0, bottom);
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
</style>