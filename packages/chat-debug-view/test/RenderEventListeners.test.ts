import { expect, test } from '@jest/globals'
import { EventExpression } from '@lvce-editor/constants'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as RenderEventListeners from '../src/parts/RenderEventListeners/RenderEventListeners.ts'

test('renderEventListeners should register delegated row click with dataset index', () => {
  const listeners = RenderEventListeners.renderEventListeners()

  expect(listeners).toBeDefined()
  expect(listeners).not.toContainEqual(
    expect.objectContaining({
      params: ['handleTableKeyDown', 'event.key'],
    }),
  )
})

test('renderEventListeners should register quick filter click with target name', () => {
  const listeners = RenderEventListeners.renderEventListeners()

  expect(listeners).toContainEqual({
    name: DomEventListenerFunctions.HandleEventCategoryFilter,
    params: ['handleEventCategoryFilter', EventExpression.TargetName, 'event.ctrlKey', 'event.metaKey'],
  })
})

test('renderEventListeners should register detail tab selection with target name', () => {
  const listeners = RenderEventListeners.renderEventListeners()

  expect(listeners).toContainEqual({
    name: DomEventListenerFunctions.SelectDetailTab,
    params: ['selectDetailTab', EventExpression.TargetName],
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

test('renderEventListeners should register timeline double click listener', () => {
  const listeners = RenderEventListeners.renderEventListeners()

  expect(listeners).toContainEqual({
    name: DomEventListenerFunctions.HandleTimelineDoubleClick,
    params: ['handleTimelineDoubleClick'],
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
