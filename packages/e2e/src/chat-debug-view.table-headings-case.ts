import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.table-headings-case'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  // arrange
  await ChatDebug.open('e2e-session-table-headings-case')
  await expect(Locator('.ChatDebugView')).toBeVisible()
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
  await expect(headerCells).toHaveCount(3)
  await expect(headerCells.nth(0)).toHaveText('Type')
  await expect(headerCells.nth(0)).toHaveCSS('text-transform', 'none')
  await expect(headerCells.nth(1)).toHaveText('Status')
  await expect(headerCells.nth(1)).toHaveCSS('text-transform', 'none')
  await expect(headerCells.nth(2)).toHaveText('Time')
  await expect(headerCells.nth(2)).toHaveCSS('text-transform', 'none')
}
