import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.filter-event-category-token'

export const test: Test = async ({ Command, expect, Locator }) => {
  // arrange
  await Command.execute('Main.openUri', 'chat-debug://e2e-session-filter-token')
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const events = [
    {
      path: '/chat',
      sessionId: 'e2e-session-filter-token',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
    {
      arguments: {
        path: '/tmp/file.txt',
      },
      sessionId: 'e2e-session-filter-token',
      timestamp: '2026-03-08T00:00:01.000Z',
      toolName: 'read_file',
      type: 'tool-execution-started',
    },
    {
      output: {
        contents: 'hello',
      },
      sessionId: 'e2e-session-filter-token',
      timestamp: '2026-03-08T00:00:02.000Z',
      toolName: 'read_file',
      type: 'tool-execution-finished',
    },
  ]

  // act
  await Command.execute('ChatDebug.setEvents', events)
  await Locator('input[name="useDevtoolsLayout"]').click()
  await Locator('.InputBox[name="filter"]').type('@tools hello')

  // assert
  const rows = Locator('.ChatDebugViewEventRow')
  await expect(rows).toHaveCount(1)
  await expect(rows.nth(0)).toContainText('tool-execution')
}