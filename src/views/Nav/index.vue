<template>
  <el-menu default-active="/" :router="true" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
    <el-menu-item v-for="(item, index) in nav" :key="index" :index="item.index">{{item.name}}</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data () {
    return {
      nav: [{
        index: '/',
        name: '主页'
      }, {
        index: '/about',
        name: 'about'
      }]
    }
  }
}
</script>

<style>
</style>
