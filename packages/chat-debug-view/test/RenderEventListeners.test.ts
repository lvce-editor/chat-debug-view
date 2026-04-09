import { expect, test } from '@jest/globals'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as RenderEventListeners from '../src/parts/RenderEventListeners/RenderEventListeners.ts'

test('renderEventListeners should register delegated row click with dataset index', () => {
  const listeners = RenderEventListeners.renderEventListeners()

  expect(listeners).toBeDefined()
})

test('renderEventListeners should register details top context menu listener with preventDefault', () => {
  const listeners = RenderEventListeners.renderEventListeners()

  expect(listeners).toContainEqual({
    name: DomEventListenerFunctions.HandleDetailsTopContextMenu,
    params: ['handleDetailsTopContextMenu'],
    preventDefault: true,
  })
})

test('renderEventListeners should register timeline context menu listener with preventDefault', () => {
  const listeners = RenderEventListeners.renderEventListeners()

  expect(listeners).toContainEqual({
    name: DomEventListenerFunctions.HandleTimelineContextMenu,
    params: ['handleTimelineContextMenu'],
    preventDefault: true,
  })
})
