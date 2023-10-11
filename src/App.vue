<template>
  <div class="container p-1">
    <h1 class="row">RDP</h1>
    <button @click="toggleFiltersVisibility">{{ showFilters ? 'Hide Filters' : 'Show Filters' }}</button>
    <div v-if="showFilters">
      <FilterDropdown :types="value_types" @filter="updateFilter" />
      <SortDropdown @sort="updateSort" />
      <DatePicker @filter="updateDateFilter" />
    </div>
    <InputBar @search="update_search" />
    <TypesDisplay :value_types="value_types" @update_type="get_types" />
    <ValuesDisplay :values="values" :value_types="value_types" />
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import InputBar from './components/InputBar.vue'
import ValuesDisplay from './components/ValuesDisplay.vue'
import TypesDisplay from './components/TypesDisplay.vue'
import FilterDropdown from './components/FilterDropdown.vue'
import SortDropdown from './components/SortDropdown.vue'
import DatePicker from './components/DatePicker.vue'
import { ValueType } from './scripts/value_type'
import { Value } from './scripts/value'
import { ref } from 'vue'

const showFilters = ref(false); // Initialize showFilters as a reactive variable

const toggleFiltersVisibility = () => {
  showFilters.value = !showFilters.value;
};
</script>



<script lang="ts">
export default {
  data() {
    return {
      values: new Array<Value>(),
      value_types: new Array<ValueType>(),
      filter_start: '',
      filter_end: '',
      filter_type: '', // <--- The missing comma
      filter: '',
      sortOrder: 'asc' // 'asc' für aufsteigend, 'desc' für absteigend
    }
  },

  mounted() {
    this.get_types();
    this.get_values().then((data) => {
      this.values = data;
      this.sortValues(); // Sortiere die Werte nach dem Laden
    });
  },
  methods: {
    toggleFiltersVisibility() {
      showFilters.value = !showFilters.value;
    },
    getTypeId(type_name: string) {
      var return_value = ''
      for (var i = 0; i < this.value_types.length; i++) {
        if (this.value_types[i].type_name.toUpperCase() == type_name.toUpperCase()) {
          return_value = '' + this.value_types[i].id
          console.log('Found matching type', this.value_types[i])
        }
      }
      return return_value
    },
    update_search(args: string[]) {
      console.log('New search arguments', args)
      this.filter_end=''
      this.filter_start=''
      this.filter_type=''
      for (var i = 0; i < args.length; i++) {
        const command = args[i]
        console.log('handling command', command)
        const command_and_args = args[i].split(':')
        if (command_and_args.length == 2) {
          const key = command_and_args[0]
          const value = command_and_args[1]
          if (key == 'type') {
            this.filter_type = this.getTypeId(value)
            console.log('Update typeid', this.filter_type)
            continue
          } else if (key == 'start') {
            this.filter_start = value
            continue
          } else if (key == 'end') {
            this.filter_end = value
            continue
          }
        }
        console.log('Ignoring command', command)
      }
      this.get_values().then((result) => {
        this.values = result
      })
    },
    get_types() {
      axios
        .get('/api/type/')
        .then((result) => {
          this.value_types = result.data
        })
        .catch((error) => {
          console.error(error)
        })
    },
    get_values() {
      const promise = new Promise<Value[]>((accept, reject) => {
        const url = '/api/value/';
        var params: { [key: string]: string } = {};
        if (this.filter !== '') {
          params['type_id'] = this.filter;
        }
        if (this.sortOrder === 'asc') {
          params['sort'] = 'asc';
        } else if (this.sortOrder === 'desc') {
          params['sort'] = 'desc';
        }
        if (this.filter_type != '') {
          params['type_id'] = this.filter_type;
        }
        if (this.filter_end != '') {
          params['end'] = this.filter_end;
        }
        if (this.filter_start != '') {
          params['start'] = this.filter_start;
        }
        console.log('Trying to get URL', url);
        axios
          .get(url, { params: params })
          .then((result) => {
            accept(result.data);
          })
          .catch((error) => {
            console.error(error);
            reject(error);
          });
      });
      return promise;
    },

    updateFilter(selectedType) {
      this.filter = selectedType;
      this.get_values().then((result) => {
        this.values = result;
      });
    },
    updateSort(selectedSort) {
      this.sortOrder = selectedSort;
      this.sortValues(); // Sortiere die Werte
    },
    sortValues() {
      if (this.sortOrder === 'asc') {
        this.values.sort((a, b) => a.value - b.value); // Aufsteigende Sortierung
      } else if (this.sortOrder === 'desc') {
        this.values.sort((a, b) => b.value - a.value); // Absteigende Sortierung
      }
    },
    updateDateFilter(selectedDateRange) {
      this.filter_start = selectedDateRange.start;
      this.filter_end = selectedDateRange.end;
      this.get_values().then((result) => {
        this.values = result;
      });
    },
  }
}
</script>
