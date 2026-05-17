import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.read-file-preview'

export const skip = 1

export const test: Test = async ({ ChatDebug, Command, expect, Locator }) => {
  const sessionId = 'e2e-session-read-file-preview'
  await ChatDebug.open(sessionId)
  const locator1 = Locator('.ChatDebugView')
  await expect(locator1).toBeVisible()
  const previewText = 'first line\nsecond line'
  const events = [
    {
      arguments: {
        uri: 'file:///workspace/example.txt',
      },
      name: 'read_file',
      result: previewText,
      sessionId,
      timestamp: '2026-04-11T09:00:00.000Z',
      type: 'tool-execution',
    },
  ]

  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()
  await ChatDebug.selectEventRow(0)
  await ChatDebug.openTabPreview()

  const detailsBottom = Locator('.ChatDebugViewDetailsBottom')
  const cursor = Locator('.EditorSelection')
  const lineNumbers = Locator('.ChatDebugViewEventLineNumber')
  const lineContents = Locator('.ChatDebugViewEventLineContent')

  await expect(detailsBottom).toHaveText('1first line2second line')
  await expect(cursor).toHaveCount(0)
  await expect(lineNumbers).toHaveCount(2)
  const lineNumber0 = lineNumbers.nth(0)
  await expect(lineNumber0).toHaveText('1')
  const lineNumber1 = lineNumbers.nth(1)
  await expect(lineNumber1).toHaveText('2')
  await expect(lineContents).toHaveCount(2)
  const lineContent0 = lineContents.nth(0)
  await expect(lineContent0).toHaveText('first line')
  const lineContent1 = lineContents.nth(1)
  await expect(lineContent1).toHaveText('second line')

  await Command.execute('ChatDebug.handlePreviewTextPointerDown', 28, 21)

  await expect(cursor).toHaveAttribute('style', 'height: 20px; left: 27px; top: 20px; width: 0px;')
}
