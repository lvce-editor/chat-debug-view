import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.empty-filter-results'

export const skip = 1

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  // arrange
  await ChatDebug.open('e2e-session-empty-filter-results')
  const locator1 = Locator('.ChatDebugView')
  await expect(locator1).toBeVisible()

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
  const locator2 = Locator('.ChatDebugViewEmpty')
  await expect(locator2).toBeVisible()
  const locator3 = Locator('.ChatDebugViewEmpty')
  await expect(locator3).toHaveText('No events found matching missing')
  const locator4 = Locator('.TableRow')
  await expect(locator4).toHaveCount(0)
}
