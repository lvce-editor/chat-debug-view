import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.filter-token-only'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  // arrange
  await ChatDebug.open('e2e-session-filter-token-only')
  const locator1 = Locator('.ChatDebugView')
  await expect(locator1).toBeVisible()

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
  const rows = Locator('.TableBody .TableRow')
  await expect(rows).toHaveCount(1)
  const rowsNth0 = rows.nth(0)
  await expect(rowsNth0).toContainText('tool-execution-started')
}
