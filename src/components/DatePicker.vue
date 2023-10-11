<template>
    <div class="row bg-primary mb-2">
        <label class="bg-primary" witdh="100%" for="filter-type">Select Start Date & End Date:  </label>
        <input type="date" v-model="startDate" @change="updateFilter" />
        <input type="date" v-model="endDate" @change="updateFilter" />
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        startDate: '',
        endDate: ''
      };
    },
    methods: {
      updateFilter() {
        // Konvertiere ausgewählte Daten in Unix-Timestamps
        const startTimestamp = new Date(this.startDate).getTime() / 1000; // Teile durch 1000, um Millisekunden in Sekunden zu konvertieren
        const endTimestamp = new Date(this.endDate).getTime() / 1000;
  
        // Emit die umgewandelten Start- und Enddaten
        this.$emit('filter', {
          start: startTimestamp,
          end: endTimestamp
        });
      }
    }
  };
  </script>
  ```
