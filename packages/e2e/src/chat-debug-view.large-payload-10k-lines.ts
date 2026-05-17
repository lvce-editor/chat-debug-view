import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.large-payload-10k-lines'

export const skip = 1

export const test: Test = async ({ ChatDebug, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await Workspace.setPath(tmpDir)
  const payloadText = Array.from({ length: 10_000 }, (_, index) => `line ${index + 1}`).join('\n')
  await ChatDebug.open2({
    events: [
      {
        arguments: {
          uri: 'file:///workspace/large-10k.txt',
        },
        name: 'read_file',
        result: payloadText,
        sessionId: 'e2e-session-large-payload-10k-lines',
        timestamp: '2026-04-13T10:00:00.000Z',
        type: 'tool-execution',
      },
    ],
    sessionId: 'e2e-session-large-payload-10k-lines',
    useDevtoolsLayout: true,
  })
  await ChatDebug.selectEventRow(0)
  await ChatDebug.openTabPreview()

  const lineNumbers = Locator('.ChatDebugViewEventLineNumber')
  const lineContents = Locator('.ChatDebugViewEventLineContent')

  await expect(lineNumbers).toHaveCount(10_000)
  const lineNumber0 = lineNumbers.nth(0)
  await expect(lineNumber0).toHaveText('1')
  const lineNumber9999 = lineNumbers.nth(9999)
  await expect(lineNumber9999).toHaveText('10000')
  await expect(lineContents).toHaveCount(10_000)
  const lineContent0 = lineContents.nth(0)
  await expect(lineContent0).toHaveText('line 1')
  const lineContent9999 = lineContents.nth(9999)
  await expect(lineContent9999).toHaveText('line 10000')
}
