import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.read-file-structured-preview'

export const test: Test = async ({ ChatDebug, Command, expect, Locator }) => {
  const sessionId = 'e2e-session-read-file-structured-preview'
  const previewText = 'first line\nsecond line'

  await ChatDebug.open(sessionId)
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const events = [
    {
      arguments: {
        uri: 'file:///workspace/example.txt',
      },
      name: 'read_file',
      result: [
        {
          content: previewText,
        },
      ],
      sessionId,
      timestamp: '2026-04-29T09:00:00.000Z',
      type: 'tool-execution',
    },
  ]

  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()
  await ChatDebug.selectEventRow(0)
  await ChatDebug.openTabPreview()

  const detailsBottom = Locator('.ChatDebugViewDetailsBottom')
  const editorContent = Locator('.ChatDebugViewDetailsBottom .EditorContent')
  const cursor = Locator('.EditorSelection')
  const lineNumbers = Locator('.ChatDebugViewEventLineNumber')
  const lineContents = Locator('.ChatDebugViewEventLineContent')

  await expect(detailsBottom).toContainText('first line')
  await expect(detailsBottom).toContainText('second line')
  await expect(editorContent).not.toContainText('"name": "read_file"')
  await expect(editorContent).not.toContainText('"arguments": {')
  await expect(editorContent).not.toContainText('"result": [')
  await expect(cursor).toHaveCount(0)
  await expect(lineNumbers).toHaveCount(2)
  await expect(lineNumbers.nth(0)).toHaveText('1')
  await expect(lineNumbers.nth(1)).toHaveText('2')
  await expect(lineContents).toHaveCount(2)
  await expect(lineContents.nth(0)).toHaveText('first line')
  await expect(lineContents.nth(1)).toHaveText('second line')

  await Command.execute('ChatDebug.handleInput', 'detailTab', 'payload', false)

  await expect(editorContent).toContainText('"name": "read_file"')
  await expect(editorContent).toContainText('"arguments": {')
  await expect(editorContent).toContainText('"result": [')

  await Command.execute('ChatDebug.handleInput', 'detailTab', 'preview', false)
  await Command.execute('ChatDebug.handlePreviewTextPointerDown', 28, 21)

  await expect(cursor).toHaveAttribute('style', 'height: 20px; left: 27px; top: 20px; width: 0px;')
}
