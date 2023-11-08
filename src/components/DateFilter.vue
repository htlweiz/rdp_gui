<template>
  <div>
    <label for="start-date">Start Date:</label>
    <input type="date" id="start-date" v-model="startDate" @change="updateFilter">

    <label for="end-date">End Date:</label>
    <input type="date" id="end-date" v-model="endDate" @change="updateFilter">
  </div>
</template>

<script>
export default {
  data() {
    return {
      startDate: '',
      endDate: ''
    }
  },
  methods: {
    updateFilter() {
      this.$emit('updateFilter', { start: this.startDate, end: this.endDate });
    }
  }
}
</script>
