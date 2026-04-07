import type { Test } from '@lvce-editor/test-with-playwright'

const bootstrapSessionId = 'e2e-session-many-events-bootstrap'

export const createLargeStoredEventsTest = (eventCount: number): Test => {
  return async ({ ChatDebug, Command, expect, Locator }) => {
    const sessionId = `e2e-session-many-events-${eventCount}`

    await ChatDebug.open(bootstrapSessionId)
    await expect(Locator('.ChatDebugView')).toBeVisible()

    await Command.execute('ChatDebug.seedManyEventsInIndexedDbForTest', {
      sessionId,
      totalEventCount: eventCount,
    })

    await Command.execute('ChatDebug.setSessionId', sessionId)
    await expect(Locator('.ChatDebugView')).toBeVisible()
    await ChatDebug.useDevtoolsLayout()

    const rows = Locator('.ChatDebugViewEventRow')
    await expect(rows).toHaveCount(1)
    await expect(rows.nth(0)).toContainText('request')
    await expect(rows.nth(0)).toContainText('100ms')
  }
}
