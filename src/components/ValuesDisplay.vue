<script lang="ts">
import { Value } from '@/scripts/value'

export default {
  props: ['values', 'value_types', 'devices', 'rooms', 'locations'],
  setup(props) {
    console.log(props.values)
  },
  emits: ['rename'],
  methods: {
    getTypeName(value: Value) {
      for (var i = 0; i < this.value_types.length; i++) {
        if (this.value_types[i].id == value.value_type_id) {
          return this.value_types[i].type_name
        }
      }
      return 'XXX'
    },
    getUnit(value: Value) {
      for (var i = 0; i < this.value_types.length; i++) {
        if (this.value_types[i].id == value.value_type_id) {
          return this.value_types[i].type_unit
        }
      }
      return 'XXX'
    },
    getCurrentTimeStamp(value: Value) {
      const time = new Date(value.time * 1000).toUTCString()
      return time
    },
    getDevice(value: Value) {
      for (var i = 0; i < this.devices.length; i++) {
        if (this.devices[i].id == value.device_id) {
          return this.devices[i].id
        }
      }
      return 'XXX'
    },
    getRoom() {
      for (var i = 0; i < this.rooms.length; i++) {
        return this.rooms[i].id
      }
      return 'XXX'
    },

    getLocation() {
      for (var i = 0; i < this.locations.length; i++) {
        return this.locations[i].id
      }
      return 'XXX'
    }
  }
}
</script>

<template>
  <div class="row bg-primary mt-2 mb-1">
    <div
      class="col-1"
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      data-bs-title="Tooltip on top"
    >
      time
    </div>
    <div class="col-1">type</div>
    <div class="col">value</div>
    <div class="col">device</div>
    <div class="col">room</div>
    <div class="col">location</div>
  </div>
  <div class="row bg-secondary rounded mt-1" v-for="value in values" :key="value">
    <div class="col-1">{{ getCurrentTimeStamp(value) }}</div>
    <div class="col-1">
      {{ getTypeName(value) }}
    </div>
    <div class="col">{{ value.value.toFixed(2) }} {{ getUnit(value) }}</div>
    <div class="col">{{ getDevice(value) }}</div>
    <div class="col">{{ getRoom() }}</div>
    <div class="col">
      {{ getLocation() }}
    </div>
  </div>
</template>
