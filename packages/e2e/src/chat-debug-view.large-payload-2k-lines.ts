import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.large-payload-2k-lines'

export const skip = 1

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  const sessionId = 'e2e-session-large-payload-2k-lines'
  await ChatDebug.open(sessionId)
  const locator1 = Locator('.ChatDebugView')
  await expect(locator1).toBeVisible()
  const payloadText = Array.from({ length: 2000 }, (_, index) => `line ${index + 1}`).join('\n')
  const events = [
    {
      arguments: {
        uri: 'file:///workspace/large-2k.txt',
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
  const lineContents = Locator('.ChatDebugViewEventLineContent')

  await expect(lineNumbers).toHaveCount(2000)
  const lineNumbersNth0 = lineNumbers.nth(0)
  await expect(lineNumbersNth0).toHaveText('1')
  const lineNumbersNth1999 = lineNumbers.nth(1999)
  await expect(lineNumbersNth1999).toHaveText('2000')
  await expect(lineContents).toHaveCount(2000)
  const lineContentsNth0 = lineContents.nth(0)
  await expect(lineContentsNth0).toHaveText('line 1')
  const lineContentsNth1999 = lineContents.nth(1999)
  await expect(lineContentsNth1999).toHaveText('line 2000')
}
