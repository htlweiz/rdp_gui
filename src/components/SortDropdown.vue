<template>
    <div class="sort-dropdown">
      <label for="sort-order">Sortierreihenfolge:</label>
      <select v-model="selectedSort" @change="applySort">
        <option value="asc">Aufsteigend</option>
        <option value="desc">Absteigend</option>
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
      applySort() {
        this.$emit('sort', this.selectedSort);
      }
    }
  };
  </script>
  