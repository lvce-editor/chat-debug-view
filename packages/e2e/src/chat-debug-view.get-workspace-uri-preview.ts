import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.get-workspace-uri-preview'

export const skip = 1

export const test: Test = async ({ Command, expect, Locator }) => {
  await Command.execute('Main.openUri', 'chat-debug://e2e-session-get-workspace-uri-preview')
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const events = [
    {
      arguments: {
        baseUri: '/test/chat-debug-view',
        pattern: '**/*',
      },
      error: 'Invalid argument: baseUri must be an absolute URI.',
      name: 'getWorkspaceUri',
      result: {
        uri: 'file:///workspace',
      },
      sessionId: 'e2e-session-get-workspace-uri-preview',
      timestamp: '2026-04-01T20:56:07.857Z',
      type: 'tool-execution',
    },
  ]

  await Command.execute('ChatDebug.setEvents', events)
  await Command.execute('ChatDebug.handleInput', 'useDevtoolsLayout', '', true)

  const row = Locator('.ChatDebugViewEventRow').nth(0)
  await row.click()

  const previewTab = Locator('[role="tab"][value="preview"]')
  await previewTab.click()

  const detailsEvent = Locator('.ChatDebugViewEvent')
  await expect(previewTab).toHaveAttribute('aria-selected', 'true')
  await expect(detailsEvent).toContainText('"name": "getWorkspaceUri"')
  await expect(detailsEvent).toContainText('"result"')
  await expect(detailsEvent).not.toContainText('"arguments"')
  await expect(detailsEvent).not.toContainText('baseUri')
  await expect(detailsEvent).not.toContainText('pattern')
}
