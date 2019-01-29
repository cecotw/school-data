<template>
  <div class="mb-2">
    <label class="block float-left text-grey-darker text-sm font-bold mb-2 capitalize" :for="field">
      {{field | decamel}}
    </label>
    <input v-model="input" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline" :id="field" :type="type ? type : 'text'" :placeholder="field | decamel | capitalize" :pattern="pattern">
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.component('vInput', {
  props: ['value', 'field', 'type', 'pattern'],
  computed: {
    input: {
      get () { return this.value; },
      set (value) { this.$emit('input', value); }
    }
  }
});
</script>

<style>

</style>
