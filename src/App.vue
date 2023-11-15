<script setup lang="ts">
import axios from 'axios'
import InputBar from './components/InputBar.vue'
import ValuesDisplay from './components/ValuesDisplay.vue'
import TypesDisplay from './components/TypesDisplay.vue'
import FilterDropdown from './components/FilterDropdown.vue'

import { ValueType } from './scripts/value_type'
import { Value } from './scripts/value'
</script>

<script lang="ts">
interface Filter {
  start?: string;
  end?: string;
  type?: string;
  lowerValue?: string;
  upperValue?: string; 
}

export default {
  data() {
    return {
      values: new Array<Value>(),
      value_types: new Array<ValueType>(),
      filter_start : '',
      filter_end : '',
      filter_type : '',
      filter_lowerValue: '',
      filter_upperValue: '',
    }
  },
  mounted() {
    this.get_types()
    this.get_values().then((data) => {
      this.values = data
    })
  },
  methods: {
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
    updateFilter(filter: Filter) {
      if (filter.start && filter.end) {
        // Set default values for start and end dates
        let startDate = filter.start ? new Date(filter.start).getTime() / 1000 : new Date(0).getTime() / 1000;
        let endDate = filter.end ? new Date(filter.end).getTime() / 1000 : new Date().getTime() / 1000; 

        this.filter_start = startDate.toString();
        this.filter_end = endDate.toString();
      }

      if (filter.type !== null && filter.type !== undefined) {
        this.filter_type = filter.type;
      }

      if (filter.lowerValue !== null && filter.lowerValue !== undefined) {
        this.filter_lowerValue = filter.lowerValue;
      }

      if (filter.upperValue !== null && filter.upperValue !== undefined) {
        this.filter_upperValue = filter.upperValue;
      }

      this.get_values().then((result) => {
        this.values = result;
        console.log(result)
      });
    },
    resetFilters() {
      this.filter_start = '';
      this.filter_end = '';
      this.filter_type = '';
      this.get_values().then((result) => {
        this.values = result;
      });
    },
    update_search(args: string[]) {
      console.log('New search arguemnts', args)
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
        const url = '/api/value/'
        var params : { [key: string]: string } = {}
        if (this.filter_type != '') {
          params['type_id'] = this.filter_type
        }
        if (this.filter_end != '') {
          params['end'] = this.filter_end
        }
        if (this.filter_start != '') {
          params['start'] = this.filter_start
        }
        console.log('Trying to get url', url)
        axios
          .get(url, { params: params })
          .then((result) => {
            let values: Value[] = result.data;

            if (this.filter_lowerValue != '') {
              let lowerValue = Number(this.filter_lowerValue);
              values = values.filter((value: Value) => value.value >= lowerValue);
            }

            if (this.filter_upperValue != '') {
              let upperValue = Number(this.filter_upperValue);
              values = values.filter((value: Value) => value.value <= upperValue);
            }

            accept(values);
          })
          .catch((error) => {
            console.error(error)
            reject(error)
          })
      })
      return promise
    }
  }
}
</script>

<template>
  <div class="container p-1">
    <h1 class="row">RDP</h1>
    <InputBar @search="update_search" />
    <FilterDropdown :types="value_types" @updateFilter="updateFilter" @resetFilters="resetFilters" />
    <DateFilter @updateFilter="updateFilter" />
    <TypeFilter :types="value_types" @updateFilter="updateFilter" />
    <ValueFilter @updateFilter="updateFilter" />
    <TypesDisplay :value_types="value_types" @update_type="get_types" />
    <ValuesDisplay :values="values" :value_types="value_types" />
  </div>
</template>
