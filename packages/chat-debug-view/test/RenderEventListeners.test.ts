import { expect, test } from '@jest/globals'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as RenderEventListeners from '../src/parts/RenderEventListeners/RenderEventListeners.ts'

const getListener = (name: number) => {
  const listener = RenderEventListeners.renderEventListeners().find((candidate) => candidate.name === name)
  expect(listener).toBeDefined()
  return listener
}

test('renderEventListeners should register delegated row click with pointer coordinates', () => {
  const listeners = RenderEventListeners.renderEventListeners()
  expect(listeners).toBeDefined()
})

test('renderEventListeners should register root context menu with prevent default', () => {
  const listeners = RenderEventListeners.renderEventListeners()

  expect(listeners).toContainEqual({
    name: DomEventListenerFunctions.HandleRootContextMenu,
    params: ['handleRootContextMenu'],
    preventDefault: true,
  })
})

test('renderEventListeners should register table wheel as non-passive when preventing default', () => {
  const listener = getListener(DomEventListenerFunctions.HandleTableWheel)

  expect(listener).toEqual({
    name: DomEventListenerFunctions.HandleTableWheel,
    params: ['handleTableWheel', 'event.deltaY'],
    preventDefault: true,
  })
  expect(listener?.passive).toBeUndefined()
})

test('renderEventListeners should register preview wheel as non-passive when preventing default', () => {
  const listener = getListener(DomEventListenerFunctions.HandlePreviewTextWheel)

  expect(listener).toEqual({
    name: DomEventListenerFunctions.HandlePreviewTextWheel,
    params: ['handlePreviewTextWheel', 'event.deltaY'],
    preventDefault: true,
  })
  expect(listener?.passive).toBeUndefined()
})
