<script lang="ts">
import axios from 'axios'

export default {
  data() {
    return {
      deviceName: '',
      deviceDesc: '',
      roomId: null
    }
  },
  methods: {
    add_device() {
      if (!this.deviceName.trim() || !this.deviceDesc.trim() || this.roomId === null) {
        window.alert('Please fill in all fields!')
      }
      axios
        .post('/api/device/', null, {
          params: {
            device_name: this.deviceName,
            device_desc: this.deviceDesc,
            room_id: this.roomId
          }
        })
        .then((result) => {
          console.log(result)
        })
        .catch((error) => {
          console.error(error)
        })
      ;(this.deviceName = ''), (this.deviceDesc = ''), (this.roomId = null)
    }
  }
}
</script>

<template>
  <div class="d-flex flex-row align-items-start mt-1">
    <input
      class="flex-grow-1 bg-secondary me-1 mt-1 form-control"
      v-model="deviceName"
      placeholder="Device name"
      style="max-width: 25%"
    />
    <input
      class="flex-grow-1 bg-secondary me-1 mt-1 form-control"
      v-model="deviceDesc"
      placeholder="Device description"
      style="max-width: 25%"
    />
    <input
      class="flex-grow-1 bg-secondary me-1 mt-1 form-control"
      v-model.number="roomId"
      type="number"
      placeholder="Room ID"
      style="max-width: 25%"
    />
    <button
      class="btn text-center"
      @click="add_device"
      style="width: 50px; font-size: x-large; margin-top: -5px"
    >
      +
    </button>
  </div>
</template>
