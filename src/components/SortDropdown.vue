<template>
  <div class="filter-container">
    <select v-model="selectedSort" @change="updateSort" class="form-select">
      <option value="">None (Reset)</option>
      <option value="asc">Ascending</option>
      <option value="desc">Descending</option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedSort: ''
    };
  },
  methods: {
    updateSort() {
      if (this.selectedSort === "") {
        // If the user selects "None (Reset)," reset the sorting
        this.selectedSort = ""; // Set to an empty string for unsorted
      }
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
