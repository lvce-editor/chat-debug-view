import { expect, test } from '@jest/globals'
import * as DetailTab from '../src/parts/DetailTab/DetailTab.ts'
import { getDetailsLineNumberWidth } from '../src/parts/GetDetailsLineNumberWidth/GetDetailsLineNumberWidth.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'
import { defaultPreviewTextColumnWidth } from '../src/parts/PreviewTextCursor/PreviewTextCursor.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

const createObjectWithKeys = (count: number): Record<string, string> => {
  return Object.fromEntries(Array.from({ length: count }, (_, index) => [`key${index + 1}`, `value${index + 1}`]))
}

test('getDetailsLineNumberWidth should return 0 without selected event', () => {
  const result = getDetailsLineNumberWidth(createDefaultState())

  expect(result).toBe(0)
})

test('getDetailsLineNumberWidth should size preview line numbers from the current preview text', () => {
  const selectedEvent = {
    eventId: 1,
    name: 'read_file',
    result: Array.from({ length: 100 }, (_, index) => `line ${index + 1}`).join('\n'),
    type: 'tool-execution',
  }
  const state = {
    ...createDefaultState(),
    detailTabs: DetailTab.createDetailTabs(InputName.Preview, selectedEvent),
    selectedEvent,
  }

  const result = getDetailsLineNumberWidth(state)

  expect(result).toBe(3 * defaultPreviewTextColumnWidth)
})

test('getDetailsLineNumberWidth should size payload line numbers from pretty-printed payload content', () => {
  const selectedEvent = {
    arguments: createObjectWithKeys(100),
    eventId: 1,
    requestEvent: {
      arguments: createObjectWithKeys(100),
      eventId: 2,
      type: 'request',
    },
    type: 'tool-execution',
  }
  const state = {
    ...createDefaultState(),
    detailTabs: DetailTab.createDetailTabs(InputName.Payload, selectedEvent),
    selectedEvent,
  }

  const result = getDetailsLineNumberWidth(state)

  expect(result).toBe(3 * defaultPreviewTextColumnWidth)
})

test('getDetailsLineNumberWidth should return 0 when preview line numbers are intentionally hidden', () => {
  const selectedEvent = {
    eventId: 1,
    text: 'first line\nsecond line',
    type: 'chat-message-updated',
  }
  const state = {
    ...createDefaultState(),
    detailTabs: DetailTab.createDetailTabs(InputName.Preview, selectedEvent),
    selectedEvent,
  }

  const result = getDetailsLineNumberWidth(state)

  expect(result).toBe(0)
})
