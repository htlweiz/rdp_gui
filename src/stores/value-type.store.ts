import axios from 'axios'

import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ValueType } from '@/scripts/value_type'

export const useValueTypeStore = defineStore('valueType', () => {
  const valueTypes = ref<ValueType[]>([])
  const getTypeId = (type_name: string) => {
    var return_value = ''
    for (var i = 0; i < valueTypes.value.length; i++) {
      if (valueTypes.value[i].type_name.toUpperCase() == type_name.toUpperCase()) {
        return_value = '' + valueTypes.value[i].id
        console.log('Found matching type', valueTypes.value[i])
      }
    }
    return return_value
  }
  const updateValueTypes = () => {
    axios
      .get('/api/type/')
      .then((result) => {
        valueTypes.value = result.data
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return { valueTypes, getTypeId, updateValueTypes }
})
