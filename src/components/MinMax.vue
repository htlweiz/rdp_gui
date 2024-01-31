<script lang="ts">

export default {
    props: ["min", "max", "name", "unit"],
    mounted() {
        console.log("Mounted with: ", this.min, " ", this.max, " ", this.unit)
    },
    methods: {
    },
}
</script>

<template>
  <div class="bg-secondary rounded text-center m-3 p-2">
    {{ name }} 
    <div class="container m-0 p-0">
      <div class="row m-0 p-1">
        <div class="col rounded my_blue m-1 p-1">
          {{ Number(min).toFixed(1) }} {{ unit }}
        </div>
        <div class="col rounded my_red m-1 p-1">
          {{ Number(max).toFixed(1) }} {{ unit }}
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

