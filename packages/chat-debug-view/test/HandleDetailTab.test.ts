import { expect, test } from '@jest/globals'
import { getSelectedDetailTab } from '../src/parts/GetSelectedDetailTab/GetSelectedDetailTab.ts'
import * as SelectDetailTab from '../src/parts/HandleDetailTab/HandleDetailTab.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('selectDetailTab should update selected detail tab', () => {
  const state = createDefaultState()
  const result = SelectDetailTab.selectDetailTab(state, 'preview')
  expect(getSelectedDetailTab(result.detailTabs)).toBe('preview')
})

test('selectDetailTab should ignore invalid selected detail tab values', () => {
  const state = createDefaultState()
  const result = SelectDetailTab.selectDetailTab(state, 'headers')
  expect(result).toBe(state)
})

test('handleDetailTabsFocus should update selected detail tab', () => {
  const state = createDefaultState()
  const result = SelectDetailTab.handleDetailTabsFocus(state, 'payload')
  expect(getSelectedDetailTab(result.detailTabs)).toBe('payload')
})
