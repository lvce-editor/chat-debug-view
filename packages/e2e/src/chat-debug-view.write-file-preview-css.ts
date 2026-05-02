import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.write-file-preview-css'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  const sessionId = `e2e-session-write-file-preview-css-${Date.now()}`
  await ChatDebug.open(sessionId)
  await expect(Locator('.ChatDebugView')).toBeVisible()

  await ChatDebug.setEvents([
    {
      arguments: {
        content: '.item { color: red; width: 10px; }',
        uri: 'file:///workspace/example.css',
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
  const tokenSpans = Locator('.EditorRow span')

  await expect(lineContents).toHaveCount(1)
  await expect(lineContents.nth(0)).toContainText('.item { color: red; width: 10px; }')
  await expect(tokenSpans).toHaveCount(8)
}
