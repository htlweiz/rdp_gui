<script lang="ts">
import axios from 'axios';

import SingleDeviceDisplay from './SingleDeviceDisplay.vue';
import SingleTypeDisplay from './SingleTypeDisplay.vue';
import { Device } from '@/scripts/device';
export default {
    props: ['devices'],
    data() {
        return {
            newDevice: new Device(),
            editor_hidden: true
        };
    },
    methods: {
        toggleEditor() {
            this.editor_hidden = !this.editor_hidden;
        },
        add_device() {
          console.log("add device", this.newDevice)
          axios.put("/api/device/0/", this.newDevice)
                .then((result) => {
                    console.log(result)
                    this.$emit("update_device")
                })
        }
    },
    components: { SingleTypeDisplay, SingleDeviceDisplay },
    emits: ['update_device']
}
</script>

<template>
  <div class="row bg-primary mt-1">
    <span class="col-2">Device Editor</span
    ><span class="col text-end" v-on:click="toggleEditor()">
      <i class="bi bi-caret-down-fill" title="Show TypeEditor" v-if="editor_hidden"></i>
      <i class="bi bi-caret-up-fill" title="Hide TypeEditor" v-else></i>
    </span>
  </div>
  <span v-if="!editor_hidden">
    <SingleDeviceDisplay :device-prop="device" v-for="device in devices" :key="device" @update_device="$emit('update_device')"/>
    <p>Add new device</p>
    <div class="row rounded mt-1 mb-0 p-0 ">
      <input class="col bg-secondary rounded me-1" v-model="newDevice.name"/>
      <input class="col bg-secondary rounded" v-model="newDevice.device"/>
      <button class="col bg-primary text-end rounded mb-1" v-on:click="add_device">submit </button>
    </div>
  </span>
</template>
