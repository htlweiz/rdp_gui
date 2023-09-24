import type { UrlParams } from '@/types/url-paras.type'
import { Command } from './command'
import { TypeFilterCommand } from './type-filter.command'

export class CommandFactory {
  private static readonly registeredCommands: Record<string, new (params: UrlParams) => Command> = {
    type: TypeFilterCommand
  }

  constructor(private params: UrlParams) {}

  public getCommand(command: string): Command | undefined {
    const cmd = CommandFactory.registeredCommands[command]
    if (cmd) {
      return new cmd(this.params)
    }
  }
}
