<script lang="ts">
import { sleep } from '@/scripts/sleep'

export default {
  data() {
    return {
      search_string: '',
      typing: false
    }
  },
  props: ['the_commands'],
  setup(props) {
    console.log(props.the_commands)
  },
  emits: ['search'],
  methods: {
    async search_update() {
      if (this.typing) {
        return
      }
      this.typing = true
      await sleep(1000)
      console.log('Search update ', this.search_string)
      this.$emit('search', this.search_string.split(' '))
      this.typing = false
    }
  }
}
</script>

<template>
  <div class="row mb-2 p-2">
    <input
      type="text"
      class="form-control bg-secondary"
      id="search_string"
      placeholder="Search"
      @keydown="search_update"
      v-model="search_string"
    />
  </div>
</template>
