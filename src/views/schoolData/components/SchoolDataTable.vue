<template>
  <v-table v-model="schools" :columns="['school_name', 'city', 'state', 'zip_code']" :includeSelectColumn="true" :includeActionColumn="true" @selectAll="onSelectAllItems($event)" @select="onSelectItem($event)">
    <div class="flex" slot="header">
      <div class="flex-1">
        <h1 class="text-2xl font-black text-left">School Data</h1>
        <p class="text-left">Manage and export data for schools below</p>
      </div>
      <div class="flex-1">
        <v-button class="float-right">Add New School</v-button>
      </div>
    </div>
  </v-table>
</template>

<script>
export default {
  methods: {
    onSelectAllItems(items) {
      let schools = this.schools.map(school => {
        delete school.isSelected;
        items.forEach(item => {
          if (item.id === school.id) {
            school.isSelected = true;
          }
        });
        return school;
      });
      this.schools = schools;
    },
    onSelectItem(item) {
      let schools = this.schools.map(school => {
        if (item.id === school.id) {
          if(item.isSelected) {
            delete school.isSelected;
          } else {
            school.isSelected = true;
          }
        }
        return school;
      });
      this.schools = schools;
    }
  },
  computed: {
    schools: {
      get () {
        return this.$store.state.schools.map(s => {
          return { ...s, school_name: s.name };
        });
      },
      set (value) {
        this.$store.commit('setSchools', value);
      }
    }
  }
}
</script>

<style>

</style>
