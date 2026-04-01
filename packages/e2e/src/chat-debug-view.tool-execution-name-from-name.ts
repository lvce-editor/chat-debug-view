import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.tool-execution-name-from-name'

export const test: Test = async ({ Command, expect, Locator }) => {
  await Command.execute('Main.openUri', 'chat-debug://e2e-session-tool-execution-name-from-name')
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const events = [
    {
      arguments: {
        baseUri: '/home/simon/Documents/levivilet/chat-debug-view',
        pattern: '**/*',
      },
      error: 'Invalid argument: baseUri must be an absolute URI.',
      name: 'getWorkspaceUri',
      sessionId: 'e2e-session-tool-execution-name-from-name',
      timestamp: '2026-04-01T20:56:07.857Z',
      type: 'tool-execution',
    },
  ]

  await Command.execute('ChatDebug.setEvents', events)
  await Command.execute('ChatDebug.handleInput', 'useDevtoolsLayout', '', true)

  const rows = Locator('.ChatDebugViewEventRow')
  await expect(rows).toHaveCount(1)
  await expect(rows.nth(0)).toContainText('tool-execution, getWorkspaceUri')
  await expect(rows.nth(0)).toContainText('400')
}
