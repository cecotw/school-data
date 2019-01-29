<template>
  <v-table v-model="schools" :columns="['school_name', 'city', 'state', 'zip_code']" :includeSelectColumn="true" :includeActionColumn="true" @selectAll="onSelectAllItems($event)" @select="onSelectItem($event)" :isLoading="isLoading">
    <section slot="header">
      <div class="flex">
        <div class="flex-1">
          <h1 class="text-2xl font-black text-left">School Data</h1>
          <p class="text-left">Manage and export data for schools below</p>
        </div>
        <div class="flex-1">
          <v-button class="float-right" color="green" textColor="white" hoverColor="green-dark">Add New School</v-button>
        </div>
      </div>
      <div class="flex mt-3 mb-3">
        <div class="flex-1">
          <v-button class="float-left" color="white" textColor="grey-darker" borderColor="grey" hoverColor="grey-dark" hoverTextColor="white">
            <i class="fas fa-filter"></i>
          </v-button>
        </div>
        <div class="flex-1">
          <v-button class="float-right" color="white" textColor="grey-darker" borderColor="grey" hoverColor="grey-dark" hoverTextColor="white">
            <i class="fas fa-file-export"></i>
          </v-button>
          <v-button class="float-right mr-3" color="white" textColor="grey-darker" borderColor="grey" hoverColor="grey-dark" hoverTextColor="white" @click="onDeleteSelectedItems()">
            <i class="far fa-trash-alt"></i>
          </v-button>
          <span class="flex float-right text-blue-light mr-3 mt-3 text-sm font-bold" v-if="selectedCount > 0">{{selectedCount}} selected</span>
        </div>
      </div>
    </section>
  </v-table>
</template>

<script>
export default {
  async created() {
    this.isLoading = true;
    await this.$store.dispatch('getSchools');
    this.isLoading = false;
  },
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
    },
    async onDeleteSelectedItems() {
      this.isLoading = true;
      let itemIdsToRemove = this.schools.filter(school => {
        return school.isSelected;
      }).map(i => i.id);
      await Promise.all(itemIdsToRemove.map(itemId => {
        return this.onDeleteItem(itemId)
      }));
      this.isLoading = false;
    },
    async onDeleteItem(itemId) {
      await this.$store.dispatch('removeSchool', itemId);
    }
  },
  computed: {
    schools: {
      get () {
        if (!this.$store.state.schools) { return; }
        return this.$store.state.schools.map(s => {
          return { ...s, school_name: s.name };
        });
      },
      set (value) {
        this.$store.commit('setSchools', value);
      }
    },
    selectedCount() {
      let count = 0;
      if (!this.schools) { return count; }
      this.schools.forEach(school => {
        if (school.isSelected) {
          count++;
        }
      });
      return count;
    }
  },
  data() {
    return {
      isLoading: null
    };
  }
}
</script>

<style>

</style>
