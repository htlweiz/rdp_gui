<script lang="ts">
export default {
  props: ['values', 'devices', 'rooms', 'locations'],
  methods: {
    ascending(values) {
      values.sort((a, b) => a.time - b.time)
    },
    decending(values) {
      values.sort((a, b) => b.time - a.time)
    },
    types(values) {
      values.sort((a, b) => a.value_type_id - b.value_type_id)
    },
    device(values) {
      values.sort((a, b) => b.device_id - a.device_id)
    },
    room(rooms) {
      rooms.sort((a, b) => b.id - a.id)
    },
    location(locations) {
      locations.sort((a, b) => b.id - a.id)
    }
  }
}
</script>

<template>
  <label>Sort</label>
  <button @click="ascending(values)">Ascending</button>
  <button @click="decending(values)">Decending</button>
  <button @click="types(values)">Types</button>
  <button @click="device(values)">Device</button>
  <button @click="room(rooms)">Room</button>
  <button @click="location(locations)">Location</button>
</template>
