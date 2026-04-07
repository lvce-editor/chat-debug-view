import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.filter-events'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  // arrange
  await ChatDebug.open('e2e-session-filter')
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const events = [
    {
      sessionId: 'e2e-session-filter',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
      url: 'https://example.com/alpha',
    },
    {
      sessionId: 'e2e-session-filter',
      timestamp: '2026-03-08T00:00:01.000Z',
      type: 'handle-response',
      value: 'Beta response',
    },
    {
      sessionId: 'e2e-session-filter',
      target: 'Gamma button',
      timestamp: '2026-03-08T00:00:02.000Z',
      type: 'handle-click',
    },
  ]
  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()

  // act
  await ChatDebug.setFilter('beta')

  // assert
  const rows = Locator('.ChatDebugViewEventRow')
  await expect(rows).toHaveCount(1)
  await expect(rows.nth(0)).toContainText('handle-response')
}
