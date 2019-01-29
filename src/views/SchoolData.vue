<template>
  <div class="home container mx-auto bg-white p-5">
    <v-table>
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
  </div>
</template>

<script>
export default {
  name: 'home'
}
</script>
