<template>
    <div class="filter-container">
      <div class="input-group">
        <input
          type="date"
          v-model="startDate"
          @change="updateFilter"
          class="form-control"
        />
        <input
          type="date"
          v-model="endDate"
          @change="updateFilter"
          class="form-control"
        />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        startDate: '',
        endDate: ''
      };
    },
    methods: {
      updateFilter() {
        // Convert selected dates to Unix timestamps
        const startTimestamp = new Date(this.startDate).getTime() / 1000;
        const endTimestamp = new Date(this.endDate).getTime() / 1000;
  
        this.$emit('filter', {
          start: startTimestamp,
          end: endTimestamp
        });
      }
    }
  };
  </script>
  
  <style scoped>
  .filter-container {
    margin-top: 10px; /* Adjust the margin as needed */
  }
  
  /* Apply styles for the input elements */
  .form-control {
    width: 150px; /* Adjust the width as needed */
    margin-right: 10px; /* Adjust the margin as needed */
  }
  </style>
  