<template>
  <div class="filter-dropdown" style="display: flex; align-items: center;">
    <label for="filter-type" style="margin-right: 10px; font-weight: bold;">Type Filter:</label>
    <div class="dropdown" style="position: relative;">
      <select v-model="selectedType" style="padding: 5px; border: 1px solid #ccc; border-radius: 4px; background-color: #f7f7f7; color: #333; cursor: pointer;">
        <option value="">all</option>
        <option v-for="type in types" :value="type.id">{{ type.type_name }}</option>
      </select>
    </div>
    <button @click="applyFilter" style="background-color: #007BFF; color: #fff; border: none; border-radius: 4px; padding: 8px 16px; font-weight: bold; cursor: pointer;">
      Filter
    </button>
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
