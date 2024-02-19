<script lang="ts">
import axios from 'axios'

export default {
  data() {
    return {
      input: '',
      id: null,
      selectedOption: '',
      options: ['Device', 'Room', 'Location']
    }
  },
  methods: {
    update_type() {
      switch (this.selectedOption) {
        case 'Device':
          this.updateDevice()
          break
        case 'Room':
          this.updateRoom()
          break
        case 'Location':
          this.updateLocation()
          break
        default:
          console.error('No valid option selected')
      }
    },
    updateDevice() {
      if (this.id === null || !this.input.trim()) {
        window.alert('Please fill in all fields!')
      }
      axios
        .patch(`/api/device/${this.id}/`, null, {
          params: { device_name: this.input }
        })
        .then((result) => {
          console.log(result)
        })
        .catch((error) => {
          console.error(error)
        })
      ;(this.id = null), (this.input = '')
    },

    updateRoom() {
      if (this.id === null || !this.input.trim()) {
        window.alert('Please fill in all fields!')
      }
      axios
        .patch(`/api/room/${this.id}/`, null, {
          params: { room_name: this.input }
        })
        .then((result) => {
          console.log(result)
        })
        .catch((error) => {
          console.error(error)
        })
      ;(this.id = null), (this.input = '')
    },
    updateLocation() {
      if (this.id === null || !this.input.trim()) {
        window.alert('Please fill in all fields!')
      }
      axios
        .patch(`/api/location/${this.id}/`, null, {
          params: { location: this.input }
        })
        .then((result) => {
          console.log(result)
        })
        .catch((error) => {
          console.error(error)
        })
      ;(this.id = null), (this.input = '')
    }
  }
}
</script>

<template>
  <div class="d-flex flex-row align-items-start mt-1">
    <select
      class="flex-grow-1 bg-secondary me-1 mt-1 form-control"
      style="max-width: 25%"
      v-model="selectedOption"
    >
      <option disabled value="">Please select one</option>
      <option v-for="option in options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
    <input
      class="flex-grow-1 bg-secondary me-1 mt-1 form-control"
      style="max-width: 25%"
      v-model="id"
      placeholder="ID"
    />
    <input
      class="flex-grow-1 bg-secondary me-1 mt-1 form-control"
      v-model="input"
      placeholder="new name"
      style="max-width: 25%"
    />
    <button
      class="btn text-center"
      style="width: 50px; font-size: x-large; margin-top: -5px"
      v-on:click="update_type()"
    >
      +
    </button>
  </div>
</template>
