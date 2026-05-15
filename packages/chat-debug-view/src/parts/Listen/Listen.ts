import * as CommandMap from '../CommandMap/CommandMap.ts'
import { initializeChatStorageWorker } from '../InitializeChatStorageWorker/InitializeChatStorageWorker.ts'
import { initializeClipBoardWorker } from '../InitializeClipBoardWorker/InitializeClipBoardWorker.ts'
import { initializeRendererWorker } from '../InitializeRendererWorker/InitializeRendererWorker.ts'
import { registerCommands } from '../State/ChatDebugViewStates.ts'

export const listen = async (): Promise<void> => {
  registerCommands(CommandMap.commandMap)
  await Promise.all([initializeRendererWorker(), initializeClipBoardWorker(), initializeChatStorageWorker()])
}
