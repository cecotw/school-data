<template>
  <section>
    <slot name="header"/>
    <div class="table-wrapper m-b-md" v-if="displayColumns.length > 0 && value">
      <table class="table is-striped is-bordered is-fullwidth">
        <thead>
          <tr>
            <!-- <th v-if="includeEdit" class="has-text-white has-background-dark is-capitalized has-text-centered">Edit</th> -->
            <th class="has-text-white has-background-dark is-capitalized" v-for="(column, index) in displayColumns" :key="index">{{column | decamel}}</th>
            <th v-if="includeDelete" class="has-text-white has-background-dark is-capitalized has-text-centered">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in value" :key="item.id">
            <td v-if="includeEdit" class="is-clickable has-text-centered" @click="$emit('editItem', item)">
              <i class="fas fa-edit has-text-warning"></i>
            </td>
            <td v-for="column in displayColumns" :key="column.id">
              <slot :name="column" :data="item">{{item[column]}}</slot>
            </td>
            <td v-if="includeDelete" class="is-clickable has-text-centered" @click="$emit('deleteItem', item)">
              <i class="fas fa-trash has-text-danger"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else class="help is-size-6">{{noDataText}}</p>
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
    includeAdd: {
      type: Boolean,
      default: false
    },
    includeEdit: {
      type: Boolean,
      default: false
    },
    includeDelete: {
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
