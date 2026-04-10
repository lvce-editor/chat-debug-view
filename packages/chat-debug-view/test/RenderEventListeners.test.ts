import { expect, test } from '@jest/globals'
import { EventExpression } from '@lvce-editor/constants'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as RenderEventListeners from '../src/parts/RenderEventListeners/RenderEventListeners.ts'

test('renderEventListeners should register delegated row click with dataset index', () => {
  const listeners = RenderEventListeners.renderEventListeners()

  expect(listeners).toBeDefined()
  expect(listeners).not.toContainEqual(
    expect.objectContaining({
      name: DomEventListenerFunctions.HandleTableKeyDown,
    }),
  )
})

test('renderEventListeners should register quick filter click with dataset value', () => {
  const listeners = RenderEventListeners.renderEventListeners()

  expect(listeners).toContainEqual({
    name: DomEventListenerFunctions.HandleEventCategoryFilter,
    params: ['handleEventCategoryFilter', 'event.target.dataset.value'],
  })
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

test('renderEventListeners should register table resizer pointer tracking listeners', () => {
  const listeners = RenderEventListeners.renderEventListeners()

  expect(listeners).toContainEqual({
    name: DomEventListenerFunctions.HandleTableResizerPointerDown,
    params: ['handleTableResizerPointerDown', EventExpression.TargetName, EventExpression.ClientX],
    trackPointerEvents: [DomEventListenerFunctions.HandleTableResizerPointerMove, DomEventListenerFunctions.HandleTableResizerPointerUp],
  })
  expect(listeners).toContainEqual({
    name: DomEventListenerFunctions.HandleTableResizerPointerMove,
    params: ['handleTableResizerPointerMove', EventExpression.ClientX],
  })
  expect(listeners).toContainEqual({
    name: DomEventListenerFunctions.HandleTableResizerPointerUp,
    params: ['handleTableResizerPointerUp'],
  })
})
