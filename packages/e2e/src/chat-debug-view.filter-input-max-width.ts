import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.filter-input-max-width'

export const test: Test = async ({ Command, expect, Locator }) => {
  // arrange
  await Command.execute('Main.openUri', 'chat-debug://e2e-session-filter-input-width')
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const events = [
    {
      sessionId: 'e2e-session-filter-input-width',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
  ]

  await Command.execute('ChatDebug.setEvents', events)
  await Command.execute('ChatDebug.handleInput', 'useDevtoolsLayout', '', true)

  // assert
  const filterInput = Locator('.ChatDebugViewFilterInput--devtools')
  await expect(filterInput).toBeVisible()
  await expect(filterInput).toHaveCSS('max-width', '80px')

  const width = await filterInput.evaluate((node) => {
    return Math.round(node.getBoundingClientRect().width)
  })
  expect(width).toBeLessThanOrEqual(80)
}
