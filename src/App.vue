<script setup lang="ts">
import axios from 'axios';  
import InputBar from './components/InputBar.vue';  
import ValuesDisplay from './components/ValuesDisplay.vue';  
import TypesDisplay from './components/TypesDisplay.vue';  
import { ValueType } from './scripts/value_type'; 
import { Value } from './scripts/value';  
</script>

<script lang="ts">

// Base Command class
class Command {
  component: any;

  constructor(component: any) {
    this.component = component;
  }

  execute(value: string): void {
    console.log('Default execute method. Value:', value);
  }
}

// Command to filter by type
class TypeFilterCommand extends Command {
  execute(value: string): void {
    this.component.filter_type = this.component.getTypeId(value);
    console.log('Update typeid', this.component.filter_type);
  }
}

// Command to start filtering
class StartFilterCommand extends Command {
  execute(value: string): void {
    this.component.filter_start = value;
  }
}

// Command to end filtering
class EndFilterCommand extends Command {
  execute(value: string): void {
    this.component.filter_end = value;
  }
}

// Command to create and execute a command
class ExecuteCommand extends Command {
  key: string;
  arg: string;

  constructor(component: any, key: string, arg: string) {
    super(component);
    this.key = key;
    this.arg = arg;
  }

  execute(): void {
    const CommandClass = Executor.commands[this.key];
    if (CommandClass) {
      const command = new CommandClass(this.component);
      command.execute(this.arg);
    } else {
      console.log('Ignoring command', this.key, this.arg);
    }
  }
}

// Executor maps keys to respective command classes and registers them
class Executor {
  static type = TypeFilterCommand;
  static start = StartFilterCommand;
  static end = EndFilterCommand;

  // Dictionary to store registered commands
  static commands: { [key: string]: typeof Command } = {};

  // Method to register a command
  static register(key: string, klasse: typeof Command): void {
    this.commands[key] = klasse;
  }

  // Method to execute a command based on key and arg
  static execute(key: string, arg: string, component: any): void {
    const ExecuteCommandClass = ExecuteCommand;
    const executeCommand = new ExecuteCommandClass(component, key, arg);
    executeCommand.execute();
  }
}

// Register commands
Executor.register('type', TypeFilterCommand);
Executor.register('start', StartFilterCommand);
Executor.register('end', EndFilterCommand);

export default {
  data() {
    return {
      values: new Array<Value>(),
      value_types: new Array<ValueType>(),
      filter_start: '',
      filter_end: '',
      filter_type: ''
    };
  },
  mounted() {
    this.get_types();  
    this.get_values().then((data) => {
      this.values = data;  
    });
  },
  methods: {
    getTypeId(type_name: string) {
      var return_value = '';
      for (var i = 0; i < this.value_types.length; i++) {
        if (this.value_types[i].type_name.toUpperCase() == type_name.toUpperCase()) {
          return_value = '' + this.value_types[i].id;
          console.log('Found matching type', this.value_types[i]);
        }
      }
      return return_value;
    },

    update_search(args: string[]) {
      console.log('New search arguments', args);

      this.filter_end = '';
      this.filter_start = '';
      this.filter_type = '';

      for (let i = 0; i < args.length; i++) {
        const command_and_args = args[i].split(':');
        if (command_and_args.length === 2) {
          const key = command_and_args[0];
          const value = command_and_args[1];

          // Execute the command based on key and value
          Executor.execute(key, value, this);
        } else {
          console.log('Ignoring command', args[i]);
        }
      }

      this.get_values().then((result) => {
        this.values = result;
      });
    },

    get_types() {
      axios
        .get('/api/type/')
        .then((result) => {
          this.value_types = result.data;  
        })
        .catch((error) => {
          console.error(error);
        });
    },

    get_values() {
      const promise = new Promise<Value[]>((accept, reject) => {
        const url = '/api/value/';
        var params: { [key: string]: string } = {};
        if (this.filter_type != '') {
          params['type_id'] = this.filter_type;
        }
        if (this.filter_end != '') {
          params['end'] = this.filter_end;
        }
        if (this.filter_start != '') {
          params['start'] = this.filter_start;
        }
        console.log('Trying to get url', url);
        axios
          .get(url, { params: params })
          .then((result) => {
            accept(result.data);
          })
          .catch((error) => {
            console.error(error);
            reject(error);
          });
      });
      return promise;
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
</template>
