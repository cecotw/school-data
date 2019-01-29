<template>
  <div v-if="show" class="popover py-3 shadow absolute border border-grey bg-white w-full max-w-md m-auto flex-col flex rounded">
    <slot></slot>
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.component('vPopover', {
  props: ['show']
});
</script>

<style scoped lang="scss">
.popover {
  bottom: -50px;
  left: -50px;
}
</style>
