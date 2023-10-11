<script setup lang="ts">
import axios from 'axios';  
import InputBar from './components/InputBar.vue';  
import ValuesDisplay from './components/ValuesDisplay.vue';  
import TypesDisplay from './components/TypesDisplay.vue';  
import { ValueType } from './scripts/value_type'; 
import { Value } from './scripts/value';  
</script>

<script lang="ts">


/**
 * Base class representing a command.
 */
class Command {
  component: any;

  /**
   * Constructor to initialize the command with a component.
   * @param component The component associated with the command.
   */
  constructor(component: any) {
    this.component = component;
  }

  /**
   * Method to execute the command with a given value.
   * @param value The value used for executing the command.
   */
   execute(value: string): void {
    console.log('Default execute method. Value:', value);
  }
}

/**
 * Command to filter items based on their type.
 */
class TypeFilterCommand extends Command {
  /**
   * Executes the type filter command by updating the filter type and logging the update.
   * @param value The value to use for filtering.
   */
  execute(value: string): void {
    this.component.filter_type = this.component.getTypeId(value);
    console.log('Update typeid', this.component.filter_type);
  }
}

/**
 * Command to start filtering.
 */
class StartFilterCommand extends Command {
  /**
   * Executes the start filter command by updating the filter start value.
   * @param value The value to start filtering.
   */
  execute(value: string): void {
    this.component.filter_start = value;
  }
}

/**
 * Command to end filtering.
 */
class EndFilterCommand extends Command {
  /**
   * Executes the end filter command by updating the filter end value.
   * @param value The value to end filtering.
   */
  execute(value: string): void {
    this.component.filter_end = value;
  }
}

/**
 * CommandFactory is responsible for creating and managing commands.
 * It provides a method to build a dictionary of command builders, associating
 * each command type with its corresponding builder function.
 */
class CommandFactory {
  /**
   * Builds a command executor dictionary.
   * @returns A dictionary where keys are command names and values are functions
   *          that build the corresponding command based on the given component.
   */
  static buildCommandExecutor(): { [key: string]: (component: any) => Command } {
    // Dictionary to store commands and their builders
    const commands: { [key: string]: (component: any) => Command } = {};

    // Assigning a command builder for filtering 
    commands['type'] = (component: any) => new TypeFilterCommand(component);
    commands['start'] = (component: any) => new StartFilterCommand(component);
    commands['end'] = (component: any) => new EndFilterCommand(component);

    // Return the dictionary of commands and their builders
    return commands;
  }
}

/**
 * Executor class responsible for managing and executing commands.
 * This class handle the execution of various commands based on provided keys
 * and manage the registration of existing filter commands.
 */
class Executor {
  /**
   * Dictionary to store command names as keys and functions to build commands as values.
   * The commands are built using the CommandFactory.
   */
  static commands: { [key: string]: (component: any) => Command } = CommandFactory.buildCommandExecutor();

  /**
   * Method to execute a specific command.
   * @param key The key representing the command type to be executed.
   * @param arg The argument to be used for executing the command.
   * @param component The associated component for the command.
   */
  static execute(key: string, arg: string, component: any): void {
    const commandBuilder = this.commands[key];  // Retrieve the corresponding command builder for the given key

    if (commandBuilder) {
      const command = commandBuilder(component);  // Create a command instance using the builder
      command.execute(arg);  // Execute the command by passing the argument
    } else {
      console.log('Ignoring command', key, arg);  // If the command is not found, log a message
    }
  }

  /**
   * Method to register filter commands.
   * This method associates keys (command names) with their corresponding command builders.
   */
  static registerFilterCommands(): void {
    // Associate the keys (command names) with the corresponding command builders
    this.commands['type'] = (component: any) => new TypeFilterCommand(component);
    this.commands['start'] = (component: any) => new StartFilterCommand(component);
    this.commands['end'] = (component: any) => new EndFilterCommand(component);
  }
}


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
