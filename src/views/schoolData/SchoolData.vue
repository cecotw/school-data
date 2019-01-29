<template>
  <div class="home container mx-auto bg-white p-10">
    <school-data-table/>
  </div>
</template>

<script>
import SchoolDataTable from './components/SchoolDataTable';

export default {
  components: {
    SchoolDataTable
  }
};
</script>
