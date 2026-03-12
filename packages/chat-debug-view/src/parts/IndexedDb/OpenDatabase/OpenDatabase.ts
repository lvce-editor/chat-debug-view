import { requestToPromise } from '../RequestToPromise.ts'

export const openDatabase = async (databaseName: string, dataBaseVersion: number): Promise<IDBDatabase> => {
  const request = indexedDB.open(databaseName, dataBaseVersion)
  return requestToPromise(() => request)
}
