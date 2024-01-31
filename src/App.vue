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
      max: 0,
      temp_name: "T",
      temp_unit: "C"
    }
  },
  mounted() {
    this.get_types()
    this.get_min_max()
    this.get_values()
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
      this.get_min_max()
      this.get_values()
    },
    get_types() {
      axios
        .get('/api/type/')
        .then((result) => {
          this.value_types = result.data
          this.temp_name = result.data[0].type_name
          this.temp_unit = result.data[0].type_unit
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
            this.min = result.data[0].value
            this.max = result.data[1].value
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
            this.values=result.data
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
  <div class="bg-primary myright m-0 p-0">
    <div class="row m-0">
      <div class="col-2">
        <MinMax :min=min :max=max :name=temp_name :unit=temp_unit />
      </div>
      <div class="col bg-secondary m-4 p-3">
        <div class="container">
          <h1 class="row">RDP</h1>
          <InputBar @search="update_search" />
          <TypesDisplay :value_types="value_types" @update_type="get_types" />
        </div>
      </div>
    </div>
  </div>
  <div class="scroller">
    <ValuesDisplay :values="values" :value_types="value_types" @update_comment="get_values"/>
  </div>
</template>

<style type="inline">
.myright {
  position: fixed;
  overflow: hidden;
  z-index: 10;
  left: 0;
  top: 0;
  width: 100%;
}
.scroller {
  margin-top:200px;
  overflow-x:hidden;
  overflow-y: scroll;
  height: max-content;
}
</style>
