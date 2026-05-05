import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.large-payload-1k-lines'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  const sessionId = 'e2e-session-large-payload-1k-lines'
  await ChatDebug.open(sessionId)
  await expect(Locator('.ChatDebugView')).toBeVisible()
  const payloadText = Array.from({ length: 1000 }, (_, index) => `line ${index + 1}`).join('\n')
  const events = [
    {
      arguments: {
        uri: 'file:///workspace/large-1k.txt',
      },
      name: 'read_file',
      result: payloadText,
      sessionId,
      timestamp: '2026-04-13T10:00:00.000Z',
      type: 'tool-execution',
    },
  ]

  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()
  await ChatDebug.selectEventRow(0)
  await ChatDebug.openTabPreview()

  const lineNumbers = Locator('.ChatDebugViewEventLineNumber')
  const lineContents = Locator('.EditorRow')
  const previewEditor = Locator('.PreviewVirtualizedEditor')
  const previewScrollBar = Locator('.PreviewTextScrollBar')

  await expect(previewEditor).toBeVisible()
  await expect(previewScrollBar).toBeVisible()
  await expect(lineNumbers).toHaveCount(24)
  await expect(lineNumbers.nth(0)).toHaveText('1')
  await expect(lineNumbers.nth(23)).toHaveText('24')
  await expect(lineContents).toHaveCount(24)
  await expect(lineContents.nth(0)).toHaveText('line 1')
  await expect(lineContents.nth(23)).toHaveText('line 24')
}
