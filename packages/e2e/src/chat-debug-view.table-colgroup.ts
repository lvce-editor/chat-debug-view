import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.table-colgroup'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  const sessionId = 'e2e-session-table-colgroup'

  await ChatDebug.open(sessionId)
  const locator1 = Locator('.ChatDebugView')
  await expect(locator1).toBeVisible()
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
  await expect(cols).toHaveCount(5)
  const col0 = cols.nth(0)
  await expect(col0).toBeVisible()
  await expect(col0).toHaveAttribute('class', 'TableCol TableColZero')
  const col1 = cols.nth(1)
  await expect(col1).toBeVisible()
  await expect(col1).toHaveAttribute('class', 'TableCol TableColOne')
  const col2 = cols.nth(2)
  await expect(col2).toBeVisible()
  await expect(col2).toHaveAttribute('class', 'TableCol TableColTwo')
  const col3 = cols.nth(3)
  await expect(col3).toBeVisible()
  await expect(col3).toHaveAttribute('class', 'TableCol TableColThree')
  const col4 = cols.nth(4)
  await expect(col4).toBeVisible()
  await expect(col4).toHaveAttribute('class', 'TableCol TableColFour')
}
