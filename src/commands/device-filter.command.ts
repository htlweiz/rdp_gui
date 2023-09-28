import { useDeviceStore } from '@/stores/device.store'
import { Command } from './command'

export class DeviceFilterCommand extends Command {
  private deviceStore = useDeviceStore()

  execute(arg: string): void {
    const device = this.deviceStore.getDeviceId(arg)
    if (device) {
      this.params['device'] = device
    }
  }
}
