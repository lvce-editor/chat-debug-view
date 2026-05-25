import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.filter-input-wrapper'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  // arrange
  await ChatDebug.open('e2e-session-filter-input-wrapper')
  const view = Locator('.ChatDebugView')
  await expect(view).toBeVisible()

  const events = [
    {
      sessionId: 'e2e-session-filter-input-wrapper',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
  ]

  // act
  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()

  // assert
  const searchField = Locator('.SearchField')
  await expect(searchField).toBeVisible()
  await expect(searchField).toHaveAttribute('role', 'none')
  await expect(searchField.locator('.ChatDebugViewFilterInput--devtools')).toBeVisible()
}
