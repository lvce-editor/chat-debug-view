import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.filter-events-whitespace-case'

export const skip = 1

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  // arrange
  await ChatDebug.open('e2e-session-filter-whitespace-case')
  const locator1 = Locator('.ChatDebugView')
  await expect(locator1).toBeVisible()

  const events = [
    {
      sessionId: 'e2e-session-filter-whitespace-case',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
      url: 'https://example.com/alpha',
    },
    {
      sessionId: 'e2e-session-filter-whitespace-case',
      timestamp: '2026-03-08T00:00:01.000Z',
      type: 'handle-response',
      value: 'Beta response',
    },
  ]

  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()

  // act
  await ChatDebug.setFilter('   BETA   ')

  // assert
  const rows = Locator('.TableBody .TableRow')
  await expect(rows).toHaveCount(1)
  const firstRow = rows.nth(0)
  await expect(firstRow).toContainText('handle-response')
}
