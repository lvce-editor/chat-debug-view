import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.list-files-table-label'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  await ChatDebug.open('e2e-session-list-files-table-label')
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const events = [
    {
      arguments: {
        uri: 'file:///workspace',
      },
      name: 'list_files',
      sessionId: 'e2e-session-list-files-table-label',
      timestamp: '2026-04-02T07:26:35.172Z',
      type: 'tool-execution',
    },
  ]

  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()

  const rows = Locator('.ChatDebugViewEventRow')

  await expect(rows).toHaveCount(1)
  await expect(rows.nth(0)).toContainText('list_files')
  await expect(rows.nth(0)).not.toContainText('tool-execution, list_files')
}