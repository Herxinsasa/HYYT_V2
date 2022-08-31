import Vue from "vue";
import VueRouter from "vue-router";
// 路由 meta 参数说明
// hidden    是否显示当前导航 boolean
// title     导航的名字 string
// clickOne  是否可以点击一级导航 注意当前参数只能在一级菜单使用 boolean
// keepAlive 切换页面时候是否缓存当前页面 boolean
// role 设置访问权限
const routes = [
  {
    path: "/",
    redirect: "/login",
    meta: {
      hidden: false
      // clickOne: true,
      // title: "登入界面"
    }
  },
  {
    path: "/homepage",
    name: "MainPage",
    component: () => import("../components/Index"),
    redirect: "/homepage",
    meta: {
      hidden: false,
      clickOne: true,
      title: "首页"
    },
    children: [
      {
        path: "/homepage",
        name: "HomePage",
        component: () => import("../components/exhibition/HomePage"),
        meta: {
          needLogin: false,
          hidden: false,
          keepAlive: true,
          title: "首页"
        }
      }
    ]
  },
  {
    path: "/mappage",
    component: () => import("../components/Index"),
    name: "MapPage",
    redirect: "/mappage",
    meta: {
      hidden: false,
      clickOne: true,
      title: "地图界面"
    },
    children: [
      {
        path: "/mappage",
        component: () => import("../components/exhibition/MapPage"),
        name: "MapPage",
        meta: {
          needLogin: false,
          hidden: false,
          keepAlive: true, //是否缓存页面
          title: "地图界面"
        }
      }
    ]
  },
  {
    path: "/datapage",
    component: () => import("../components/Index"),
    name: "DataPage",
    redirect: "/datapage",
    meta: {
      hidden: false,
      clickOne: true,
      title: "数据界面"
    },
    children: [
      {
        path: "/datapage",
        component: () => import("../components/exhibition/DataPage"),
        name: "DataPage",
        meta: {
          needLogin: false,
          hidden: false,
          keepAlive: true,
          title: "数据界面"
        }
      }
    ]
  },
  {
    path: "/user",
    component: () => import("../components/Index"),
    name: "user",
    redirect: "/user",
    meta: {
      hidden: false,
      clickOne: false,
      title: "用户管理"
    },
    children: [
      {
        path: "/user",
        component: () => import("../components/User"),
        name: "user",
        meta: {
          needLogin: false,
          hidden: false,
          title: "退出登录",
          keepAlive: false
        }
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../components/Login"),
    meta: {
      title: "登录"
    }
  }
];
Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes
});

const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err);
};

export default router;
