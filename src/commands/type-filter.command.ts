import { Command } from './command'
import { useValueTypeStore } from '@/stores/value-type.store'

export class TypeFilterCommand extends Command {
  private valueTypeStore = useValueTypeStore()

  execute(arg: string): void {
    const type = this.valueTypeStore.getTypeId(arg)
    if (type) {
      this.params['type_id'] = type
    }
  }
}
