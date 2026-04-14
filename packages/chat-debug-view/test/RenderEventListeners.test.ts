import { expect, test } from '@jest/globals'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as RenderEventListeners from '../src/parts/RenderEventListeners/RenderEventListeners.ts'

test('renderEventListeners should register delegated row click with pointer coordinates', () => {
  const listeners = RenderEventListeners.renderEventListeners()
  expect(listeners).toBeDefined()
})

test('renderEventListeners should register delegated table wheel scrolling', () => {
  const listeners = RenderEventListeners.renderEventListeners()

  expect(listeners).toContainEqual({
    name: DomEventListenerFunctions.HandleTableWheel,
    params: ['handleTableWheel', 'event.deltaY'],
    preventDefault: true,
  })
})
