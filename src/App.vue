<script setup lang="ts">
// import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
import axios from 'axios'
import InputBar from './components/InputBar.vue'
import ValuesDisplay from './components/ValuesDisplay.vue'
import TypesDisplay from './components/TypesDisplay.vue'

import { ValueType } from './scripts/value_type'
import { Value } from './scripts/value'
</script>

<template>
  <div class="container">
    <h1 class="row">RDP</h1>
    <InputBar @search="update_search" />
    <TypesDisplay :value_types="value_types" @update_type="get_types"/>
    <ValuesDisplay :values="values" :value_types="value_types" />
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      values: new Array<Value>(),
      value_types: new Array<ValueType>()
    }
  },
  mounted() {
    this.get_types() 
    this.get_values().then((data) => {
      this.values = data
    })
  },
  methods: {
    getTypeId(type_name: string) {
      var return_value = ''
      for (var i = 0; i < this.value_types.length; i++) {
        if (this.value_types[i].type_name.toUpperCase() == type_name.toUpperCase()) {
          return_value = '' + this.value_types[i].id
          console.log('Found matching type', this.value_types[i])
        }
      }
      return return_value
    },
    update_search(args: string[]) {
      var type: string = ''
      var start: string = ''
      var end: string = ''
      console.log('New search arguemnts', args)
      for (var i = 0; i < args.length; i++) {
        const command = args[i]
        console.log('handling command', command)
        const command_and_args = args[i].split(':')
        if (command_and_args.length == 2) {
          const key = command_and_args[0]
          const value = command_and_args[1]
          if (key == 'type') {
            type = this.getTypeId(value)
            console.log('Update typeid', type)
            continue
          } else if (key == 'start') {
            start = value
            continue
          } else if (key == 'end') {
            end = value
            continue
          }
        }
        console.log('Ignoring command', command)
      }
      this.get_values(type, start, end).then((result) => {
        this.values = result
      })
    },
    get_types() {
      axios
        .get('/api/type/')
        .then((result) => {
          this.value_types=result.data
        })
        .catch((error) => {
          console.error(error)
        })
    },
    get_values(type_id = '', start = '', end = '') {
      const promise = new Promise<Value[]>((accept, reject) => {
        const url = '/api/value/'
        const params = {
          'type_id': type_id,
          'start': start,
          'end' : end
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
