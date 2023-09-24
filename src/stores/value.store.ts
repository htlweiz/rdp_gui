import axios from 'axios'

import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Value } from '@/scripts/value'
import type { UrlParams } from '@/types/url-paras.type'

export const useValueStore = defineStore('value', () => {
  const values = ref<Value[]>([])
  const updateValues = (params: UrlParams = {}) => {
    const url = '/api/value/'
    console.log('Trying to get url', url)
    axios
      .get(url, { params })
      .then((result) => {
        values.value = result.data
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return { values, updateValues }
})
