<template>
  <div id="app" class="bg-grey-lighter h-screen">
    <v-nav :links="[
      { text: 'School Data', to: '/' },
      { text: 'About', to: '/about' }
    ]"></v-nav>
    <router-view class="mt-8"/>
  </div>
</template>

<script>
export default {
  /**
   * Initializes the API service globally for the app
   */
  created() {
    this.$store.dispatch('initApi');
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
