import type { UrlParams } from '@/types/url-paras.type'
import { Command } from './command'
import { TypeFilterCommand } from './type-filter.command'
import { StartFilterCommand } from './start-filter.command'
import { EndFilterCommand } from './end-filter.command'

export class CommandFactory {
  private static readonly registeredCommands: Record<string, new (params: UrlParams) => Command> = {
    type: TypeFilterCommand,
    start: StartFilterCommand,
    end: EndFilterCommand
  }

  constructor(private params: UrlParams) {}

  public getCommand(command: string): Command | undefined {
    const cmd = CommandFactory.registeredCommands[command]
    if (cmd) {
      return new cmd(this.params)
    }
  }
}
