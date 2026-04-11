import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.filter-token-only'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  // arrange
  await ChatDebug.open('e2e-session-filter-token-only')
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const events = [
    {
      path: '/chat',
      sessionId: 'e2e-session-filter-token-only',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
    {
      arguments: {
        path: '/tmp/file.txt',
      },
      sessionId: 'e2e-session-filter-token-only',
      timestamp: '2026-03-08T00:00:01.000Z',
      toolName: 'read_file',
      type: 'tool-execution-started',
    },
  ]

  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()

  // act
  await ChatDebug.setFilter('@TOOLS')

  // assert
  const rows = Locator('.TableRow')
  await expect(rows).toHaveCount(1)
  await expect(rows.nth(0)).toContainText('tool-execution-started')
}
