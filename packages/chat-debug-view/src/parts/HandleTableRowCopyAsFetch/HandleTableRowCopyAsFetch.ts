import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { isRecord } from '../IsRecord/IsRecord.ts'
import { getCurrentEvents } from '../LoadEvents/GetCurrentEvents/GetCurrentEvents.ts'

const escapeSingleQuotedString = (value: string): string => {
  return value.replaceAll('\\', '\\\\').replaceAll("'", "\\'")
}

const toSingleQuotedString = (value: string): string => {
  return `'${escapeSingleQuotedString(value)}'`
}

const indent = (value: string, count: number): string => {
  const prefix = ' '.repeat(count)
  return value
    .split('\n')
    .map((line) => `${prefix}${line}`)
    .join('\n')
}

const getHeaderLines = (value: unknown): readonly string[] => {
  if (!isRecord(value)) {
    return []
  }
  const lines: string[] = []
  for (const [key, headerValue] of Object.entries(value)) {
    if (typeof headerValue === 'string' || typeof headerValue === 'number' || typeof headerValue === 'boolean') {
      lines.push(`    ${toSingleQuotedString(key)}: ${toSingleQuotedString(String(headerValue))},`)
    }
  }
  if (lines.length === 0) {
    return []
  }
  return ['  headers: {', ...lines, '  },']
}

const getBodyLine = (value: unknown): string => {
  if (typeof value === 'string') {
    return `  body: ${toSingleQuotedString(value)},`
  }
  if (typeof value === 'function' || typeof value === 'symbol' || typeof value === 'bigint') {
    return `  body: ${toSingleQuotedString(String(value))},`
  }
  let serializedBody: string
  try {
    serializedBody = JSON.stringify(value, null, 2)
  } catch {
    return `  body: ${toSingleQuotedString(String(value))},`
  }
  if (!serializedBody) {
    return `  body: ${toSingleQuotedString(String(value))},`
  }
  return `  body: JSON.stringify(\n${indent(serializedBody, 4)}\n  ),`
}

const getFetchCode = (event: ChatViewEvent): string | undefined => {
  if (typeof event.url !== 'string') {
    return undefined
  }
  const lines: string[] = []
  if (typeof event.method === 'string' && event.method !== 'GET') {
    lines.push(`  method: ${toSingleQuotedString(event.method)},`)
  }
  lines.push(...getHeaderLines(event.headers))
  if (event.body !== undefined) {
    lines.push(getBodyLine(event.body))
  }
  if (lines.length === 0) {
    return `fetch(${toSingleQuotedString(event.url)})`
  }
  return `fetch(${toSingleQuotedString(event.url)}, {\n${lines.join('\n')}\n})`
}

export const handleTableRowCopyAsFetch = async (state: ChatDebugViewState, eventIndex: number): Promise<ChatDebugViewState> => {
  const currentEvents = getCurrentEvents(state)
  const event = currentEvents[eventIndex]
  if (!event) {
    return state
  }
  const fetchCode = getFetchCode(event)
  if (fetchCode) {
    await RendererWorker.writeClipBoardText(fetchCode)
    return state
  }
  const text = JSON.stringify(event, null, 2)
  await RendererWorker.writeClipBoardText(text)
  return state
}
