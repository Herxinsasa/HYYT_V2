<template>
  <body id="log">
    <el-form class="login-container" label-position="left" label-width="0px">
      <h3 class="login_title">环水保系统登录</h3>
      <el-form-item>
        <el-input
          type="text"
          v-model="loginForm.username"
          auto-complete="off"
          prefix-icon="el-icon-user"
          placeholder="请输入账号"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          type="password"
          v-model="loginForm.password"
          auto-complete="off"
          prefix-icon="el-icon-lock"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button
          type="primary"
          style="width: 100%;background: #505458;border: none"
          @click="login"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </body>
</template>

<script>
import * as verification from "../common/verification";
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        uesrname: "",
        password: ""
      },
      responseResult: []
    };
  },
  methods: {
    login() {
      if (!verification.vEmpty(this.loginForm.username)) {
        this.$message.error("账号格式错误");
        return;
      }
      if (!verification.vEmpty(this.loginForm.password)) {
        this.$message.error("密码格式错误");
        return;
      }
      this.$router.replace({ path: "/homepage" });
      //登入接口请求根据实际需求需要打开服务器和运行后端代码
      // this.$axios
      //   .post("/login", {
      //     //请求login接口发送数据
      //     username: this.loginForm.username,
      //     password: this.loginForm.password
      //   })
      //   .then(successResponse => {
      //     //成果响应，跳转
      //     if (successResponse.data.code === 200) {
      //       this.$router.replace({ path: "/homepage" });
      //  _this.$store.commit('login', _this.loginForm)
      //   var path = this.$route.query.redirect
      //   this.$router.replace({path: path === '/' || path === undefined ? '/homepage' : path})
      //     }
      //   })
      //   .catch(failResponse => {
      //     this.$message.error("账号密码错误");
      //   });
    }
  }
};
</script>

<style lang="scss" scoped>
#log {
  background: url("../assets/image/earth.jpg") no-repeat;
  background-position: center;
  position: fixed;
  height: 100%;
  width: 100%;
  background-size: cover;
}
body {
  margin: 0 !important;
}
.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 210px auto;
  width: 400px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>
