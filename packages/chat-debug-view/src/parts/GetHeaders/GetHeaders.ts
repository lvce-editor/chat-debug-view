import { isHeadersRecord } from '../IsHeadersRecord/IsHeadersRecord.ts'

export const getHeaders = (value: unknown): readonly (readonly [string, unknown])[] => {
  if (!isHeadersRecord(value)) {
    return []
  }
  return Object.entries(value)
}