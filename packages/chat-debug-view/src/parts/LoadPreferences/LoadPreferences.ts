import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as GetBoolean from '../GetBoolean/GetBoolean.ts'

export interface Preferences {
  readonly autoRefresh: boolean
}

export const loadPreferences = async (): Promise<Preferences> => {
  const autoRefresh = GetBoolean.getBoolean((await RendererWorker.getPreference('chatDebug.autoRefresh')) as string | boolean)
  return {
    autoRefresh,
  }
}
