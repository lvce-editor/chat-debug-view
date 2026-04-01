import { expect, test } from '@jest/globals'
import * as Create from '../src/parts/Create/Create.ts'
import * as ChatDebugViewStates from '../src/parts/State/ChatDebugViewStates.ts'

test('create should store state with the given uid', () => {
  const uid = 123
  Create.create(uid, 'file:///debug', 10, 20, 300, 400, 0, '/assets')
  const result = ChatDebugViewStates.get(uid)
  const { newState } = result
  const { oldState } = result

  expect(newState.uid).toBe(uid)
  expect(newState.uri).toBe('file:///debug')
  expect(newState.x).toBe(10)
  expect(newState.y).toBe(20)
  expect(newState.width).toBe(300)
  expect(newState.height).toBe(400)
  expect(newState.assetDir).toBe('/assets')
  expect(newState.sessionId).toBe('')
  expect(oldState.uid).toBe(uid)
})

test('create should restore useDevtoolsLayout from saved state', () => {
  const uid = 124
  Create.create(uid, 'file:///debug', 10, 20, 300, 400, 0, '/assets', '', 'lvce-chat-view-sessions', 2, 'chat-view-events', 'sessionId', {
    tableWidth: 222,
    useDevtoolsLayout: true,
  })
  const result = ChatDebugViewStates.get(uid)

  expect(result.newState.tableWidth).toBe(222)
  expect(result.oldState.tableWidth).toBe(222)
  expect(result.newState.useDevtoolsLayout).toBe(true)
  expect(result.oldState.useDevtoolsLayout).toBe(true)
})
