import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { isRecord } from '../IsRecord/IsRecord.ts'

export interface HeaderDetailEntry {
  readonly label: string
  readonly value: string
}

export interface HeadersDetails {
  readonly general: readonly HeaderDetailEntry[]
  readonly responseHeaders: readonly HeaderDetailEntry[]
}

const getCandidateRecords = (value: unknown): readonly Record<string, unknown>[] => {
  if (!isRecord(value)) {
    return []
  }
  const candidates = [value]
  for (const key of ['request', 'response', 'body', 'value', 'result']) {
    const nestedValue = value[key]
    if (isRecord(nestedValue)) {
      candidates.push(nestedValue)
    }
  }
  return candidates
}

const getStringValue = (value: unknown): string | undefined => {
  if (typeof value === 'string') {
    return value
  }
  if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'bigint') {
    return String(value)
  }
  return undefined
}

const getField = (records: readonly Record<string, unknown>[], keys: readonly string[]): string | undefined => {
  for (const record of records) {
    for (const key of keys) {
      const value = getStringValue(record[key])
      if (value !== undefined) {
        return value
      }
    }
  }
  return undefined
}

const normalizeHeaderValue = (value: unknown): string => {
  if (typeof value === 'string') {
    return value
  }
  if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'bigint') {
    return String(value)
  }
  if (Array.isArray(value)) {
    return value.map(normalizeHeaderValue).join(', ')
  }
  if (value === null) {
    return 'null'
  }
  if (value === undefined) {
    return ''
  }
  try {
    return JSON.stringify(value)
  } catch {
    return String(value)
  }
}

const getHeaderEntriesFromArray = (headers: readonly unknown[]): readonly HeaderDetailEntry[] => {
  const headerEntries: HeaderDetailEntry[] = []
  for (const header of headers) {
    if (Array.isArray(header) && header.length >= 2 && typeof header[0] === 'string') {
      headerEntries.push({
        label: header[0],
        value: normalizeHeaderValue(header[1]),
      })
      continue
    }
    if (!isRecord(header)) {
      continue
    }
    const label = getStringValue(header.name) ?? getStringValue(header.key) ?? getStringValue(header.header)
    if (!label) {
      continue
    }
    headerEntries.push({
      label,
      value: normalizeHeaderValue(header.value),
    })
  }
  return headerEntries
}

const getHeaderEntries = (value: unknown): readonly HeaderDetailEntry[] => {
  if (Array.isArray(value)) {
    return getHeaderEntriesFromArray(value)
  }
  if (!isRecord(value)) {
    return []
  }
  if (typeof value.entries === 'function') {
    return Array.from(value.entries()).flatMap((entry): readonly HeaderDetailEntry[] => {
      if (!Array.isArray(entry) || entry.length < 2 || typeof entry[0] !== 'string') {
        return []
      }
      return [
        {
          label: entry[0],
          value: normalizeHeaderValue(entry[1]),
        },
      ]
    })
  }
  return Object.entries(value).map(([label, headerValue]) => ({
    label,
    value: normalizeHeaderValue(headerValue),
  }))
}

export const getHeadersDetails = (event: ChatViewEvent): HeadersDetails | null => {
  const eventRecord = isRecord(event) ? event : {}
  const requestEvent = eventRecord.requestEvent
  const responseEvent = eventRecord.responseEvent
  const requestRecords = [...getCandidateRecords(requestEvent), ...getCandidateRecords(event)]
  const responseRecords = [...getCandidateRecords(responseEvent), ...getCandidateRecords(event)]

  const general: HeaderDetailEntry[] = []
  const requestUrl = getField(requestRecords, ['url', 'requestUrl', 'request_url'])
  if (requestUrl) {
    general.push({
      label: 'Request URL',
      value: requestUrl,
    })
  }
  const requestMethod = getField(requestRecords, ['method', 'requestMethod', 'request_method'])
  if (requestMethod) {
    general.push({
      label: 'Request Method',
      value: requestMethod,
    })
  }
  const statusCode = getField(responseRecords, ['statusCode', 'status_code', 'status'])
  if (statusCode) {
    general.push({
      label: 'Status Code',
      value: statusCode,
    })
  }

  let responseHeaders: readonly HeaderDetailEntry[] = []
  for (const record of responseRecords) {
    for (const key of ['responseHeaders', 'response_headers', 'headers']) {
      const headerEntries = getHeaderEntries(record[key])
      if (headerEntries.length > 0) {
        responseHeaders = headerEntries
        break
      }
    }
    if (responseHeaders.length > 0) {
      break
    }
  }

  if (general.length === 0 && responseHeaders.length === 0) {
    return null
  }

  return {
    general,
    responseHeaders,
  }
}
