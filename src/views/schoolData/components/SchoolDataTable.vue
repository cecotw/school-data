<template>
  <section>
    <v-table v-model="schools" :columns="['school_name', 'city', 'state', 'zip_code']" :includeSelectColumn="true" :includeActionColumn="true" @selectAll="onSelectAllItems($event)" @select="onSelectItem($event)" :isLoading="isLoading">
      <section slot="header">
        <div class="flex">
          <div class="flex-1">
            <h1 class="text-2xl font-black text-left">School Data</h1>
            <p class="text-left">Manage and export data for schools below</p>
          </div>
          <div class="flex-1">
            <v-button @click="onAddSchoolClick()" class="float-right" color="green" textColor="white" hoverColor="green-dark">Add New School</v-button>
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
    <v-modal :showModal="showSchoolDataModal" @close="showSchoolDataModal = false">
      <section slot="header" class="bg-grey text-sm rounded-t pt-2 pb-2 font-bold">
        Add New School
      </section>
      <section>
        <form class="bg-white px-8 pt-6 pb-8 mb-4">
          <v-input field="schoolName" v-model="school.name"></v-input>
          <v-input field="city" v-model="school.city"></v-input>
          <v-input field="state" v-model="school.state"></v-input>
          <v-input field="zip" v-model="school.zip_code"></v-input>
        </form>
      </section>
      <section slot="footer" class="flex">
        <div class="text-sm flex-1 rounded-bl text-grey-darker cursor-pointer py-5 border-t border-r border-grey font-bold hover:bg-grey hover:text-white">Cancel</div>
        <div class="bg-blue-light flex-1 py-5 text-white cursor-pointer hover:bg-blue rounded-br text-sm rounded-bl border-t border-r border-grey font-bold" @click="createItem()">Save</div>
      </section>
    </v-modal>
  </section>
</template>

<script>
export default {
  async created() {
    this.isLoading = true;
    await this.$store.dispatch('getSchools');
    this.isLoading = false;
  },
  methods: {
    onAddSchoolClick() {
      this.school = {};
      this.showSchoolDataModal = !this.showSchoolDataModal;
    },
    async createItem() {
      this.isLoading = true;
      this.showSchoolDataModal = false;
      await this.$store.dispatch('createSchool', this.school);
      this.isLoading = false;
    },
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
      if(!itemIdsToRemove) { return; }
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
      isLoading: null,
      showSchoolDataModal: null,
      school: {}
    };
  }
}
</script>
