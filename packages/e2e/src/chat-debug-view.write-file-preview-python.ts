import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.write-file-preview-python'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  const sessionId = `e2e-session-write-file-preview-python-${Date.now()}`
  await ChatDebug.open(sessionId)
  const locator1 = Locator('.ChatDebugView')
  await expect(locator1).toBeVisible()

  await ChatDebug.setEvents([
    {
      arguments: {
        content: 'def greet(name):\n    return "hi"',
        uri: 'file:///workspace/example.py',
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

  const lineContents = Locator('.EditorRow')
  const lineNumbers = Locator('.ChatDebugViewEventLineNumber')
  const tokenSpans = Locator('.EditorRow span')

  await expect(lineNumbers).toHaveCount(2)
  await expect(lineContents).toHaveCount(2)
  const lineContentsNth0 = lineContents.nth(0)
  await expect(lineContentsNth0).toContainText('def greet(name):')
  const lineContentsNth1 = lineContents.nth(1)
  await expect(lineContentsNth1).toContainText('return "hi"')
  await expect(tokenSpans).toHaveCount(6)
}
