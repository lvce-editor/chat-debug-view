import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.large-payload-10k-lines'

export const test: Test = async ({ ChatDebug, Command, expect, Locator }) => {
  const sessionId = 'e2e-session-large-payload-10k-lines'
  await ChatDebug.open(sessionId)
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const payloadText = Array.from({ length: 10_000 }, (_, index) => `line ${index + 1}`).join('\n')
  const events = [
    {
      arguments: {
        uri: 'file:///workspace/large-10k.txt',
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
  await Command.execute('ChatDebug.handleInput', 'detailTab', 'preview', false)

  const lineNumbers = Locator('.ChatDebugViewEventLineNumber')
  const lineContents = Locator('.ChatDebugViewEventLineContent')

  await expect(lineNumbers).toHaveCount(10_000)
  await expect(lineNumbers.nth(0)).toHaveText('1')
  await expect(lineNumbers.nth(9_999)).toHaveText('10000')
  await expect(lineContents).toHaveCount(10_000)
  await expect(lineContents.nth(0)).toHaveText('line 1')
  await expect(lineContents.nth(9_999)).toHaveText('line 10000')
}
