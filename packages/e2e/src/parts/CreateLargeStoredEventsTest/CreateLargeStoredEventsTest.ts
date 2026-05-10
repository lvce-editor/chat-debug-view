import type { Test } from '@lvce-editor/test-with-playwright'

const bootstrapSessionId = 'e2e-session-many-events-bootstrap'

export const createLargeStoredEventsTest = (eventCount: number): Test => {
  return async ({ ChatDebug, Command, expect, Locator }) => {
    const sessionId = `e2e-session-many-events-${eventCount}`

    await ChatDebug.open(bootstrapSessionId)
    const locator1 = Locator('.ChatDebugView')
    await expect(locator1).toBeVisible()

    await Command.execute('ChatDebug.seedManyEventsInIndexedDbForTest', {
      sessionId,
      totalEventCount: eventCount,
    })

    await ChatDebug.setSessionId(sessionId)
    const locator2 = Locator('.ChatDebugView')
    await expect(locator2).toBeVisible()
    await ChatDebug.useDevtoolsLayout()

    const rows = Locator('.TableRow')
    await expect(rows).toHaveCount(1)
    const rowsNth0 = rows.nth(0)
    await expect(rowsNth0).toContainText('request')
    await expect(rowsNth0).toContainText('100 ms')
  }
}
