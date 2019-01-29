<template>
  <button @click="$emit('click')" class="py-2 px-2 rounded" :class="{
    [`bg-${color}`]: color,
    [`border border-${borderColor}`]: borderColor,
    [`text-${textColor}`]: textColor,
    [`hover:bg-${hoverColor}`]: hoverColor,
    [`hover:text-${hoverTextColor}`]: hoverTextColor
  }">
    <slot/>
  </button>
</template>

<script>
import Vue from 'vue';
export default Vue.component('vButton', {
  props: ['color', 'textColor', 'hoverColor', 'borderColor', 'hoverTextColor']
});
</script>

<style>

</style>
