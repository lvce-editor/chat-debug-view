import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.table-accessibility'

export const test: Test = async ({ ChatDebug, expect, KeyBoard, Locator }) => {
  // arrange
  await ChatDebug.open('e2e-session-table-accessibility')
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const events = [
    {
      ended: '2026-03-08T00:00:01.250Z',
      sessionId: 'e2e-session-table-accessibility',
      started: '2026-03-08T00:00:01.000Z',
      timestamp: '2026-03-08T00:00:01.000Z',
      type: 'request',
    },
    {
      ended: '2026-03-08T00:00:02.500Z',
      sessionId: 'e2e-session-table-accessibility',
      started: '2026-03-08T00:00:02.000Z',
      timestamp: '2026-03-08T00:00:02.000Z',
      type: 'response',
    },
  ]

  // act
  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()

  const table = Locator('.Table')

  // assert
  await expect(table).toHaveAttribute('tabindex', '0')

  // act
  await table.click()
  await KeyBoard.press('ArrowDown')

  // assert
  await expect(table).toBeFocused()
  await expect(Locator('.TableRowSelected')).toHaveCount(1)
  await expect(Locator('.TableRowSelected')).toContainText('request')
}
