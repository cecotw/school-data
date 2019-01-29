<template>
  <section>
    <v-table v-model="schools" :columns="['school_name', 'city', 'state', 'zip_code']" :includeSelectColumn="true" :includeActionColumn="true" @selectAll="onSelectAllItems($event)" @select="onSelectItem($event)" @editItem="onEditItem($event)" @removeItem="onDeleteItem($event.id)" :isLoading="isLoading">
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
            <!-- TODO add UI to sort on specified column, maybe a popover or something -->
            <v-button class="float-left" color="white" textColor="grey-darker" borderColor="grey" hoverColor="grey-dark" hoverTextColor="white" @click="sortRows('name')">
              <i class="fas fa-filter"></i>
            </v-button>
          </div>
          <div class="flex-1">
            <v-button class="float-right" color="white" textColor="grey-darker" borderColor="grey" hoverColor="grey-dark" hoverTextColor="white" @click="downloadCsv()">
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
        {{modalTitle}}
      </section>
      <section>
        <form class="bg-white px-8 pt-6 pb-8 mb-4">
          <!-- TODO input validation and error handling -->
          <v-input field="schoolName" v-model="school.name"></v-input>
          <v-input field="city" v-model="school.city"></v-input>
          <v-input field="state" v-model="school.state"></v-input>
          <v-input field="zip" v-model="school.zip_code"></v-input>
        </form>
      </section>
      <section slot="footer" class="flex">
        <div class="text-sm flex-1 rounded-bl text-grey-darker cursor-pointer py-5 border-t border-r border-grey font-bold hover:bg-grey hover:text-white" @click="showSchoolDataModal = !showSchoolDataModal">Cancel</div>
        <div class="bg-blue-light flex-1 py-5 text-white cursor-pointer hover:bg-blue rounded-br text-sm rounded-bl border-t border-r border-grey font-bold" @click="saveItem()">Save</div>
      </section>
    </v-modal>
  </section>
</template>

<script>
/**
 * School Data Table displays various functionalities associated with
 * the CRUD interface
 */
export default {
  async created() {
    this.isLoading = true;
    await this.$store.dispatch('getSchools');
    this.isLoading = false;
  },
  methods: {
    /**
     * Handles add school click by opening modal
     */
    onAddSchoolClick() {
      this.school = {};
      this.modalTitle = 'Add New School';
      this.showSchoolDataModal = !this.showSchoolDataModal;
    },
    /**
     * Dispacthes event to create or update schools
     */
    async saveItem() {
      this.isLoading = true;
      this.showSchoolDataModal = false;
      if (this.school.id) {
        await this.$store.dispatch('updateSchool', this.school);
      } else {
        await this.$store.dispatch('createSchool', this.school);
      }
      this.isLoading = false;
    },
    /**
     * Handles select all event by selected or deselecting schools
     */
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
    /**
     * Handles selectedItem event
     */
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
    /**
     * Handles editItem event
     */
    onEditItem(item) {
      this.school = item;
      this.modalTitle = 'Edit School';
      this.showSchoolDataModal = !this.showSchoolDataModal;
    },
    /**
     * Handles deleteItem event
     */
    async onDeleteItem(itemId) {
      this.isLoading = true;
      await this.$store.dispatch('removeSchool', itemId);
      this.isLoading = false;
    },
    /**
     * Handles the deleting of multpile selected items
     */
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
    /**
     * Downloads a the CSV blob from the selected items in the table
     */
    downloadCsv(){
      let selectedSchools = this.schools.filter(school => school.isSelected).map(school => {
        delete school.isSelected;
        delete school.id;
        return school;
      });
      if (!selectedSchools) { return; } // TODO add help message that user needs to select school
      let jsonObject = JSON.stringify(selectedSchools);
      let csv = this.convertToCSV(jsonObject);
      let exportedFilenmae = 'myschools.csv';
      let blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      var link = document.createElement("a");
      var url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", exportedFilenmae);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    /**
     * Converts stringified JSON to a CSV string
     * @param {object} objArray
     */
    convertToCSV(objArray) {
      let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
      let str = '';
      for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
          if (line != '') line += ','
          line += array[i][index];
        }
        str += line + '\r\n';
      }
      return str;
    },
    /**
     * Sorts the rows based on the specified column
     * @param {string} column
     */
    sortRows(column) {
      this.schools = this.$filters.sort(this.schools, column);
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
      modalTitle: 'Add New School',
      school: {}
    };
  }
}
</script>
