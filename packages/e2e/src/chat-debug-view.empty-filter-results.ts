import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.empty-filter-results'

export const skip = 1

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  // arrange
  await ChatDebug.open('e2e-session-empty-filter-results')
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const events = [
    {
      sessionId: 'e2e-session-empty-filter-results',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
      url: 'https://example.com/alpha',
    },
  ]
  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()

  // act
  await ChatDebug.setFilter('missing')

  // assert
  await expect(Locator('.ChatDebugViewEmpty')).toBeVisible()
  await expect(Locator('.ChatDebugViewEmpty')).toContainText('no events found matching missing')
  await expect(Locator('.ChatDebugViewEventRow')).toHaveCount(0)
}
