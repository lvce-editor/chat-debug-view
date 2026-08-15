import * as ApplyRender from '../ApplyRender/ApplyRender.ts'
import * as RendererProcess from '../RendererProcess/RendererProcess.ts'
import * as ChatDebugViewStates from '../State/ChatDebugViewStates.ts'

export const render2 = (uid: number, diffResult: readonly number[]): readonly unknown[] | Promise<readonly unknown[]> => {
  const { newState, oldState } = ChatDebugViewStates.get(uid)
  ChatDebugViewStates.set(uid, newState, newState)
  const commands = ApplyRender.applyRender(oldState, newState, diffResult)
  if (!RendererProcess.isConnected()) return commands
  return renderDirect(uid, commands)
}

const renderDirect = async (uid: number, commands: readonly unknown[]): Promise<readonly unknown[]> => {
  const rendererWorkerCommands = commands.filter((command: any) => command[0] === 'Viewlet.setFocusContext')
  const rendererProcessCommands = commands.filter((command: any) => command[0] !== 'Viewlet.setFocusContext')
  const transactionId = await RendererProcess.invoke('Viewlet.queueCommands', uid, rendererProcessCommands)
  return [...rendererWorkerCommands, ['Viewlet.commitPending', uid, transactionId]]
}
