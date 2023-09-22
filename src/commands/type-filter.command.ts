import type Command from './command'

class TypeFilterCommand implements Command {
  execute(arg: unknown): void {
    if (typeof arg != 'string') {
      throw new TypeError()
    }

    console.log(arg)
  }
}

export default TypeFilterCommand
