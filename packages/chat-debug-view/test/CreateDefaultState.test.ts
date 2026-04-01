import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('createDefaultState should return expected defaults', () => {
  const state = createDefaultState()
  expect(state).toBeDefined()
  expect(state.useDevtoolsLayout).toBe(true)
  expect(state.eventCategoryFilterOptions).toEqual([
    {
      label: 'All',
      value: 'all',
    },
    {
      label: 'Tools',
      value: 'tools',
    },
    {
      label: 'Network',
      value: 'network',
    },
    {
      label: 'UI',
      value: 'ui',
    },
    {
      label: 'Stream',
      value: 'stream',
    },
  ])
})
