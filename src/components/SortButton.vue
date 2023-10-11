<template>
    <div class="row bg-primary mb-2">
        <label class="bg-primary" witdh="100%" for="filter-type">Sort from high to low or low to high:</label>
        <button @click="sortByDirection">{{ label }}</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      label: String,
      direction: String,
    },
    methods: {
      sortByDirection() {
        this.$emit('sort', this.direction);
      },
    },
  };
  </script>
