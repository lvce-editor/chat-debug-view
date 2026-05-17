import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.list-files-error-preview'

export const skip = 1

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  const sessionId = 'e2e-session-list-files-error-preview'
  await ChatDebug.open(sessionId)
  const locator1 = Locator('.ChatDebugView')
  await expect(locator1).toBeVisible()

  const events = [
    {
      arguments: {
        uri: '/test/fib',
      },
      ended: '2026-04-12T12:56:05.662Z',
      name: 'list_files',
      options: {
        platform: 2,
        workspaceUri: '/test/fib',
      },
      result: {
        error: {
          message: 'Invalid argument: uri must be an absolute URI.',
        },
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
  const lineContents = Locator('.EditorRow')

  await expect(row).toContainText('400')
  await expect(statusCell).toHaveText('400')
  await expect(detailsBottom).toContainText('"errorCode": "E_INVALID_URI"')
  await expect(lineNumbers).toHaveCount(6)
  const lineNumber0 = lineNumbers.nth(0)
  await expect(lineNumber0).toHaveText('1')
  const lineNumber5 = lineNumbers.nth(5)
  await expect(lineNumber5).toHaveText('6')
  await expect(lineContents).toHaveCount(6)
  const lineContent1 = lineContents.nth(1)
  await expect(lineContent1).toHaveText('  "error": {')
  const lineContent2 = lineContents.nth(2)
  await expect(lineContent2).toHaveText('    "message": "Invalid argument: uri must be an absolute URI."')
  const lineContent4 = lineContents.nth(4)
  await expect(lineContent4).toHaveText('  "errorCode": "E_INVALID_URI"')
}
