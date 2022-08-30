<template>
  <div id="app">
    <!-- 路由视图容器 -->
    <router-view />
  </div>
</template>

<script>
//ES6 的语法，将这个组件整体导出，使用 import 导入组件
export default {
  name: "App"
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
