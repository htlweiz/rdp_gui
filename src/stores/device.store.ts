import axios from 'axios'

import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Device } from '@/scripts/device'
import type { UrlParams } from '@/types/url-paras.type'

export const useDeviceStore = defineStore('device', () => {
  const devices = ref<Device[]>([])
  const updateDevices = (params: UrlParams = {}) => {
    const url = '/api/device/'
    console.log('Trying to get url', url)
    axios
      .get(url, { params })
      .then((result) => {
        devices.value = result.data
      })
      .catch((error) => {
        console.error(error)
      })
  }
  const getDeviceId = (deviceName: string) => {
    var return_value = ''
    for (var i = 0; i < devices.value.length; i++) {
      if (devices.value[i].name.toUpperCase() == deviceName.toUpperCase()) {
        return_value = '' + devices.value[i].id
        console.log('Found matching device', devices.value[i])
      }
    }
    return return_value
  }

  return { devices, updateDevices, getDeviceId }
})
