<script lang="ts">
import { Device } from '@/scripts/device'
import axios from 'axios'

export default {
  props: ['deviceProp'],
  data() {
    return {
      editDevice: new Device(),
      changed: false
    }
  },
  mounted() {
    console.log('Mounted with ', this.deviceProp)
    this.editDevice.id = this.deviceProp.id
    this.editDevice.device = this.deviceProp.device
    this.editDevice.name = this.deviceProp.name
  },
  methods: {
    update_changed() {
      this.changed =
        this.deviceProp.device != this.editDevice.device ||
        this.deviceProp.name != this.editDevice.name
      console.log('Changed is now', this.changed)
    },
    update_device() {
      console.log('asd', this.editDevice)
      axios.put('/api/device/' + this.editDevice.id + '/', this.editDevice).then((result) => {
        console.log(result)
        this.$emit('update_device')
      })
    }
  },
  emits: ['update_device']
}
</script>

<template>
  <div class="row rounded mt-1 mb-0 p-0">
    <input
      class="col bg-secondary rounded me-1"
      v-model="editDevice.name"
      v-on:change="update_changed"
    />
    <input
      class="col bg-secondary rounded"
      v-model="editDevice.device"
      v-on:change="update_changed"
    />
    <button
      class="col bg-primary text-end rounded mb-1"
      v-if="changed"
      v-on:click="update_device()"
    >
      submit
    </button>
  </div>
</template>
