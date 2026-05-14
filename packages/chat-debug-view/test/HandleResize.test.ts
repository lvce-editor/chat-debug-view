import { expect, test } from '@jest/globals'
import * as HandleResize from '../src/parts/HandleResize/HandleResize.ts'
import { getDetailsWidth } from '../src/parts/SplitLayout/SplitLayout.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('handleResize should merge dimensions into state', () => {
  const state = createDefaultState()
  const result = HandleResize.handleResize(state, {
    height: 400,
    width: 300,
    x: 10,
    y: 20,
  })

  expect(result.x).toBe(10)
  expect(result.y).toBe(20)
  expect(result.width).toBe(300)
  expect(result.height).toBe(400)
  expect(result.uid).toBe(state.uid)
})

test('handleResize should clamp tableWidth for the next viewport width', () => {
  const state = {
    ...createDefaultState(),
    height: 700,
    tableWidth: 596,
    width: 900,
  }

  const result = HandleResize.handleResize(state, {
    height: 500,
    width: 600,
    x: 0,
    y: 0,
  })

  expect(result.tableWidth).toBe(300)
  expect(getDetailsWidth(result, result.tableWidth)).toBe(280)
})

test('handleResize should use a balanced split on narrow screens when details are visible', () => {
  const selectedEvent = {
    eventId: 1,
    sessionId: 'session-1',
    timestamp: '2026-03-08T00:00:00.000Z',
    type: 'request',
  }
  const state = {
    ...createDefaultState(),
    selectedEvent,
    tableWidth: 240,
    useDevtoolsLayout: true,
    width: 900,
  }

  const result = HandleResize.handleResize(state, {
    height: 500,
    width: 580,
    x: 0,
    y: 0,
  })

  expect(result.tableWidth).toBe(280)
  expect(getDetailsWidth(result, result.tableWidth)).toBe(280)
})

test('handleResize should preserve manual sash widths on narrow screens', () => {
  const selectedEvent = {
    eventId: 1,
    sessionId: 'session-1',
    timestamp: '2026-03-08T00:00:00.000Z',
    type: 'request',
  }
  const state = {
    ...createDefaultState(),
    selectedEvent,
    tableWidth: 260,
    tableWidthManuallyResized: true,
    useDevtoolsLayout: true,
    width: 900,
  }

  const result = HandleResize.handleResize(state, {
    height: 500,
    width: 580,
    x: 0,
    y: 0,
  })

  expect(result.tableWidth).toBe(260)
  expect(getDetailsWidth(result, result.tableWidth)).toBe(300)
})
