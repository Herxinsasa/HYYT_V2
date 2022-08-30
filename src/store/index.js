import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
//实现登录拦截器,全局变量组件间使用
export default new Vuex.Store({
  state: {
    user: {
      username:
        window.localStorage.getItem("user" || "[]") == null
          ? ""
          : JSON.parse(window.localStorage.getItem("user" || "[]")).username
    }
  },
  mutations: {
    login(state, user) {
      state.user = user;
      window.localStorage.setItem("user", JSON.stringify(user));
    }
  },
  actions: {},
  modules: {}
});
