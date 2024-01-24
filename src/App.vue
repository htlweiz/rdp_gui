<script setup lang="ts">
import axios from 'axios'
import InputBar from './components/InputBar.vue'
import ValuesDisplay from './components/ValuesDisplay.vue'
import TypesDisplay from './components/TypesDisplay.vue'
import MinMax from './components/MinMax.vue'

import { ValueType } from './scripts/value_type'
import { Value } from './scripts/value'

import { Involker, ConcreteHelloCommand, FilterStartCommand, FilterTypeCommand, FilterEndCommand } from './scripts/filtercommands'

</script>

<script lang="ts">
export default {
  data() {
    return {
      values: new Array<Value>(),
      value_types: new Array<ValueType>(),
      filter_start : '',
      filter_end : '',
      filter_type : '',
      involker: new Involker(this),
      min: 0,
      max: 0
    }
  },
  mounted() {
    this.get_types()
    this.get_min_max().then((data) => {
      this.min = data[0].value
      this.max = data[1].value
    })
    this.get_values().then((data) => {
      this.values = data
    })
    // this.involker = new Involker();
    this.involker.register("test", ConcreteHelloCommand)
    this.involker.register("start", FilterStartCommand)
    this.involker.register("end", FilterEndCommand)
    this.involker.register("type", FilterTypeCommand)
    console.log("App.vue mounted")
  },
  methods: {
    getTypeId(type_name: string) {
      var return_value = ''
      for (var i = 0; i < this.value_types.length; i++) {
        if (this.value_types[i].type_name.toUpperCase() == type_name.toUpperCase()) {
          return_value = '' + this.value_types[i].value_type_id
          console.log('Found matching type', this.value_types[i])
        }
      }
      return return_value
    },
    update_search(args: string[]) {
      console.log('New search arguemnts', args)
      this.filter_end=''
      this.filter_start=''
      this.filter_type=''
      for (var i = 0; i < args.length; i++) {
        const command = args[i]
        console.log('handling command', command)
        this.involker.execute(command)
      }
      this.get_min_max().then((result) => {
        this.min = result[0].value
        this.max = result[1].value
      })
      this.get_values().then((result) => {
        this.values = result
      })
    },
    get_types() {
      axios
        .get('/api/type/')
        .then((result) => {
          this.value_types = result.data
        })
        .catch((error) => {
          console.error(error)
        })
    },
    get_min_max() {
      console.log("Entering min max")
      const promise = new Promise<Value[]>((accept, reject) => {
        const url = '/api/value/minmax/'
        var params : { [key: string]: string } = {}
        params['type_id'] = '0';
        if (this.filter_start != '' ) {
          params['start'] = this.filter_start
        }
        if (this.filter_end != '' ) {
          params['end'] = this.filter_end
        }
        console.log('Trying to get url', url)
        axios
          .get(url, { params: params })
          .then((result) => {
            console.log("Min max data ", result.data)
            accept(result.data)
          })
          .catch((error) => {
            console.error(error)
            reject(error)
          })
      })
      return promise
    },
    get_values() {
      const promise = new Promise<Value[]>((accept, reject) => {
        const url = '/api/value/'
        var params : { [key: string]: string } = {}
        if (this.filter_type != '') {
          params['type_id'] = this.filter_type
        }
        if (this.filter_end != '') {
          params['end'] = this.filter_end
        }
        if (this.filter_start != '') {
          params['start']=this.filter_start
        }
        console.log('Trying to get url', url)
        axios
          .get(url, { params: params })
          .then((result) => {
            // console.log('Got values: ', result.data)
            accept(result.data)
          })
          .catch((error) => {
            console.error(error)
            reject(error)
          })
      })
      return promise
    }
  }
}
</script>

<template>
  <div class="container p-1">
    <h1 class="row">RDP</h1>
    <InputBar @search="update_search" />
    <TypesDisplay :value_types="value_types" @update_type="get_types" />
    <ValuesDisplay :values="values" :value_types="value_types" />
  </div>
  <div class="myright">
    <MinMax :min=min :max=max unit="C"/>
  </div>
</template>

<style type="inline">
.myright {
  position: absolute;
  z-index: 10;
  left: 0;
  top: 0;
}
</style>
