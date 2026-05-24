import { expect, test } from '@jest/globals'
import * as IsUiEvent from '../src/parts/IsUiEvent/IsUiEvent.ts'

test('isUiEvent should return true for handled ui events', () => {
  const result = IsUiEvent.isUiEvent({
    eventId: 1,
    subType: 'handle-input',
    type: 'handle-input',
  })

  expect(result).toBe(true)
})

test('isUiEvent should return false for handle-response events', () => {
  const result = IsUiEvent.isUiEvent({
    eventId: 1,
    subType: 'handle-response',
    type: 'handle-response',
  })

  expect(result).toBe(false)
})

test('isUiEvent should return false for non-ui events', () => {
  const result = IsUiEvent.isUiEvent({
    eventId: 1,
    subType: 'request',
    type: 'request',
  })

  expect(result).toBe(false)
})
