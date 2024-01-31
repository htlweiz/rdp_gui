<script lang="ts">
import SingleValueDisplay from './SingleValueDisplay.vue';

export default {
    props: ['values', 'value_types'],
    setup(props) {
        console.log(props.values);
    },
    emits: ['update_comment'],
    methods: {},
    components: { SingleValueDisplay }
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
    <div class="col">comment</div>
  </div>
  <SingleValueDisplay :value=value
                      :value_types=value_types
                      class="row bg-secondary rounded mt-1"
                      v-for="value in values"
                      :key="value"
                      @update_comment="$emit('update_comment')"/>
</template>
