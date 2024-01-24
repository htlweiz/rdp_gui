<script lang="ts">

import { ValueType } from '@/scripts/value_type';
import axios from 'axios';

export default {
    props: ["min", "max", "unit"],
    data() {
    },
    mounted() {
        console.log("Mounted with: ", this.min, " ", this.max, " ", this.unit)
    },
    methods: {
    },
}
</script>

<template>
  <div class="bg-secondary m-1 p-1">
    Temperature 
    <div class="container m-0 p-0">
      <div class="row m-0 p-0">
        <div class="col my_blue m-0 p-0">
          {{ min }} {{ unit }}
        </div>
        <div class="col my_red m-0 p-0">
          {{ max }} {{ unit }}
        </div>
      </div>

    </div>
  </div>
</template>

<style type="iniline">
.my_blue {
  background: lightskyblue;
  white-space: nowrap;
}
.my_red {
  background: lightsalmon;
  white-space: nowrap;
}
</style>

