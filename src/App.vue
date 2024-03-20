<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import InputBar from './components/InputBar.vue'
import ValuesDisplay from './components/ValuesDisplay.vue'
import TypesDisplay from './components/TypesDisplay.vue'
import TypesBarVue from './components/TypesBar.vue'
import Sorting from './components/Sorting.vue'

import { ValueType } from './scripts/value_type'
import { Value } from './scripts/value'

const values = ref(new Array<Value>())
const value_types = ref(new Array<ValueType>())
const devices = ref(new Array<Value>())
const rooms = ref(new Array<Value>())
const locations = ref(new Array<Value>())
const filter_start = ref('')
const filter_end = ref('')
const filter_type = ref('')

interface Command {
  execute(): void
}

class CommandFactory {
  static buildCommandExecutor(): CommandExecutor {
    const commandMap = {
      type: GetValueType,
      start: GetStart,
      end: GetEnd
    }
    return new CommandExecutor(commandMap)
  }
}

class CommandExecutor {
  commandMap: { [key: string]: new (value: string) => Command }

  constructor(commandMap: {}) {
    this.commandMap = commandMap
  }

  execute(key: string, value: string) {
    const CommandClass = this.commandMap[key]
    const command = new CommandClass(value)
    command.execute()
  }
}

class GetValueType implements Command {
  constructor(private value: string) {}
  execute() {
    filter_type.value = getTypeId(this.value)
  }
}

class GetStart implements Command {
  constructor(private value: string) {}
  execute() {
    filter_start.value = this.value
  }
}

class GetEnd implements Command {
  constructor(private value: string) {}
  execute() {
    filter_end.value = this.value
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
  const commandExecutor = CommandFactory.buildCommandExecutor()
  for (const commandStr of args) {
    if (!commandStr.includes(':')) continue
    const [key, value] = commandStr.split(':')
    commandExecutor.execute(key, value)
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

const get_devices = () => {
  axios
    .get('/api/device/')
    .then((result) => {
      devices.value = result.data
    })
    .catch((error) => {
      console.error(error)
    })
}

const get_rooms = () => {
  axios
    .get('/api/room/')
    .then((result) => {
      rooms.value = result.data
    })
    .catch((error) => {
      console.error(error)
    })
}

const get_locations = () => {
  axios
    .get('/api/location/')
    .then((result) => {
      locations.value = result.data
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
  get_devices()
  get_rooms()
  get_locations()
})
</script>

<template>
  <div class="container p-1">
    <h1 class="row">RDP</h1>
    <InputBar @search="update_search" />
    <TypesDisplay :value_types="value_types" @update_type="get_types" />
    <TypesBarVue :devices="devices" :rooms="rooms" :locations="locations" />
    <Sorting :values="values" :devices="devices" :rooms="rooms" :locations="locations" />
    <ValuesDisplay
      :values="values"
      :value_types="value_types"
      :devices="devices"
      :rooms="rooms"
      :locations="locations"
    />
  </div>
</template>
