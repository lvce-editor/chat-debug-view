import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.read-file-preview'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  const sessionId = 'e2e-session-read-file-preview'
  await ChatDebug.open(sessionId)
  await expect(Locator('.ChatDebugView')).toBeVisible()

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
  const lineNumbers = Locator('.ChatDebugViewEventLineNumber')
  const lineContents = Locator('.ChatDebugViewEventLineContent')

  await expect(detailsBottom).toHaveText('1first line2second line')
  await expect(lineNumbers).toHaveCount(2)
  await expect(lineNumbers.nth(0)).toHaveText('1')
  await expect(lineNumbers.nth(1)).toHaveText('2')
  await expect(lineContents).toHaveCount(2)
  await expect(lineContents.nth(0)).toHaveText('first line')
  await expect(lineContents.nth(1)).toHaveText('second line')
}
