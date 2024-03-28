<script lang="ts">
import { Value } from '@/scripts/value'
import { Device } from '@/scripts/device'
import { Room } from '@/scripts/room'
import { Location } from '@/scripts/location'

export default {
  props: ['values', 'devices', 'rooms', 'locations'],
  methods: {
    ascending(values: Array<Value>) {
      values.sort((a, b) => a.time - b.time)
    },
    decending(values: Array<Value>) {
      values.sort((a, b) => b.time - a.time)
    },
    types(values: Array<Value>) {
      values.sort((a, b) => a.value_type_id - b.value_type_id)
    },
    device(values: Array<Value>) {
      values.sort((a, b) => b.device_id - a.device_id)
    },
    room(values: Array<Value>) {
      values.sort((a, b) => {
        const deviceA = this.devices.find((device: Device) => device.id === a.device_id)
        const roomA = this.rooms.find((room: Room) => room.id === deviceA.room_id)

        const deviceB = this.devices.find((device: Device) => device.id === b.device_id)
        const roomB = this.rooms.find((room: Room) => room.id === deviceB.room_id)

        return roomB.id - roomA.id
      })
    },
    location(values: Array<Value>) {
      values.sort((a, b) => {
        const deviceA = this.devices.find((device: Device) => device.id === a.device_id)
        const roomA = this.rooms.find((room: Room) => room.id === deviceA.room_id)
        const locationA = this.locations.find(
          (location: Location) => location.id === roomA.location_id
        )

        const deviceB = this.devices.find((device: Device) => device.id === b.device_id)
        const roomB = this.rooms.find((room: Room) => room.id === deviceB.room_id)
        const locationB = this.locations.find(
          (location: Location) => location.id === roomB.location_id
        )

        return locationB.id - locationA.id
      })
    }
  }
}
</script>

<template>
  <button
    style="margin-left: -11px; margin-right: 5px"
    class="btn text-buttons-text bg-buttons mt-2 p-2"
    @click="ascending(values)"
  >
    Ascending
  </button>
  <button
    style="margin-right: 5px"
    class="btn text-buttons-text bg-buttons mt-2 p-2"
    @click="decending(values)"
  >
    Decending
  </button>
  <button
    style="margin-right: 5px"
    class="btn text-buttons-text bg-buttons mt-2 p-2"
    @click="types(values)"
  >
    Types
  </button>
  <button
    style="margin-right: 5px"
    class="btn text-buttons-text bg-buttons mt-2 p-2"
    @click="device(values)"
  >
    Device
  </button>
  <button
    style="margin-right: 5px"
    class="btn text-buttons-text bg-buttons mt-2 p-2"
    @click="room(values)"
  >
    Room
  </button>
  <button
    style="margin-right: 5px"
    class="btn text-buttons-text bg-buttons mt-2 p-2"
    @click="location(values)"
  >
    Location
  </button>
</template>
