import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.tool-execution-name-from-name'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  // arrange
  await ChatDebug.open('e2e-session-tool-execution-name-from-name')
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const events = [
    {
      arguments: {
        baseUri: '/test/chat-debug-view',
        pattern: '**/*',
      },
      error: 'Invalid argument: baseUri must be an absolute URI.',
      name: 'getWorkspaceUri',
      sessionId: 'e2e-session-tool-execution-name-from-name',
      timestamp: '2026-04-01T20:56:07.857Z',
      type: 'tool-execution',
    },
  ]

  // act
  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()

  const rows = Locator('.TableRow')

  // assert
  await expect(rows).toHaveCount(1)
  await expect(rows.nth(0)).toContainText('tool-execution, getWorkspaceUri')
  await expect(rows.nth(0)).toContainText('400')
}
