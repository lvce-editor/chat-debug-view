import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.write-file-preview-html'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  const sessionId = `e2e-session-write-file-preview-html-${Date.now()}`
  await ChatDebug.open(sessionId)
  await expect(Locator('.ChatDebugView')).toBeVisible()

  await ChatDebug.setEvents([
    {
      arguments: {
        content: '<div class="hero">Hello</div>',
        uri: 'file:///workspace/example.html',
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

  await expect(lineContents).toHaveCount(1)
  await expect(lineContents.nth(0)).toContainText('<div class="hero">Hello</div>')
  await expect(Locator('.TokenTag')).toHaveCount(2)
  await expect(Locator('.TokenAttributeName')).toHaveCount(1)
  await expect(Locator('.TokenString')).toHaveCount(1)
})