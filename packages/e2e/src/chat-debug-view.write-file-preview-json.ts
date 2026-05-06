import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.write-file-preview-json'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  const sessionId = `e2e-session-write-file-preview-json-${Date.now()}`
  await ChatDebug.open(sessionId)
  const locator1 = Locator('.ChatDebugView')
  await expect(locator1).toBeVisible()

  await ChatDebug.setEvents([
    {
      arguments: {
        content: '{"ok": true}',
        uri: 'file:///workspace/example.json',
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
  await expect(lineContents.nth(0)).toContainText('{"ok": true}')
  await expect(tokenSpans).toHaveCount(5)
}
