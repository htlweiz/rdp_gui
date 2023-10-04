<template>
  <div class="filter-dropdown">
    <label for="filter-type">Type Filter:</label>
    <select v-model="selectedType">
      <option value="">all</option>
      <option v-for="type in types" :value="type.id">{{ type.type_name }}</option>
    </select>
    <button @click="applyFilter">Filter</button> <!-- Hinzugefügter Button -->
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
