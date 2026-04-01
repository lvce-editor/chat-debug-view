import { expect, test } from '@jest/globals'
import { EventExpression } from '@lvce-editor/constants'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as RenderEventListeners from '../src/parts/RenderEventListeners/RenderEventListeners.ts'

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
