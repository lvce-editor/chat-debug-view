import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.table-accessibility'

export const skip = 1

export const test: Test = async ({ ChatDebug, Command, expect, KeyBoard, Locator }) => {
  // arrange
  await ChatDebug.open('e2e-session-table-accessibility')
  const locator1 = Locator('.ChatDebugView')
  await expect(locator1).toBeVisible()

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
  await Command.execute('ChatDebug.handleTableFocus')
  await KeyBoard.press('ArrowDown')

  // assert
  await expect(table).toBeFocused()
  const locator2 = Locator('.TableRowSelected')
  await expect(locator2).toHaveCount(1)
  const locator3 = Locator('.TableRowSelected')
  await expect(locator3).toContainText('request')
}
