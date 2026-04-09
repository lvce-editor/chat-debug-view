import { expect, test } from '@jest/globals'
import { EventExpression } from '@lvce-editor/constants'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as RenderEventListeners from '../src/parts/RenderEventListeners/RenderEventListeners.ts'

test('renderEventListeners should register delegated row click with dataset index', () => {
  const listeners = RenderEventListeners.renderEventListeners()

  expect(listeners).toBeDefined()
})

test('renderEventListeners should register handlers used by the view DOM', () => {
  const listeners = RenderEventListeners.renderEventListeners()

  expect(listeners).toContainEqual({
    name: DomEventListenerFunctions.HandleHeaderContextMenu,
    params: ['handleHeaderContextMenu'],
    preventDefault: true,
  })
  expect(listeners).toContainEqual({
    name: DomEventListenerFunctions.HandleDetailsContextMenu,
    params: ['handleDetailsContextMenu'],
    preventDefault: true,
  })
  expect(listeners).toContainEqual({
    name: DomEventListenerFunctions.HandleTableKeyDown,
    params: ['handleTableKeyDown', 'event.key'],
  })
  expect(listeners).toContainEqual({
    name: DomEventListenerFunctions.HandleTimelineRangePreset,
    params: ['handleTimelineRangePreset', 'event.target.dataset.value'],
  })
})
