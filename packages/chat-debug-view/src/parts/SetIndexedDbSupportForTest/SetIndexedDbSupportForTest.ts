import { setIndexedDbSupportOverride } from '../IndexedDbSupportOverride/IndexedDbSupportOverride.ts'

export const setIndexedDbSupportForTest = (supported?: boolean): void => {
  return setIndexedDbSupportOverride(supported)
}
