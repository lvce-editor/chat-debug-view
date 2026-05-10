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
  await expect(headerCells).toHaveCount(4)
  const headerCellsNth0 = headerCells.nth(0)
  await expect(headerCellsNth0).toHaveText('Type')
  const headerCellsNth1 = headerCells.nth(1)
  await expect(headerCellsNth1).toHaveText('Method')
  const headerCellsNth2 = headerCells.nth(2)
  await expect(headerCellsNth2).toHaveText('Status')
  const headerCellsNth3 = headerCells.nth(3)
  await expect(headerCellsNth3).toHaveText('Time')
}
