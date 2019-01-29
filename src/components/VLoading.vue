<template>
  <i class="fas fa-spinner fa-spin text-blue-light" :class="[`fa-${size || 3}x`]"></i>
</template>

<script>
import Vue from 'vue';

export default Vue.component('vLoading', {
  props: ['size']
});
</script>
