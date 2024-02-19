<script lang="ts">
import axios from 'axios'

export default {
  data() {
    return {
      room_name: '',
      location_id: null
    }
  },
  methods: {
    add_room() {
      if (!this.room_name.trim() || this.location_id === null) {
        window.alert('Please fill in all fields!')
      }
      axios
        .post('/api/room/', null, {
          params: {
            room_name: this.room_name,
            location_id: this.location_id
          }
        })
        .then((result) => {
          console.log(result)
        })
        .catch((error) => {
          console.error(error)
        })
      ;(this.room_name = ''), (this.location_id = null)
    }
  }
}
</script>

<template>
  <div class="d-flex flex-row align-items-start mt-1">
    <input
      class="flex-grow-1 bg-secondary me-1 mt-1 form-control"
      v-model="room_name"
      placeholder="room name"
      style="max-width: 25%"
    />
    <input
      class="flex-grow-1 bg-secondary me-1 mt-1 form-control"
      v-model.number="location_id"
      type="number"
      placeholder="location id"
      style="max-width: 25%"
    />
    <button
      class="btn text-center"
      @click="add_room"
      style="width: 50px; font-size: x-large; margin-top: -5px"
    >
      +
    </button>
  </div>
</template>
