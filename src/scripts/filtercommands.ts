// @author Robert Ulmer

interface Command { 
    execute(): void;
}

export class ConcreteHelloCommand implements Command {
    parameter : string;
    constructor(param: string) {
        this.parameter = param
    }

    execute(): void {
        console.log("Say hello! " + this.parameter)
    }
}

export abstract class FilterCommand implements Command {
    application_data
    parameter : string
    constructor(param: string, application_data: any) {
        this.application_data=application_data
        this.parameter = param
    }
    execute(): void {
        this.execute_impl();
    }
    execute_impl() {
        throw new Error("Method not implemented.");
    }
}

export class FilterEndCommand extends FilterCommand {
    execute_impl() :void {
        console.log("Say Filter Command End: " + this.parameter)
        this.application_data.filter_end = this.parameter
    }
}

export class FilterStartCommand extends FilterCommand {
    execute_impl() :void {
        console.log("Say Filter Command Start: " + this.parameter)
        this.application_data.filter_start = this.parameter
    }
}

export class FilterTypeCommand extends FilterCommand {
    execute_impl(): void {
        console.log("Say filter Command Type: " + this.parameter)
        this.application_data.filter_type = this.application_data.getTypeId(this.parameter)
    }
}

export interface CommandDictionary {
    [ key: string]: new (...args: any[]) => Command;
}

export class Involker {
    commands : CommandDictionary = {};
    application_state = {}
    constructor(application_state: {}) {
        this.application_state=application_state
    }

    register (key: string, command : new (...args: any[]) => Command) : void {
        this.commands[key]=command;
    }

    execute (command_string: string) {
        const command_array = command_string.split(":")
        const command_key = command_array[0]
        const parameter = command_array.slice(1).join(":")
        console.log("Command Array " + command_array)
        if (command_key in this.commands) {
            const command = new this.commands[command_key](parameter, this.application_state)
            command.execute()
        } else {
            console.log("Ingoring unknown command: " + command_key + " with parameter: " + parameter)
        }
    }
}