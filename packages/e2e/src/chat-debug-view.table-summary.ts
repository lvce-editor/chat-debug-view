import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.table-summary'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  await ChatDebug.open('e2e-session-table-summary')
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const events = [
    {
      ended: '2026-03-08T00:00:00.250Z',
      sessionId: 'e2e-session-table-summary',
      started: '2026-03-08T00:00:00.000Z',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
    {
      sessionId: 'e2e-session-table-summary',
      timestamp: '2026-03-08T00:00:01.000Z',
      type: 'response',
    },
  ]

  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()

  const tableSummary = Locator('.ChatDebugViewTableSummary')

  await expect(tableSummary).toBeVisible()
  await expect(tableSummary).toHaveAttribute('role', 'status')
  await expect(tableSummary).toHaveText('2 events, 1s from start to finish')
}
