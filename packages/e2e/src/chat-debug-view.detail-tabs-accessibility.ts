import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.detail-tabs-accessibility'

export const test: Test = async ({ ChatDebug, Command, expect, Locator }) => {
  // arrange
  await ChatDebug.open('e2e-session-detail-tabs-accessibility')
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const events = [
    {
      ended: '2026-03-08T00:00:00.250Z',
      path: '/chat',
      sessionId: 'e2e-session-detail-tabs-accessibility',
      started: '2026-03-08T00:00:00.000Z',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
  ]

  // act
  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()
  await ChatDebug.selectEventRow(0)

  // assert
  const tablist = Locator('.ChatDebugViewDetailsTabs')
  await expect(tablist).toBeVisible()
  await expect(tablist).toHaveAttribute('role', 'tablist')
  // await expect(tablist).toHaveAttribute('aria-label', 'Detail sections')
  const tabs = Locator('.ChatDebugViewDetailsTop .ChatDebugViewDetailsTabs [role="tab"]')
  const previewTab = Locator('#ChatDebugViewDetailsTab-preview')
  const payloadTab = Locator('#ChatDebugViewDetailsTab-payload')
  const responseTab = Locator('#ChatDebugViewDetailsTab-response')
  // await expect(responseTab).toHaveAttribute('aria-controls', 'ChatDebugViewDetailsPanel-response')
  // await expect(responseTab).toHaveAttribute('aria-selected', 'true')
  const timingTab = Locator('#ChatDebugViewDetailsTab-timing')
  // await expect(timingTab).toHaveAttribute('aria-controls', 'ChatDebugViewDetailsPanel-timing')
  // await expect(timingTab).toHaveAttribute('aria-selected', 'false')
  const panel = Locator('[role="tabpanel"]')

  // assert
  // TODO
  // await expect(tablist).toBeVisible()
  await expect(tabs).toHaveCount(4)
  await expect(previewTab).toHaveAttribute('tabindex', '-1')
  await expect(payloadTab).toHaveAttribute('tabindex', '-1')
  await expect(responseTab).toHaveAttribute('tabindex', '0')
  await expect(timingTab).toHaveAttribute('tabindex', '-1')
  // await expect(responseTab).toHaveAttribute('aria-controls', 'ChatDebugViewDetailsPanel-response')
  // await expect(responseTab).toHaveAttribute('aria-selected', 'true')
  // await expect(timingTab).toHaveAttribute('aria-controls', 'ChatDebugViewDetailsPanel-timing')
  // await expect(timingTab).toHaveAttribute('aria-selected', 'false')
  // await expect(panel).toHaveAttribute('aria-labelledby', 'ChatDebugViewDetailsTab-response')

  // act
  await Command.execute('ChatDebug.handleInput', 'detailTab', 'timing', false)

  // assert
  await expect(previewTab).toHaveAttribute('tabindex', '-1')
  await expect(payloadTab).toHaveAttribute('tabindex', '-1')
  await expect(responseTab).toHaveAttribute('tabindex', '-1')
  await expect(timingTab).toHaveAttribute('tabindex', '0')
}
