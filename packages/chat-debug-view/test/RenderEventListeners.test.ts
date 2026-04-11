import { expect, test } from '@jest/globals'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as RenderEventListeners from '../src/parts/RenderEventListeners/RenderEventListeners.ts'

test('renderEventListeners should register delegated row click with dataset index', () => {
  const listeners = RenderEventListeners.renderEventListeners()
  expect(listeners).toBeDefined()
})

test('renderEventListeners should register timeline pointer leave', () => {
  const listeners = RenderEventListeners.renderEventListeners()

  expect(listeners).toContainEqual({
    name: DomEventListenerFunctions.HandleTimelinePointerLeave,
    params: ['handleTimelinePointerLeave'],
  })
})
