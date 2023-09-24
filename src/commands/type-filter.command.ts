import { Command } from './command'
import { useValueTypeStore } from '@/stores/value-type.store'

export class TypeFilterCommand extends Command {
  private valueTypeStore = useValueTypeStore()

  execute(arg: string): void {
    this.params['type_id'] = this.valueTypeStore.getTypeId(arg)
  }
}
