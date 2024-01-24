<script lang="ts">
import { Value } from '@/scripts/value'

export default {
  props: ['values', 'value_types'],
  setup(props) {
    console.log(props.values)
  },
  emits: ['rename'],
  methods: {
    getTypeName(value: Value) {
      for (var i = 0; i < this.value_types.length; i++) {
        if (this.value_types[i].value_type_id == value.value_type_id) {
          return this.value_types[i].type_name
        }
      }
      return 'XXX'
    },
    getUnit(value: Value) {
      for (var i = 0; i < this.value_types.length; i++) {
        if (this.value_types[i].value_type_id == value.value_type_id) {
          return this.value_types[i].type_unit
        }
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
  </div>
  <div class="row bg-secondary rounded mt-1" v-for="value in values" :key="value">
    <div class="col-1">
      {{ value.time }}
    </div>
    <div class="col-1">
      {{ getTypeName(value) }}
    </div>
    <div class="col">{{ value.value.toFixed(2) }} {{ getUnit(value) }}</div>
  </div>
</template>
