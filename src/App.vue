<template>
  <div id="app">
    <Nav></Nav>

    <router-view />
  </div>
</template>

<script>
import Nav from '@/views/Nav'

export default {
  components: {
    Nav
  }
}
</script>

<style lang="scss">
</style>
