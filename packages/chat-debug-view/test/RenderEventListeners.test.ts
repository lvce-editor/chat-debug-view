import { expect, test } from '@jest/globals'
import { EventExpression } from '@lvce-editor/constants'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as RenderEventListeners from '../src/parts/RenderEventListeners/RenderEventListeners.ts'

test('renderEventListeners should register delegated row click with dataset index', () => {
  const listeners = RenderEventListeners.renderEventListeners()
  const clickListener = listeners.find((listener) => listener.name === DomEventListenerFunctions.HandleEventRowClick)

  expect(clickListener).toBeDefined()
  expect(clickListener?.params).toEqual(['handleEventRowClick', 'event.target.dataset.index', 'event.button'])
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

test('renderEventListeners should register event category filter input with value param', () => {
  const listeners = RenderEventListeners.renderEventListeners()
  const categoryFilterListener = listeners.find((listener) => listener.name === DomEventListenerFunctions.HandleEventCategoryFilter)

  expect(categoryFilterListener).toBeDefined()
  expect(categoryFilterListener?.params).toEqual(['handleEventCategoryFilter', EventExpression.TargetValue])
})

test('renderEventListeners should register detail tab input with value param', () => {
  const listeners = RenderEventListeners.renderEventListeners()
  const detailTabListener = listeners.find((listener) => listener.name === DomEventListenerFunctions.HandleDetailTab)

  expect(detailTabListener).toBeDefined()
  expect(detailTabListener?.params).toEqual(['handleDetailTab', EventExpression.TargetValue])
})

test('renderEventListeners should register timeline preset input with value param', () => {
  const listeners = RenderEventListeners.renderEventListeners()
  const timelinePresetListener = listeners.find((listener) => listener.name === DomEventListenerFunctions.HandleTimelineRangePreset)

  expect(timelinePresetListener).toBeDefined()
  expect(timelinePresetListener?.params).toEqual(['handleTimelineRangePreset', EventExpression.TargetValue])
})

test('renderEventListeners should register close details action without params', () => {
  const listeners = RenderEventListeners.renderEventListeners()
  const closeDetailsListener = listeners.find((listener) => listener.name === DomEventListenerFunctions.HandleCloseDetails)

  expect(closeDetailsListener).toBeDefined()
  expect(closeDetailsListener?.params).toEqual(['handleCloseDetails'])
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

test('renderEventListeners should register timeline pointer tracking with clientX only', () => {
  const listeners = RenderEventListeners.renderEventListeners()
  const pointerDownListener = listeners.find((listener) => listener.name === DomEventListenerFunctions.HandleTimelinePointerDown)
  const pointerMoveListener = listeners.find((listener) => listener.name === DomEventListenerFunctions.HandleTimelinePointerMove)
  const pointerUpListener = listeners.find((listener) => listener.name === DomEventListenerFunctions.HandleTimelinePointerUp)

  expect(pointerDownListener).toBeDefined()
  expect(pointerDownListener?.params).toEqual(['handleTimelinePointerDown', EventExpression.ClientX])
  expect(pointerDownListener).toEqual(
    expect.objectContaining({
      trackPointerEvents: [DomEventListenerFunctions.HandleTimelinePointerMove, DomEventListenerFunctions.HandleTimelinePointerUp],
    }),
  )
  expect(pointerMoveListener?.params).toEqual(['handleTimelinePointerMove', EventExpression.ClientX])
  expect(pointerUpListener?.params).toEqual(['handleTimelinePointerUp', EventExpression.ClientX])
})

test('renderEventListeners should register timeline double click reset', () => {
  const listeners = RenderEventListeners.renderEventListeners()
  const doubleClickListener = listeners.find((listener) => listener.name === DomEventListenerFunctions.HandleTimelineDoubleClick)

  expect(doubleClickListener).toBeDefined()
  expect(doubleClickListener?.params).toEqual(['handleTimelineDoubleClick'])
})
