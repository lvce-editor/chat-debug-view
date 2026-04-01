import { getIndexedDbSupportOverride } from '../IndexedDbSupportOverride/IndexedDbSupportOverride.ts'

export const isIndexedDbSupported = (): boolean => {
  const override = getIndexedDbSupportOverride()
  if (typeof override === 'boolean') {
    return override
  }
  return globalThis.indexedDB !== undefined
}
