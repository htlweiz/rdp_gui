<template>
    <div>
      <label for="type">Type:</label>
      <select id="type" v-model="selectedType" @change="updateFilter">
        <option disabled value="">Please select one</option>
        <option>All Types</option>
        <option v-for="type in types" :key="type.id" :value="type.id">{{ type.type_name }}</option>
      </select>
    </div>
  </template>  
  
  <script>
  export default {
    props: ['types'],
    data() {
      return {
        selectedType: '',
      }
    },
    methods: {
      updateFilter() {
        this.$emit('updateFilter', { type: this.selectedType });
      }
    }
  }
  </script>
  