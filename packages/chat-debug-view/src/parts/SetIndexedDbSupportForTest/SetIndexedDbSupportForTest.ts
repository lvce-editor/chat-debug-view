import { setIndexedDbSupportOverride } from '../IndexedDbSupportOverride/IndexedDbSupportOverride.ts'

export const setIndexedDbSupportForTest = (supported?: boolean): void => {
  setIndexedDbSupportOverride(supported)
}
