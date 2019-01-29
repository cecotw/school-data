<template>
  <section>
    <slot name="header"/>
    <div class="border border-grey rounded mt-5" v-if="displayColumns.length > 0 && value">
      <table class="w-full text-sm">
        <thead>
          <tr class="shadow font-bold">
            <th v-if="includeSelectColumn" class="capitalize border-b border-r border-grey border-r- p-3 text-center">Edit</th>
            <th class="capitalize border-b border-r border-grey p-3 text-left" v-for="(column, index) in displayColumns" :key="index">{{column | deunderscore}}</th>
            <th v-if="includeActionColumn" class="capitalize border-b border-grey p-3 text-center rounded-tr">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in value" :key="item.id">
            <td v-if="includeSelectColumn" class="p-3 border-t border-r border-grey text-left" @click="$emit('editItem', item)">
              <i class="fas fa-edit has-text-warning"></i>
            </td>
            <td v-for="column in displayColumns" class="p-3 border-t border-r border-grey text-left" :key="column.id">
              <slot :name="column" :data="item">{{item[column]}}</slot>
            </td>
            <td v-if="includeActionColumn" class="p-3 border-t border-grey text-left" @click="$emit('deleteItem', item)">
              <i class="fas fa-trash has-text-danger"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else class="border border-grey mt-5 p-5 rounded">{{noDataText}}</p>
  </section>
</template>

<script>
import Vue from 'vue';

export default Vue.component('vTable', {
  props: {
    value: Array,
    title: String,
    columns: Array,
    columnsOrder: Array,
    includeSelectColumn: {
      type: Boolean,
      default: false
    },
    includeActionColumn: {
      type: Boolean,
      default: false
    },
    noDataText: {
      type: String,
      default: 'There are no items in this dataset.'
    }
  },
  methods: {
    sortColumns(columns, sortingArr) {
      let sortableColumns = columns.slice().filter(r => sortingArr.includes(r));
      sortableColumns.sort(function(a, b){
        return sortingArr.indexOf(a) - sortingArr.indexOf(b);
      });
      let nonSortableColumns = columns.slice().filter(r => !sortingArr.includes(r))
      return sortableColumns.concat(nonSortableColumns);
    }
  },
  computed: {
    displayColumns () {
      let columns = [];
      if (this.columns) {
        columns = this.columns;
      } else if (this.value && this.value.length > 0) {
        columns = Object.keys(this.value[0]);
      }
      if (this.columnsOrder) {
        columns = this.sortColumns(columns, this.columnsOrder);
      }
      return columns;
    }
  }
});
</script>

<style>

</style>
