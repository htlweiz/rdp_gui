<template>
    <div class="filter-container">
      <select v-model="selectedSort" @change="updateSort" class="form-select">
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedSort: 'asc'
      };
    },
    methods: {
      updateSort() {
        this.$emit('sort', this.selectedSort);
      }
    }
  };
  </script>
  
  <style scoped>
  .filter-container {
    margin-top: 10px;
  }
  
  /* Apply styles for the select element */
  .form-select {
    width: 150px;
    margin-right: 10px;
  }
  </style>
  