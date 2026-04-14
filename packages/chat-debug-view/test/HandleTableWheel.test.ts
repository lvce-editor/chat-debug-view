import { expect, test } from '@jest/globals'
import { handleTableWheel } from '../src/parts/HandleTableWheel/HandleTableWheel.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

const createEvents = (count: number): readonly { readonly eventId: number; readonly type: string }[] => {
  return Array.from({ length: count }, (_, index) => {
    return {
      eventId: index + 1,
      type: index % 2 === 0 ? 'request' : 'response',
    }
  })
}

test('handleTableWheel should increase the table delta and visible window', () => {
  const state = {
    ...createDefaultState(),
    events: createEvents(20),
    height: 600,
    useDevtoolsLayout: true,
    width: 900,
    x: 10,
    y: 20,
  }

  const result = handleTableWheel(state, 48)

  expect(result.tableDeltaY).toBe(48)
  expect(result.tableMinLineY).toBe(2)
  expect(result.tableMaxLineY).toBeGreaterThan(result.tableMinLineY)
})

test('handleTableWheel should clamp negative scrolling at zero', () => {
  const state = {
    ...createDefaultState(),
    events: createEvents(20),
    height: 600,
    tableDeltaY: 24,
    useDevtoolsLayout: true,
    width: 900,
    x: 10,
    y: 20,
  }

  const result = handleTableWheel(state, -96)

  expect(result.tableDeltaY).toBe(0)
  expect(result.tableMinLineY).toBe(0)
})
