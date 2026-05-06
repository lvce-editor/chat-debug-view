import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.list-files-payload-tab'

export const test: Test = async ({ ChatDebug, Command, expect, Locator }) => {
  await ChatDebug.open('e2e-session-list-files-payload-tab')
  const locator1 = Locator('.ChatDebugView')
  await expect(locator1).toBeVisible()

  const events = [
    {
      arguments: {
        uri: 'file:///workspace',
      },
      name: 'list_files',
      result: {
        entries: [
          {
            name: 'README.md',
            type: 'file',
          },
        ],
        ignored: false,
      },
      sessionId: 'e2e-session-list-files-payload-tab',
      timestamp: '2026-04-10T10:00:00.000Z',
      type: 'tool-execution',
    },
  ]

  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()
  await ChatDebug.selectEventRow(0)

  await Command.execute('ChatDebug.handleInput', 'detailTab', 'payload', false)

  const detailsBottom = Locator('.ChatDebugViewDetailsBottom .EditorContent')

  const locator2 = Locator('.ChatDebugViewDetails')
  await expect(locator2).toBeVisible()
  await expect(detailsBottom).toHaveText('{  "uri": "file:///workspace"}')
}
