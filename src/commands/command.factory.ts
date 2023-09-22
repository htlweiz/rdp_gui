import type Command from './command'
import TypeFilterCommand from './type-filter.command'

class CommandFactory {
  private static readonly register: Record<string, new () => Command> = { type: TypeFilterCommand }

  public getCommand(command: string) {
    const cmd = CommandFactory.register[command]
    return new cmd()
  }
}

export default CommandFactory
