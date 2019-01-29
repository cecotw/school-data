<template>
  <section>
    <slot name="header"/>
    <v-loading v-if="isLoading"></v-loading>
    <div class="border border-grey rounded" v-else-if="displayColumns.length > 0 && value">
      <table class="w-full text-sm">
        <thead>
          <tr class="shadow font-bold">
            <th v-if="includeSelectColumn" class="capitalize border-b border-r border-grey border-r- p-3 text-center cursor-pointer" @click="selectAllRows()">
              <i class="fas fa-check-square text-blue-light" v-if="selectAll"></i>
              <i class="far fa-square" v-else></i>
            </th>
            <th class="capitalize border-b border-r border-grey p-3 text-left" v-for="(column, index) in displayColumns" :key="index">{{column | deunderscore}}</th>
            <th v-if="includeActionColumn" class="capitalize border-b border-grey p-3 text-center rounded-tr">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in value" :key="item.id" :class="{
            'bg-grey-light': item.isSelected
          }">
            <td v-if="includeSelectColumn" class="p-3 border-t border-r border-grey text-center cursor-pointer" @click="$emit('select', item)">
              <i class="fas fa-check-square text-blue-light" v-if="item.isSelected"></i>
              <i class="far fa-square" v-else></i>
            </td>
            <td v-for="column in displayColumns" class="p-3 border-t border-r border-grey text-left" :key="column.id">
              <slot :name="column" :data="item">{{item[column]}}</slot>
            </td>
            <td v-if="includeActionColumn" class="p-3 relative border-t border-grey text-center cursor-pointer" @click="item.showPopover = !item.showPopover">
              <i class="fas fa-ellipsis-v text-blue-light"></i>
              <a href="javascript:void(0);" class="m-1 text-grey-darker no-underline" @click="$emit('editItem', item)">Edit</a>
              <a href="javascript:void(0);" class="m-1 text-grey-darker no-underline" @click="$emit('removeItem', item)">Delete</a>
              <!-- TODO shove in popover and build working popover -->
              <!-- <v-popover :show="item.showPopover">
              </v-popover> -->
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

/**
 * dynamically builds out a CRUD table based on the data props of its model
 */
export default Vue.component('vTable', {
  props: {
    value: Array,
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
    },
    isLoading: Boolean
  },
  methods: {
    /**
     * enables developers to set an order to the way the columns are displayed
     */
    sortColumns(columns, sortingArr) {
      let sortableColumns = columns.slice().filter(r => sortingArr.includes(r));
      sortableColumns.sort(function(a, b) {
        return sortingArr.indexOf(a) - sortingArr.indexOf(b);
      });
      let nonSortableColumns = columns.slice().filter(r => !sortingArr.includes(r));
      return sortableColumns.concat(nonSortableColumns);
    },
    /**
     * emits event that all rows have been selected
     */
    selectAllRows() {
      this.selectAll = !this.selectAll;
      this.$emit('selectAll', this.selectAll ? this.value : []);
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
  },
  data() {
    return {
      selectAll: false
    };
  }
});
</script>

<style>

</style>
