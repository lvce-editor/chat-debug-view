import { RendererWorker } from '@lvce-editor/rpc-registry'

export const rpcId = 'handleStorageWorkerUpdate'

export const handleStorageWorkerUpdate = async (uid: number): Promise<void> => {
  await RendererWorker.invoke('Viewlet.executeViewletCommand', uid, 'ChatDebug.handleClickRefresh')
}
