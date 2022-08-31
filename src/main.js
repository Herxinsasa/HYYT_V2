import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import * as echarts from "echarts";
import dataV from "@jiaminghi/data-view";
import ElementUI from "element-ui";
import VueCesium from "vue-cesium";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(echarts);
Vue.use(dataV);
Vue.use(ElementUI);
Vue.use(VueCesium, {
  cesiumPath: "https://unpkg.com/cesium@latest/Build/Cesium/Cesium.js",
  accessToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2ZDJlZWZhOS1iY2I2LTRlOTEtOTliMi1kZjE2Zjk0Y2MzMmIiLCJpZCI6Mzc2NjMsImlhdCI6MTYwNTM1Njc0Nn0.eQo0bYPaaI4iFxUD83HcqsKxcdLU-6v9Q0nrITNaPJ0"
});

// 适配flex
import "./common/flexible";
// 引入全局scss
import "./assets/scss/style.scss";

// 设置反向代理，前端请求默认发送到 http://localhost:8443/api
var axios = require("axios");
axios.defaults.baseURL = "http://localhost:8443/api";
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
Vue.prototype.$axios = axios;
//阻止启动生产消息
Vue.config.productionTip = false;

// 判断路由
router.beforeEach(function(to, from, next) {
  if (to.meta.needLogin) {
    //页面是否登录
    if (localStorage.getItem("user")) {
      //本地存储中是否有一般是token(uid)数据类似于密钥数据localStorage.getItem("token")
      next(); //表示已经登录
    } else {
      //next可以传递一个路由对象作为参数 表示需要跳转到的页面
      next({
        name: "login"
      });
    }
  } else {
    //表示不需要登录
    next(); //继续往后走
  }
});

new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
