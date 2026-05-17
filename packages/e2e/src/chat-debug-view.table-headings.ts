import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.table-headings-case'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  // arrange
  await ChatDebug.open('e2e-session-table-headings-case')
  const locator1 = Locator('.ChatDebugView')
  await expect(locator1).toBeVisible()
  await ChatDebug.useDevtoolsLayout()
  const events = [
    {
      ended: '2026-03-08T00:00:01.000Z',
      sessionId: 'e2e-session-table-headings-case',
      started: '2026-03-08T00:00:00.000Z',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
  ]

  // act
  await ChatDebug.setEvents(events)

  // assert
  const headerCells = Locator('th')
  await expect(headerCells).toHaveCount(5)
  const headerCell0 = headerCells.nth(0)
  await expect(headerCell0).toHaveText('Type')
  const headerCell1 = headerCells.nth(1)
  await expect(headerCell1).toHaveText('Method')
  const headerCell2 = headerCells.nth(2)
  await expect(headerCell2).toHaveText('Status')
  const headerCell3 = headerCells.nth(3)
  await expect(headerCell3).toHaveText('Size')
  const headerCell4 = headerCells.nth(4)
  await expect(headerCell4).toHaveText('Time')
}
