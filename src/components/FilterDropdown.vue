<template>
  <div class="filter-container">
    <select v-model="selectedType" @change="updateFilter" class="form-select">
      <option value="">All Types</option>
      <option v-for="type in types" :key="type.id" :value="type.id">{{ type.type_name }}</option>
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
    updateFilter() {
      this.$emit('filter', this.selectedType);
    }
  }
};
</script>

<style scoped>
.filter-container {
  margin-top: 10px; /* Adjust the margin as needed */
}

/* Apply styles for the select element */
.form-select {
  width: 150px; /* Adjust the width as needed */
}
</style>
