export const isIndexedDbSupported = (indexedDbSupportOverride?: boolean): boolean => {
  if (typeof indexedDbSupportOverride === 'boolean') {
    return indexedDbSupportOverride
  }
  return globalThis.indexedDB !== undefined
}
