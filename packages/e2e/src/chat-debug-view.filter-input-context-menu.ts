import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.filter-input-context-menu'

export const skip = 1

export const test: Test = async ({ ChatDebug, expect, KeyBoard, Locator }) => {
  const sessionId = 'e2e-session-filter-input-context-menu'
  await ChatDebug.open(sessionId)
  const locator1 = Locator('.ChatDebugView')
  await expect(locator1).toBeVisible()
  await ChatDebug.useDevtoolsLayout()
  await ChatDebug.setEvents([
    {
      ended: '2026-03-08T00:00:01.250Z',
      sessionId,
      started: '2026-03-08T00:00:01.000Z',
      timestamp: '2026-03-08T00:00:01.000Z',
      type: 'request',
    },
  ])

  const filterInput = Locator('.ChatDebugViewFilterInput--devtools')
  await filterInput.type('request')

  await KeyBoard.press('Shift+F10')

  const menuItems = Locator('.MenuItem')
  await expect(menuItems).toHaveCount(4)
  await expect(menuItems.nth(0)).toHaveText('Cut')
  await expect(menuItems.nth(1)).toHaveText('Copy')
  await expect(menuItems.nth(2)).toHaveText('Paste')
  await expect(menuItems.nth(3)).toHaveText('Select All')
  const locator2 = Locator('.MenuItem', { hasText: 'Type' })
  await expect(locator2).toHaveCount(0)
  const locator3 = Locator('.MenuItem', { hasText: 'Duration' })
  await expect(locator3).toHaveCount(0)
  const locator4 = Locator('.MenuItem', { hasText: 'Status' })
  await expect(locator4).toHaveCount(0)
  const locator5 = Locator('.MenuItem', { hasText: 'Reset columns' })
  await expect(locator5).toHaveCount(0)
}
