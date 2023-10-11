<template>
    <button @click="sortByDirection">{{ label }}</button>
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
