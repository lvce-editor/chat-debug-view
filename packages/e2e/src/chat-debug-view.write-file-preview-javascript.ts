import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.write-file-preview-javascript'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  const sessionId = `e2e-session-write-file-preview-javascript-${Date.now()}`
  await ChatDebug.open(sessionId)
  await expect(Locator('.ChatDebugView')).toBeVisible()

  await ChatDebug.setEvents([
    {
      arguments: {
        content: 'const answer = 42',
        uri: 'file:///workspace/example.js',
      },
      eventId: 1,
      name: 'write_file',
      sessionId,
      timestamp: '2026-05-02T09:00:00.000Z',
      type: 'tool-execution',
    },
  ])
  await ChatDebug.useDevtoolsLayout()
  await ChatDebug.selectEventRow(0)
  await ChatDebug.openTabPreview()

  const lineNumbers = Locator('.ChatDebugViewEventLineNumber')
  const lineContents = Locator('.EditorRow')

  await expect(lineNumbers).toHaveCount(1)
  await expect(lineContents).toHaveCount(1)
  await expect(lineContents.nth(0)).toContainText('const answer = 42')
  await expect(Locator('.TokenKeyword')).toHaveCount(1)
  await expect(Locator('.TokenNumeric')).toHaveCount(1)
}
