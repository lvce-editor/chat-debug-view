import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.devtools-layout'

export const test: Test = async ({ Command, expect, Locator }) => {
  // arrange
  await Command.execute('Main.openUri', 'chat-debug://e2e-session-devtools-layout')
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const events = [
    {
      ended: '2026-03-08T00:00:01.000Z',
      sessionId: 'e2e-session-devtools-layout',
      started: '2026-03-08T00:00:00.000Z',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
  ]

  // act
  await Command.execute('ChatDebug.setEvents', events)
  await Locator('.ChatDebugViewToggleUseDevtoolsLayout').click()

  // assert
  const root = Locator('.ChatDebugView--devtools')
  const table = Locator('.ChatDebugViewTable')
  const header = Locator('.ChatDebugViewTableHeader')
  const body = Locator('.ChatDebugViewTableBody')
  await expect(root).toBeVisible()
  await expect(table).toBeVisible()
  await expect(header).toBeVisible()
  await expect(header).toContainText('Type')
  await expect(header).toContainText('Started')
  await expect(header).toContainText('Ended')
  await expect(header).toContainText('Duration')
  await expect(header).toContainText('Status')
  await expect(body).toBeVisible()
}
