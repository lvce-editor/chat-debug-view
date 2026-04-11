import { expect, test } from '@jest/globals'
import { EventExpression } from '@lvce-editor/constants'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as RenderEventListeners from '../src/parts/RenderEventListeners/RenderEventListeners.ts'

const handleTimelinePointerLeave = (DomEventListenerFunctions as Record<string, number>).HandleTimelinePointerLeave

test('renderEventListeners should register delegated row click with pointer coordinates', () => {
  const listeners = RenderEventListeners.renderEventListeners()

  expect(listeners).toContainEqual({
    name: DomEventListenerFunctions.HandleEventRowClick,
    params: ['handleEventRowClick', EventExpression.ClientX, EventExpression.ClientY, EventExpression.Button],
  })
})

test('renderEventListeners should register timeline pointer leave', () => {
  const listeners = RenderEventListeners.renderEventListeners()

  expect(listeners).toContainEqual({
    name: handleTimelinePointerLeave,
    params: ['handleTimelinePointerLeave'],
  })
})
