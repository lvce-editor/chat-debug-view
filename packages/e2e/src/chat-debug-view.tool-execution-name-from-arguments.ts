import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.tool-execution-name-from-arguments'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  // arrange
  await ChatDebug.open('e2e-session-tool-execution-name-from-arguments')
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const events = [
    {
      arguments: {
        id: 'call_1',
        name: 'read_file',
        uri: 'file:///tmp/file.txt',
      },
      sessionId: 'e2e-session-tool-execution-name-from-arguments',
      timestamp: '2026-03-08T00:00:02.000Z',
      type: 'tool-execution',
    },
  ]

  // act
  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()

  // assert
  const rows = Locator('.TableBody .TableRow')
  await expect(rows).toHaveCount(1)
  await expect(rows.nth(0)).toContainText('tool-execution, read_file')
  await expect(rows.nth(0)).toContainText('200')
}
