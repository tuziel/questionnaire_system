<template>
  <div id="app">
    <Nav />

    <div class="wrapper">
      <router-view />
    </div>
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
