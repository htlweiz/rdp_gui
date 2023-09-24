<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import InputBar from './components/InputBar.vue'
import ValuesDisplay from './components/ValuesDisplay.vue'
import TypesDisplay from './components/TypesDisplay.vue'

import { ValueType } from './scripts/value_type'
import { Value } from './scripts/value'

const values = ref(new Array<Value>())
const value_types = ref(new Array<ValueType>())
const filter_start = ref('')
const filter_end = ref('')
const filter_type = ref('')

interface Command {
  execute(): void
}

class GetValueType implements Command {
  constructor(
    private context: any,
    private value: string
  ) {}
  execute() {
    this.context.filter_type.value = this.context.getTypeId(this.value)
  }
}

class GetStart implements Command {
  constructor(
    private context: any,
    private value: string
  ) {}
  execute() {
    this.context.filter_start.value = this.value
  }
}

class GetEnd implements Command {
  constructor(
    private context: any,
    private value: string
  ) {}
  execute() {
    this.context.filter_end.value = this.value
  }
}

const getTypeId = (type_name: string) => {
  let return_value = ''
  for (const valueType of value_types.value) {
    if (valueType.type_name.toUpperCase() === type_name.toUpperCase()) {
      return_value = '' + valueType.id
      console.log('Found matching type', valueType)
    }
  }
  return return_value
}

const update_search = (args: string[]) => {
  const context = {
    filter_type,
    filter_start,
    filter_end,
    getTypeId
  }

  for (const commandStr of args) {
    const [key, value] = commandStr.split(':')
    let command: Command | null = null

    if (key && value) {
      if (key === 'type') {
        command = new GetValueType(context, value)
      } else if (key === 'start') {
        command = new GetStart(context, value)
      } else if (key === 'end') {
        command = new GetEnd(context, value)
      }

      if (command) {
        command.execute()
      }
    }
  }
  get_values()
}

const get_types = () => {
  axios
    .get('/api/type/')
    .then((result) => {
      value_types.value = result.data
    })
    .catch((error) => {
      console.error(error)
    })
}

const get_values = async () => {
  const params: { [key: string]: string } = {}
  if (filter_type.value) params['type_id'] = filter_type.value
  if (filter_end.value) params['end'] = filter_end.value
  if (filter_start.value) params['start'] = filter_start.value

  try {
    const result = await axios.get('/api/value/', { params })
    values.value = result.data
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  get_types()
  get_values()
})
</script>

<template>
  <div class="container p-1">
    <h1 class="row">RDP</h1>
    <InputBar @search="update_search" />
    <TypesDisplay :value_types="value_types" @update_type="get_types" />
    <ValuesDisplay :values="values" :value_types="value_types" />
  </div>
</template>
