import { expect, test } from '@jest/globals'
import * as HeaderSectionKey from '../src/parts/HeaderSectionKey/HeaderSectionKey.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'
import { toggleHeadersSection } from '../src/parts/ToggleHeadersSection/ToggleHeadersSection.ts'

test('toggleHeadersSection should collapse a visible section', () => {
  const state = createDefaultState()

  const result = toggleHeadersSection(state, HeaderSectionKey.General)

  expect(result.collapsedHeaderSections).toEqual([HeaderSectionKey.General])
})

test('toggleHeadersSection should expand a collapsed section', () => {
  const state = {
    ...createDefaultState(),
    collapsedHeaderSections: [HeaderSectionKey.General] as const,
  }

  const result = toggleHeadersSection(state, HeaderSectionKey.General)

  expect(result.collapsedHeaderSections).toEqual([])
})

test('toggleHeadersSection should ignore invalid section names', () => {
  const state = createDefaultState()

  const result = toggleHeadersSection(state, 'invalid')

  expect(result).toBe(state)
})
