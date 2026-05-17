import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.large-payload-5k-lines'

export const skip = 1

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  const sessionId = 'e2e-session-large-payload-5k-lines'
  await ChatDebug.open(sessionId)
  const locator1 = Locator('.ChatDebugView')
  await expect(locator1).toBeVisible()
  const payloadText = Array.from({ length: 5000 }, (_, index) => `line ${index + 1}`).join('\n')
  const events = [
    {
      arguments: {
        uri: 'file:///workspace/large-5k.txt',
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

  await expect(lineNumbers).toHaveCount(5000)
  const lineNumber0 = lineNumbers.nth(0)
  await expect(lineNumber0).toHaveText('1')
  const lineNumber4999 = lineNumbers.nth(4999)
  await expect(lineNumber4999).toHaveText('5000')
  await expect(lineContents).toHaveCount(5000)
  const lineContent0 = lineContents.nth(0)
  await expect(lineContent0).toHaveText('line 1')
  const lineContent4999 = lineContents.nth(4999)
  await expect(lineContent4999).toHaveText('line 5000')
}
