import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.list-files-error-preview'

export const skip = 1

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
<<<<<<< HEAD
        error: {
          message: 'Invalid argument: uri must be an absolute URI.',
        },
=======
        error: 'Invalid argument: uri must be an absolute URI.',
>>>>>>> origin/main
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
  const lineNumbers = Locator('.ChatDebugViewEventLineNumber')
  const lineContents = Locator('.ChatDebugViewEventLineContent')

  await expect(row).toContainText('400')
  await expect(statusCell).toHaveText('400')
<<<<<<< HEAD
  await expect(detailsBottom).toContainText('"errorCode": "E_INVALID_URI"')
  await expect(lineNumbers).toHaveCount(6)
  await expect(lineNumbers.nth(0)).toHaveText('1')
  await expect(lineNumbers.nth(5)).toHaveText('6')
  await expect(lineContents).toHaveCount(6)
  await expect(lineContents.nth(1)).toHaveText('  "error": {')
  await expect(lineContents.nth(2)).toHaveText('    "message": "Invalid argument: uri must be an absolute URI."')
  await expect(lineContents.nth(4)).toHaveText('  "errorCode": "E_INVALID_URI"')
=======
  await expect(detailsBottom).toContainText('Invalid argument: uri must be an absolute URI.')
>>>>>>> origin/main
}
