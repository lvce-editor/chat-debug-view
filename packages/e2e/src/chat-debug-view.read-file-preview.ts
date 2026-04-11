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

  const detailsEvent = Locator('.ChatDebugViewEvent')
  const lineNumbers = Locator('.ChatDebugViewEventLineNumber')

  await expect(detailsEvent).toHaveText('1first line2second line')
  await expect(lineNumbers).toHaveCount(2)
  await expect(lineNumbers.nth(0)).toHaveText('1')
  await expect(lineNumbers.nth(1)).toHaveText('2')
  await expect(detailsEvent).not.toContainText('"name": "read_file"')
  await expect(detailsEvent).not.toContainText('"arguments"')
  await expect(detailsEvent).not.toContainText('"result"')
}