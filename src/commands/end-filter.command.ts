import { Command } from './command'

export class EndFilterCommand extends Command {
  execute(arg: string): void {
    this.params['end'] = arg
  }
}
