import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.filter-input-accessibility'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  // arrange
  await ChatDebug.open('e2e-session-filter-input-accessibility')
  const locator1 = Locator('.ChatDebugView')
  await expect(locator1).toBeVisible()

  const events = [
    {
      sessionId: 'e2e-session-filter-input-accessibility',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
  ]

  // act
  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()

  // assert
  const filterInput = Locator('.ChatDebugViewFilterInput--devtools')
  await expect(filterInput).toBeVisible()
  await expect(filterInput).toHaveAttribute('type', 'search')
  await expect(filterInput).toHaveAttribute('name', 'filter')
  await expect(filterInput).toHaveAttribute('placeholder', 'Filter events')
  await expect(filterInput).toHaveAttribute('autocomplete', 'off')
}
