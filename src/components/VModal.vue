<template>
  <transition name="modal">
    <div v-if="showModal" @click="$emit('close')" class="modal-background fixed pin z-50 overflow-auto bg-smoke-light flex">
      <div @click.stop.prevent="" class="modal-container relative bg-white w-full max-w-md m-auto flex-col flex rounded">
        <slot name="header"></slot>
        <slot></slot>
        <slot name="footer"></slot>
      </div>
    </div>
  </transition>
</template>

<script>
import Vue from 'vue';

export default Vue.component('vModal', {
  props: ['showModal']
});
</script>

<style lang="scss" scoped>
.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}
.modal-background {
  transition: opacity .3s ease;
}
.modal-container {
  transition: all .3s ease;
}
.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
