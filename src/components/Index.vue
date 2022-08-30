<template>
  <div id="index">
    <dv-loading v-if="loading">Loading...</dv-loading>
    <div v-else class="host-body" style="box-sizing: border-box;">
      <div class="index-header" style="">
        <dv-decoration-10 style="width:7.2rem;height:.0625rem;" />
        <div class="d-flex jc-center" style="width: 9.6rem;">
          <dv-decoration-8
            :color="['#568aea', '#568aea']"
            style="width:15%;height:0.725rem;"
          />
          <div class="title" style="line-height: 0.6rem;">
            <span
              class="title-text"
              style="font-size: 0.28rem;width: 100%;color: #fff;"
              >货运源头三维管理平台</span
            >
          </div>
          <dv-decoration-8
            :reverse="true"
            :color="['#568aea', '#568aea']"
            style="width:15%;height:0.625rem;"
          />
        </div>
        <dv-decoration-10
          style="width:7.2rem;height:.0625rem; transform: rotateY(180deg);"
        />
        <!-- 导航 -->
        <el-menu
          class="el-menu-demo el-menu-demo-left"
          mode="horizontal"
          @select="handleSelect"
          background-color="rgb(40, 56, 79)"
          text-color="#fff"
        >
          <template v-for="(item, index) in $router.options.routes">
            <el-submenu
              :index="item.path"
              class="ifs"
              :key="index"
              v-if="
                item.children != undefined &&
                  item.meta.hidden == false &&
                  item.meta.clickOne == false
              "
            >
              <template slot="title">
                {{ item.meta.title }}
              </template>
              <template v-for="(items, indexs) in item.children">
                <el-submenu
                  :index="items.path"
                  class="ifs"
                  :key="indexs"
                  v-if="
                    items.children != undefined && items.meta.hidden == false
                  "
                >
                  <template slot="title">
                    {{ items.meta.title }}
                  </template>
                  <template v-for="(itema, indexa) in items.children">
                    <el-menu-item
                      :index="itema.path"
                      :key="indexa"
                      v-if="
                        itema.children == undefined &&
                          itema.meta.hidden == false
                      "
                    >
                      {{ itema.meta.title }}
                    </el-menu-item>
                  </template>
                </el-submenu>
              </template>
              <template v-for="(items, indexs) in item.children">
                <el-menu-item
                  :index="items.path"
                  class="ifs"
                  :key="indexs + 100"
                  v-if="
                    items.children == undefined && items.meta.hidden == false
                  "
                >
                  {{ items.meta.title }}
                </el-menu-item>
              </template>
            </el-submenu>
          </template>
          <template v-for="(item, index) in $router.options.routes">
            <el-menu-item
              :index="item.path"
              class="ifs"
              :key="index + 100"
              v-if="item.meta.hidden == false && item.meta.clickOne == true"
            >
              {{ item.meta.title }}
            </el-menu-item>
          </template>
        </el-menu>
        <!-- 导航 -->
      </div>
      <!-- 切换页面 -->
      <div class="switch">
        <keep-alive
          ><router-view
            style="width: 100%;height: 100%"
            v-if="$route.meta.keepAlive"
          ></router-view
        ></keep-alive>
        <router-view
          style="width: 100%;height: 100%"
          v-if="!$route.meta.keepAlive"
        ></router-view>
      </div>
      <!-- 切换页面 -->
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      loading: false
    };
  },
  mounted() {
    this.initHtml();
  },
  methods: {
    //加载数据等待效果
    cancelLoading() {
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    },
    //切换页面
    handleSelect(key) {
      console.log(key);
      if (key != this.$route.path) {
        if (key == "/user") {
          localStorage.setItem("token", "");
          this.$router.push({ path: "/login" });
        } else {
          this.$router.push({ path: key });
        }
      }
    },
    //初始化加载得页面
    initHtml() {
      // console.log(this.$route.path)
      this.$router.push({ path: this.$route.path });
    }
  }
};
</script>

<style lang="scss">
@import "../assets/scss/index.scss";
// 修改导航栏样式 satrt
#index .el-menu-demo-left {
  position: absolute !important;
  width: 100% !important;
  top: 40%;
  left: 0 !important;
  height: 60% !important;
  border: none;
  background: rgba(0, 0, 0, 0) !important;
}
.el-menu li.ifs:nth-child(1),
.el-menu li.ifs:nth-child(5),
.el-menu li.ifs:nth-child(6),
.el-menu li.ifs:nth-child(7),
.el-menu li.ifs:nth-child(8) {
  float: right;
}
#index .el-menu--horizontal > .el-submenu .el-submenu__title {
  height: 100% !important;
  line-height: 0.5rem !important;
  font-size: 0.2rem;
}
#index .el-menu-item {
  height: 100% !important;
  line-height: 0.5rem !important;
  font-size: 0.2rem;
}
.el-menu--horizontal .el-menu .el-menu-item {
  height: 0.4rem !important;
  line-height: 0.4rem !important;
  font-size: 0.2rem !important;
}
.el-submenu__title {
  height: 0.4rem !important;
  line-height: 0.4rem !important;
  font-size: 0.2rem !important;
  min-width: 1.8rem !important;
}
.el-menu--popup {
  min-width: 1.6rem !important;
}
.el-submenu__icon-arrow {
  right: 0.03rem !important;
}
#index .el-menu--horizontal > .el-menu-item.is-active {
  color: #e78141;
  border-color: #fff;
  border: none;
}
#index .el-menu--horizontal > .el-menu-item {
  border: none !important;
}
.el-menu--horizontal > .el-submenu.is-active .el-submenu__title {
  color: #e78141;
  border-color: #fff;
  border: none;
}
.el-menu--horizontal .el-menu .el-submenu.is-active > .el-submenu__title {
  color: #e78141 !important;
  // background: #fff !important;
}
.el-menu--horizontal .el-menu .el-menu-item.is-active {
  color: #fff !important;
}
.el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
  background: #ffffff !important;
  color: #e78141 !important;
}
.el-menu--horizontal > .el-submenu .el-submenu__title {
  border: none !important;
}
.el-submenu .el-menu-item {
  min-width: 1.8rem !important;
}
.el-submenu__title:hover {
  background: #ffffff !important;
  color: #e78141 !important;
}
.el-menu--horizontal .el-menu .el-menu-item {
  width: 100%;
  text-align: center;
}
// 修改导航栏样式 end
.index-header {
  background: rgba(40, 56, 79, 1);
  display: flex;
  padding-top: 0.2rem;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2;
}
.switch {
  width: 100%;
  height: 100%;
  background: #fff;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1;
  padding-top: 0.82rem;
  box-sizing: border-box;
}
.color {
  width: 100%;
  background: #fff;
  text-align: center;
  font-size: 1rem;
  color: red;
}
</style>
