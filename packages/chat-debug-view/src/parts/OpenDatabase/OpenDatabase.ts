import { openDB, type IDBPDatabase } from 'idb'

export const openDatabase = async (databaseName: string, dataBaseVersion: number): Promise<IDBPDatabase> => {
  return openDB(databaseName, dataBaseVersion)
}
