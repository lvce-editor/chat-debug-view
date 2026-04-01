import { expect, test } from '@jest/globals'
import { EventExpression } from '@lvce-editor/constants'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as RenderEventListeners from '../src/parts/RenderEventListeners/RenderEventListeners.ts'

test('renderEventListeners should register delegated row click with dataset index', () => {
  const listeners = RenderEventListeners.renderEventListeners()
  const clickListener = listeners.find((listener) => listener.name === DomEventListenerFunctions.HandleEventRowClick)

  expect(clickListener).toBeDefined()
  expect(clickListener?.params).toEqual(['handleEventRowClick', 'event.target.dataset.index'])
})

test('renderEventListeners should register table body context menu with preventDefault', () => {
  const listeners = RenderEventListeners.renderEventListeners()
  const contextMenuListener = listeners.find((listener) => listener.name === DomEventListenerFunctions.HandleTableBodyContextMenu)

  expect(contextMenuListener).toBeDefined()
  expect(contextMenuListener).toEqual(
    expect.objectContaining({
      params: ['handleTableBodyContextMenu'],
      preventDefault: true,
    }),
  )
})

test('renderEventListeners should register filter input with name and value params', () => {
  const listeners = RenderEventListeners.renderEventListeners()
  const filterListener = listeners.find((listener) => listener.name === DomEventListenerFunctions.HandleFilterInput)

  expect(filterListener).toBeDefined()
  expect(filterListener?.params).toEqual(['handleInput', EventExpression.TargetName, EventExpression.TargetValue])
})

test('renderEventListeners should register checkbox input with checked param', () => {
  const listeners = RenderEventListeners.renderEventListeners()
  const checkboxListener = listeners.find((listener) => listener.name === DomEventListenerFunctions.HandleInput)

  expect(checkboxListener).toBeDefined()
  expect(checkboxListener?.params).toEqual(['handleInput', EventExpression.TargetName, EventExpression.TargetValue, EventExpression.TargetChecked])
})

test('renderEventListeners should register simple input with name and value params', () => {
  const listeners = RenderEventListeners.renderEventListeners()
  const simpleInputListener = listeners.find((listener) => listener.name === DomEventListenerFunctions.HandleSimpleInput)

  expect(simpleInputListener).toBeDefined()
  expect(simpleInputListener?.params).toEqual(['handleInput', EventExpression.TargetName, EventExpression.TargetValue])
})

test('renderEventListeners should register sash pointer tracking with client coordinates', () => {
  const listeners = RenderEventListeners.renderEventListeners()
  const pointerDownListener = listeners.find((listener) => listener.name === DomEventListenerFunctions.HandleSashPointerDown)
  const pointerMoveListener = listeners.find((listener) => listener.name === DomEventListenerFunctions.HandleSashPointerMove)
  const pointerUpListener = listeners.find((listener) => listener.name === DomEventListenerFunctions.HandleSashPointerUp)

  expect(pointerDownListener).toBeDefined()
  expect(pointerDownListener?.params).toEqual(['handleSashPointerDown', EventExpression.ClientX, EventExpression.ClientY])
  expect(pointerDownListener).toEqual(
    expect.objectContaining({
      trackPointerEvents: [DomEventListenerFunctions.HandleSashPointerMove, DomEventListenerFunctions.HandleSashPointerUp],
    }),
  )
  expect(pointerMoveListener?.params).toEqual(['handleSashPointerMove', EventExpression.ClientX, EventExpression.ClientY])
  expect(pointerUpListener?.params).toEqual(['handleSashPointerUp', EventExpression.ClientX, EventExpression.ClientY])
})
