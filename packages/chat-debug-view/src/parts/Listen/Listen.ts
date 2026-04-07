import { WebWorkerRpcClient } from '@lvce-editor/rpc'
import * as CommandMap from '../CommandMap/CommandMap.ts'
import { registerCommands } from '../State/ChatDebugViewStates.ts'
import * as WorkerRpc from '../WorkerRpc/WorkerRpc.ts'

export const listen = async (): Promise<void> => {
  registerCommands(CommandMap.commandMap)
  const rpc = await WebWorkerRpcClient.create({
    commandMap: CommandMap.commandMap,
  })
  WorkerRpc.setWorkerRpc(rpc)
}
