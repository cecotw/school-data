<template>
  <nav class="flex items-center justify-between flex-wrap bg-white p-6">
    <div class="flex items-center flex-no-shrink text-white mr-6"><img src="https://uploads-ssl.webflow.com/5a67cabe625a5800017bc7b8/5a7238473c051a0001204437_logo-horiz-blue%403x.png" width="180" srcset="https://uploads-ssl.webflow.com/5a67cabe625a5800017bc7b8/5a7238473c051a0001204437_logo-horiz-blue%403x-p-500.png 500w, https://uploads-ssl.webflow.com/5a67cabe625a5800017bc7b8/5a7238473c051a0001204437_logo-horiz-blue%403x-p-800.png 800w, https://uploads-ssl.webflow.com/5a67cabe625a5800017bc7b8/5a7238473c051a0001204437_logo-horiz-blue%403x-p-1080.png 1080w, https://uploads-ssl.webflow.com/5a67cabe625a5800017bc7b8/5a7238473c051a0001204437_logo-horiz-blue%403x.png 2104w" sizes="180px" alt="" class="image-4">
    </div>
    <div class="block lg:hidden">
      <button class="flex items-center px-3 py-2 border rounded text-grey-lighter border-grey-light hover:text-white hover:border-white">
        <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
      </button>
    </div>
    <div class="w-full block flex-grow lg:flex lg:items-left lg:w-auto">
      <div class="text-sm">
        <router-link to="/" class="block mt-4 lg:inline-block lg:mt-0 text-grey-darkest hover:text-blue-light mr-4">
          School Data
        </router-link>
        <router-link to="about" class="block mt-4 lg:inline-block lg:mt-0 text-grey-darkest hover:text-blue-light mr-4">
          About
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import Vue from 'vue';

export default Vue.component('vNav', {

});
</script>

<style>

</style>
