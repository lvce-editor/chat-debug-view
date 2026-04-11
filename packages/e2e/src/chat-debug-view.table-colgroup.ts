import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.table-colgroup'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  const sessionId = 'e2e-session-table-colgroup'

  await ChatDebug.open(sessionId)
  await expect(Locator('.ChatDebugView')).toBeVisible()
  await ChatDebug.useDevtoolsLayout()

  const events = [
    {
      ended: '2026-03-08T00:00:01.250Z',
      eventId: 1,
      sessionId,
      started: '2026-03-08T00:00:01.000Z',
      timestamp: '2026-03-08T00:00:01.000Z',
      type: 'request',
    },
  ]

  await ChatDebug.setEvents(events)

  const table = Locator('.Table')
  const colGroup = Locator('colgroup')
  const cols = Locator('col')

  await expect(table).toBeVisible()
  await expect(colGroup).toHaveCount(1)
  await expect(colGroup).toBeVisible()
  await expect(cols).toHaveCount(3)
  await expect(cols.nth(0)).toBeVisible()
  await expect(cols.nth(0)).toHaveAttribute('class', 'TableCol TableColZero')
  await expect(cols.nth(1)).toBeVisible()
  await expect(cols.nth(1)).toHaveAttribute('class', 'TableCol TableColOne')
  await expect(cols.nth(2)).toBeVisible()
  await expect(cols.nth(2)).toHaveAttribute('class', 'TableCol TableColTwo')
}
