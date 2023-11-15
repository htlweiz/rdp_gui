<template>
  <div>
    <div class="row bg-primary mt-1">
      <span class="col-2">Filters</span>
      <span class="col text-end" @click="toggleFilters">
        <i class="bi bi-caret-down-fill" title="Show Filters" v-if="filters_hidden"></i>
        <i class="bi bi-caret-up-fill" title="Hide Filters" v-else></i>
      </span>
    </div>
    <div v-if="!filters_hidden">
      <DateFilter @updateFilter="updateFilter" />
      <TypeFilter :types="types" @updateFilter="updateFilter" />
      <ValueFilter @updateFilter="updateFilter" />
      <button @click="$emit('resetFilters')">Reset Filters</button>
    </div>
  </div>
</template>


<script>
import DateFilter from './DateFilter.vue'
import TypeFilter from './TypeFilter.vue'
import ValueFilter from './ValueFilter.vue'

export default {
  props: ['types'],
  data() {
    return {
      filters_hidden: true
    }
  },
  methods: {
    toggleFilters() {
      this.filters_hidden = !this.filters_hidden;
    },
    updateFilter(filter) {
      this.$emit('updateFilter', filter);
    }
  },
  components: {
    DateFilter,
    TypeFilter,
    ValueFilter
  }
}
</script>
