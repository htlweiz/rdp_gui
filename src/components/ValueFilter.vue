<template>
    <div>
      <label for="lower-value">Lower Value:</label>
      <input type="number" id="lower-value" v-model="lowerValue" @change="updateFilter">
  
      <label for="upper-value">Upper Value:</label>
      <input type="number" id="upper-value" v-model="upperValue" @change="updateFilter">
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        lowerValue: '',
        upperValue: ''
      }
    },
    methods: {
      updateFilter() {
        this.$emit('updateFilter', { lowerValue: this.lowerValue, upperValue: this.upperValue });
      }
    }
  }
  </script>
  