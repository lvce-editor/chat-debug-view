import { WebWorkerRpcClient } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as CommandMap from '../CommandMap/CommandMap.ts'
import { initializeChatStorageWorker } from '../InitializeChatStorageWorker/InitializeChatStorageWorker.ts'
import { registerCommands } from '../State/ChatDebugViewStates.ts'

export const listen = async (): Promise<void> => {
  registerCommands(CommandMap.commandMap)
  const r = await WebWorkerRpcClient.create({
    commandMap: CommandMap.commandMap,
  })
  RendererWorker.set(r)
  await initializeChatStorageWorker()
}
