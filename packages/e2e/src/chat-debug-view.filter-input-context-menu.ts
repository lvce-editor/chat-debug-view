import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.filter-input-context-menu'

export const skip = 1

export const test: Test = async ({ ChatDebug, expect, KeyBoard, Locator }) => {
  const sessionId = 'e2e-session-filter-input-context-menu'
  await ChatDebug.open(sessionId)
  await expect(Locator('.ChatDebugView')).toBeVisible()
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
  await expect(Locator('.MenuItem', { hasText: 'Type' })).toHaveCount(0)
  await expect(Locator('.MenuItem', { hasText: 'Duration' })).toHaveCount(0)
  await expect(Locator('.MenuItem', { hasText: 'Status' })).toHaveCount(0)
  await expect(Locator('.MenuItem', { hasText: 'Reset columns' })).toHaveCount(0)
}
