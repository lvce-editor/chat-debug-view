import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.list-files-error-preview'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  const sessionId = 'e2e-session-list-files-error-preview'
  await ChatDebug.open(sessionId)
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const events = [
    {
      arguments: {
        uri: '/workspace',
      },
      name: 'list_files',
      result: {
        error: {
          message: 'Invalid argument: uri must be an absolute URI.',
        },
      },
      sessionId,
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
  await expect(detailsBottom).toContainText('"message": "Invalid argument: uri must be an absolute URI."')
}
