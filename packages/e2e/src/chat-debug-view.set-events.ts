import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.set-events'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  // arrange
  await ChatDebug.open('e2e-session-set-events')
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const events = [
    {
      ended: '2026-03-08T00:00:01.000Z',
      sessionId: 'e2e-session-set-events',
      started: '2026-03-08T00:00:00.000Z',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
  ]

  // act
  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()

  // assert
  const root = Locator('.ChatDebugView--devtools')
  const table = Locator('.ChatDebugViewTable')
  const header = Locator('.ChatDebugViewTableHeader')
  const body = Locator('.ChatDebugViewTableBody')
  await expect(root).toBeVisible()
  await expect(table).toBeVisible()
  await expect(header).toBeVisible()
  await expect(header).toContainText('Type')
  await expect(header).toContainText('Duration')
  await expect(header).toContainText('Status')
  await expect(body).toBeVisible()
}
