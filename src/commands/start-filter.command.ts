import { Command } from './command'

export class StartFilterCommand extends Command {
  execute(arg: string): void {
    this.params['start'] = arg
  }
}
