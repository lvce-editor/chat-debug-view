import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.table-resizers-accessibility'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  await ChatDebug.open('e2e-session-table-resizers-accessibility')
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const events = [
    {
      ended: '2026-03-08T00:00:01.250Z',
      sessionId: 'e2e-session-table-resizers-accessibility',
      started: '2026-03-08T00:00:01.000Z',
      timestamp: '2026-03-08T00:00:01.000Z',
      type: 'request',
    },
  ]

  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()

  const resizerOne = Locator('[name="ResizerOne"]')
  const resizerTwo = Locator('[name="ResizerTwo"]')

  await expect(resizerOne).toHaveCount(1)
  await expect(resizerTwo).toHaveCount(1)
  await expect(resizerOne).toHaveAttribute('tabindex', '-1')
  await expect(resizerTwo).toHaveAttribute('tabindex', '-1')
}
