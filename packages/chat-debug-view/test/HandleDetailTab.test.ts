import { expect, test } from '@jest/globals'
import * as HandleDetailTab from '../src/parts/HandleDetailTab/HandleDetailTab.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('handleDetailTab should update selected detail tab', () => {
  const state = createDefaultState()
  const result = HandleDetailTab.selectDetailTab(state, 'preview')
  expect(result.selectedDetailTab).toBe('preview')
})

test('handleDetailTab should ignore invalid selected detail tab values', () => {
  const state = createDefaultState()
  const result = HandleDetailTab.selectDetailTab(state, 'headers')
  expect(result).toBe(state)
})
