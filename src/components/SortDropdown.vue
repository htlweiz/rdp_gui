<template>
  <div class="sort-dropdown" style="display: flex; align-items: center;">
    <label for="filter-type" style="margin-right: 10px; font-weight: bold;">Value Sort:</label>
    <div class="dropdown" style="position: relative;">
      <select v-model="selectedDirection" style="padding: 5px; border: 1px solid #ccc; border-radius: 4px; background-color: #f7f7f7; color: #333; cursor: pointer;">
        <option value="asc">ascending</option>
        <option value="desc">descending</option>
      </select>
    </div>
    <button @click="sortByDirection" style="background-color: #007BFF; color: #fff; border: none; border-radius: 4px; padding: 8px 16px; font-weight: bold; cursor: pointer;">
      Sort
    </button>
  </div>
</template>



<script>
export default {
  data() {
    return {
      selectedDirection: 'asc', // Standardwert für die Sortierrichtung
    };
  },
  methods: {
    sortByDirection() {
      this.$emit('sort', this.selectedDirection);
    },
  },
};
</script>