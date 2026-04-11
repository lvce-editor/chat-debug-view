import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.table-focus-outline'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  const sessionId = 'e2e-session-table-focus-outline'

  await ChatDebug.open(sessionId)
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const events = [
    {
      ended: '2026-03-08T00:00:01.250Z',
      sessionId,
      started: '2026-03-08T00:00:01.000Z',
      timestamp: '2026-03-08T00:00:01.000Z',
      type: 'request',
    },
  ]

  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()

  const table = Locator('.Table')
  const tableWrapper = Locator('.TableWrapper')

  await table.click()

  await expect(table).toBeFocused()
  await expect(tableWrapper).toHaveAttribute('class', 'TableWrapper FocusOutline')
}
