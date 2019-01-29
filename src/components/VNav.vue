<template>
  <nav class="flex items-center justify-between flex-wrap bg-white p-6">
    <div class="flex items-center flex-no-shrink text-white mr-6"><img src="https://uploads-ssl.webflow.com/5a67cabe625a5800017bc7b8/5a7238473c051a0001204437_logo-horiz-blue%403x.png" width="180" srcset="https://uploads-ssl.webflow.com/5a67cabe625a5800017bc7b8/5a7238473c051a0001204437_logo-horiz-blue%403x-p-500.png 500w, https://uploads-ssl.webflow.com/5a67cabe625a5800017bc7b8/5a7238473c051a0001204437_logo-horiz-blue%403x-p-800.png 800w, https://uploads-ssl.webflow.com/5a67cabe625a5800017bc7b8/5a7238473c051a0001204437_logo-horiz-blue%403x-p-1080.png 1080w, https://uploads-ssl.webflow.com/5a67cabe625a5800017bc7b8/5a7238473c051a0001204437_logo-horiz-blue%403x.png 2104w" sizes="180px" alt="logo" class="image-4">
    </div>
    <div class="w-full block flex-grow lg:flex lg:items-left lg:w-auto">
      <div class="text-sm">
        <router-link v-for="(link, index) in links" :key="index" :to="link.to" class="block mt-4 lg:inline-block lg:mt-0 text-grey-darkest hover:text-blue-light mr-6 ml-6">
          {{link.text}}
        </router-link>
        <a href="https://github.com/cecotw/school-data" target="_blank" class="text-sm px-4 py-2 leading-none border rounded text-grey-darker border-grey-darker no-underline hover:border-blue-light hover:text-blue-light hover:bg-white mt-4 lg:mt-0">Source Code</a>
      </div>
    </div>
  </nav>
</template>

<script>
import Vue from 'vue';

export default Vue.component('vNav', {
  props: ['links']
});
</script>
