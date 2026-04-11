import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.get-workspace-uri-preview'

export const test: Test = async ({ ChatDebug, Command, expect, Locator }) => {
  // arrange
  await ChatDebug.open('e2e-session-get-workspace-uri-preview')
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const events = [
    {
      arguments: {
        baseUri: '/test/chat-debug-view',
        pattern: '**/*',
      },
      error: 'Invalid argument: baseUri must be an absolute URI.',
      name: 'getWorkspaceUri',
      result: {
        uri: 'file:///workspace',
      },
      sessionId: 'e2e-session-get-workspace-uri-preview',
      timestamp: '2026-04-01T20:56:07.857Z',
      type: 'tool-execution',
    },
  ]
  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()
  await ChatDebug.selectEventRow(0)

  // act
  await Command.execute('ChatDebug.handleInput', 'detailTab', 'preview', false)

  // assert
  const detailsBottom = Locator('.ChatDebugViewDetailsBottom')
  await expect(detailsBottom).toHaveText('1{2  "name": "getWorkspaceUri",3  "result": {4    "uri": "file:///workspace"5  }6}')
}
