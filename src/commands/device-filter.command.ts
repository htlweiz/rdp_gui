import { Command } from './command'

export class DeviceFilterCommand extends Command {
  execute(arg: string): void {
    this.params['device'] = arg
  }
}
