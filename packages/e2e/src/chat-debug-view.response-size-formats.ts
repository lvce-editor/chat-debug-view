import type { Test } from '@lvce-editor/test-with-playwright'

const createPayload = (size: number): string => {
  return 'x'.repeat(size)
}

export const name = 'chat-debug-view.response-size-formats'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  const sessionId = 'e2e-session-response-size-formats'

  await ChatDebug.open(sessionId)
  const view = Locator('.ChatDebugView')
  await expect(view).toBeVisible()
  await ChatDebug.useDevtoolsLayout()

  await ChatDebug.setEvents([
    {
      eventId: 1,
      requestId: 'request-10-b',
      sessionId,
      timestamp: '2026-05-13T10:00:05.000Z',
      type: 'request',
    },
    {
      eventId: 2,
      requestId: 'request-10-b',
      response: createPayload(10),
      sessionId,
      timestamp: '2026-05-13T10:00:05.100Z',
      type: 'response',
    },
    {
      eventId: 3,
      requestId: 'request-1-kb',
      sessionId,
      timestamp: '2026-05-13T10:00:04.000Z',
      type: 'request',
    },
    {
      eventId: 4,
      requestId: 'request-1-kb',
      response: createPayload(1024),
      sessionId,
      timestamp: '2026-05-13T10:00:04.100Z',
      type: 'response',
    },
    {
      eventId: 5,
      requestId: 'request-10-kb',
      sessionId,
      timestamp: '2026-05-13T10:00:03.000Z',
      type: 'request',
    },
    {
      eventId: 6,
      requestId: 'request-10-kb',
      response: createPayload(10 * 1024),
      sessionId,
      timestamp: '2026-05-13T10:00:03.100Z',
      type: 'response',
    },
    {
      eventId: 7,
      requestId: 'request-1-mb',
      sessionId,
      timestamp: '2026-05-13T10:00:02.000Z',
      type: 'request',
    },
    {
      eventId: 8,
      requestId: 'request-1-mb',
      response: createPayload(1024 * 1024),
      sessionId,
      timestamp: '2026-05-13T10:00:02.100Z',
      type: 'response',
    },
    {
      eventId: 9,
      requestId: 'request-10-mb',
      sessionId,
      timestamp: '2026-05-13T10:00:01.000Z',
      type: 'request',
    },
    {
      eventId: 10,
      requestId: 'request-10-mb',
      response: createPayload(10 * 1024 * 1024),
      sessionId,
      timestamp: '2026-05-13T10:00:01.100Z',
      type: 'response',
    },
  ])

  const rows = Locator('.TableBody .TableRow')
  const sizeCells = Locator('.TableBody .TableRow .ChatDebugViewCellSize')

  await expect(rows).toHaveCount(5)
  await expect(sizeCells).toHaveCount(5)

  const sizeCell0 = sizeCells.nth(0)
  const sizeCell1 = sizeCells.nth(1)
  const sizeCell2 = sizeCells.nth(2)
  const sizeCell3 = sizeCells.nth(3)
  const sizeCell4 = sizeCells.nth(4)

  await expect(sizeCell0).toHaveText('10 B')
  await expect(sizeCell1).toHaveText('1.0 kB')
  await expect(sizeCell2).toHaveText('10 kB')
  await expect(sizeCell3).toHaveText('1.0 MB')
  await expect(sizeCell4).toHaveText('10 MB')
}
