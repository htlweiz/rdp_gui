<script setup lang="ts">
import InputBar from './components/InputBar.vue'
import ValuesDisplay from './components/ValuesDisplay.vue'
import TypesDisplay from './components/TypesDisplay.vue'
import { CommandFactory } from './commands/command.factory'

import { useValueStore } from './stores/value.store'
import { useValueTypeStore } from './stores/value-type.store'

import type { UrlParams } from './types/url-paras.type'
</script>

<script lang="ts">
export default {
  data() {
    const valueStore = useValueStore()
    const valueTypeStore = useValueTypeStore()
    const params: UrlParams = {}
    const commandFactory = new CommandFactory(params)
    return {
      params,
      commandFactory,
      valueStore,
      valueTypeStore
    }
  },
  mounted() {
    this.valueTypeStore.updateValueTypes()
    this.valueStore.updateValues()
  },
  methods: {
    update_search(args: string[]) {
      console.log('New search arguemnts', args)
      for (var i = 0; i < args.length; i++) {
        console.log('handling command', args[i])
        const command_and_args = args[i].split(':')
        if (command_and_args.length == 2) {
          const key = command_and_args[0]
          const value = command_and_args[1]
          const command = this.commandFactory.getCommand(key)
          if (command) {
            command.execute(value)
            continue
          }
        }
        console.log('Ignoring command', args[i])
      }
      this.valueStore.updateValues(this.params)
    }
  }
}
</script>

<template>
  <div class="container p-1">
    <h1 class="row">RDP</h1>
    <InputBar @search="update_search" />
    <TypesDisplay
      :value_types="valueTypeStore.valueTypes"
      @update_type="valueTypeStore.updateValueTypes"
    />
    <ValuesDisplay :values="valueStore.values" :value_types="valueTypeStore.valueTypes" />
  </div>
</template>
