<script lang="ts">
import AddDevice from './AddDevice.vue'
import AddRoom from './AddRoom.vue'
import AddLocation from './AddLocation.vue'
import ModifyTypes from './ModifyTypes.vue'

export default {
  props: ['devices', 'rooms', 'locations'],
  data() {
    return {
      editor_hidden: true
    }
  },
  methods: {
    toggleEditor() {
      this.editor_hidden = !this.editor_hidden
    }
  },
  components: { AddDevice, AddRoom, AddLocation, ModifyTypes }
}
</script>

<template>
  <div class="row bg-primary mt-1">
    <span class="col-2">Types</span
    ><span class="col text-end" v-on:click="toggleEditor()">
      <i class="bi bi-caret-down-fill" title="Show TypeEditor" v-if="editor_hidden"></i>
      <i class="bi bi-caret-up-fill" title="Hide TypeEditor" v-else></i>
    </span>
  </div>
  <span v-if="!editor_hidden">
    <div class="my-3">
      <label style="font-weight: 500">Adding new types</label>
      <AddDevice />
      <AddRoom />
      <AddLocation />
    </div>
    <div class="my-3">
      <label style="font-weight: 500">Modifying types</label>
      <ModifyTypes />
    </div>
  </span>
</template>
