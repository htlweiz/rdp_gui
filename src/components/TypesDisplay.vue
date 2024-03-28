<script lang="ts">
import SingleTypeDisplay from './SingleTypeDisplay.vue'
export default {
  props: ['value_types'],
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
  components: { SingleTypeDisplay },
  emits: ['update_type']
}
</script>

<template>
  <div class="row bg-primary rounded p-1" style="color: whitesmoke">
    <span class="col-3">Type Editor</span
    ><span class="col text-end" v-on:click="toggleEditor()">
      <i class="bi bi-caret-down-fill" title="Show TypeEditor" v-if="editor_hidden"></i>
      <i class="bi bi-caret-up-fill" title="Hide TypeEditor" v-else></i>
    </span>
  </div>
  <span v-if="!editor_hidden">
    <SingleTypeDisplay
      :type_prop="value_type"
      v-for="value_type in value_types"
      :key="value_type"
      @update_type="$emit('update_type')"
    />
  </span>
</template>
