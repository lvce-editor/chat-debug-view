import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.list-files-error-preview'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  const sessionId = 'e2e-session-list-files-error-preview'
  await ChatDebug.open(sessionId)
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const events = [
    {
      arguments: {
        uri: '/home/simon/Documents/fib',
      },
      ended: '2026-04-12T12:56:05.662Z',
      name: 'list_files',
      options: {
        platform: 2,
        workspaceUri: '/home/simon/Documents/fib',
      },
      result: {
        error: 'Invalid argument: uri must be an absolute URI.',
        errorCode: 'E_INVALID_URI',
      },
      sessionId,
      started: '2026-04-12T12:56:05.657Z',
      status: 'error',
      timestamp: '2026-04-13T10:00:00.000Z',
      type: 'tool-execution',
    },
  ]

  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()
  await ChatDebug.selectEventRow(0)
  await ChatDebug.openTabPreview()

  const row = Locator('.TableBody .TableRow').nth(0)
  const statusCell = Locator('.ChatDebugViewCellStatusError').nth(0)
  const detailsBottom = Locator('.ChatDebugViewDetailsBottom')

  await expect(row).toContainText('400')
  await expect(statusCell).toHaveText('400')
  await expect(detailsBottom).toContainText('Invalid argument: uri must be an absolute URI.')
}
