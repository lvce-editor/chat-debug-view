import type { ChatViewEvent } from '../../ChatViewEvent/ChatViewEvent.ts'
import { requestToPromise } from '../RequestToPromise.ts'

export const getAllEvents = async (store: Readonly<IDBObjectStore>): Promise<readonly ChatViewEvent[]> => {
  const all = await requestToPromise(() => store.getAll())
  return all as readonly ChatViewEvent[]
}