<template>
    <div class="filter-dropdown">
      <label for="filter-type">Filter by Type:</label>
      <select v-model="selectedType" @change="applyFilter">
        <option value="">All Types</option>
        <option v-for="type in types" :value="type.id">{{ type.type_name }}</option>
      </select>
    </div>
    </template>
  
  <script>
  export default {
    props: ['types'],
    data() {
      return {
        selectedType: ''
      };
    },
    methods: {
      applyFilter() {
        this.$emit('filter', this.selectedType);
      }
    }
  };
  </script>
  