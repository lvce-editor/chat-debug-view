export const isIndexedDbSupported = (override?: boolean): boolean => {
  if (typeof override === 'boolean') {
export const isIndexedDbSupported = (indexedDbSupportOverride?: boolean): boolean => {
  if (typeof indexedDbSupportOverride === 'boolean') {
    return indexedDbSupportOverride
  }
  return globalThis.indexedDB !== undefined
}
