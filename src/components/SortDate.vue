<template>
  <div class="date-picker">
    <label for="start-date" style="margin-right: 10px; font-weight: bold;">Start Date:</label>
    <input type="date" id="start-date" v-model="startDate" @change="updateFilter" style="padding: 5px; border: 1px solid #ccc; border-radius: 4px; background-color: #f7f7f7; color: #333; cursor: pointer;">

    <label for="end-date" style="margin-left: 20px; margin-right: 10px; font-weight: bold;">End Date:</label>
    <input type="date" id="end-date" v-model="endDate" @change="updateFilter" style="padding: 5px; border: 1px solid #ccc; border-radius: 4px; background-color: #f7f7f7; color: #333; cursor: pointer;">
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