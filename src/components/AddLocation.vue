<script lang="ts">
import axios from 'axios'

export default {
  data() {
    return {
      location: ''
    }
  },
  methods: {
    add_location() {
      if (!this.location.trim()) {
        window.alert('Please fill in all fields!')
      }
      axios
        .post('/api/location/', null, {
          params: {
            location: this.location
          }
        })
        .then((result) => {
          console.log(result)
        })
        .catch((error) => {
          console.error(error)
        })
      this.location = ''
    }
  }
}
</script>

<template>
  <div class="d-flex flex-row align-items-start mt-1">
    <input
      class="flex-grow-1 bg-secondary me-1 mt-1 form-control"
      v-model="location"
      placeholder="location"
      style="max-width: 25%"
    />
    <button
      class="btn text-center"
      @click="add_location"
      style="width: 50px; font-size: x-large; margin-top: -5px"
    >
      +
    </button>
  </div>
</template>
