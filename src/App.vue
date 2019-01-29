<template>
  <div id="app" class="bg-grey-lighter h-screen">
    <v-nav></v-nav>
    <router-view class="mt-8"/>
  </div>
</template>

<script>
export default {
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
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
