import { setIndexedDbSupportForTest as setSupport } from '../ListChatViewEvents/ListChatViewEvents.ts'

export const setIndexedDbSupportForTest = (supported?: boolean): void => {
  setSupport(supported)
}
