import { EventExpression } from '@lvce-editor/constants'
import type { DomEventListener } from '../DomEventListener/DomEventListener.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'

export const renderEventListeners = (): readonly DomEventListener[] => {
  return [
    {
      name: DomEventListenerFunctions.HandleEventRowClick,
      params: ['handleEventRowClick', 'event.target.dataset.index', 'event.button'],
    },
    {
      name: DomEventListenerFunctions.HandleTableBodyContextMenu,
      params: ['handleTableBodyContextMenu'],
      preventDefault: true,
    },
    {
      name: DomEventListenerFunctions.HandleDetailsContextMenu,
      params: ['handleDetailsContextMenu'],
      preventDefault: true,
    },
    {
      name: DomEventListenerFunctions.HandleTableKeyDown,
      params: ['handleTableKeyDown', EventExpression.Key],
    },
    {
      name: DomEventListenerFunctions.HandleFilterInput,
      params: ['handleInput', EventExpression.TargetName, EventExpression.TargetValue],
    },
    {
      name: DomEventListenerFunctions.HandleInput,
      params: ['handleInput', EventExpression.TargetName, EventExpression.TargetValue, EventExpression.TargetChecked],
    },
    {
      name: DomEventListenerFunctions.HandleSimpleInput,
      params: ['handleInput', EventExpression.TargetName, EventExpression.TargetValue],
    },
    {
      name: DomEventListenerFunctions.HandleSashPointerDown,
      params: ['handleSashPointerDown', EventExpression.ClientX, EventExpression.ClientY],
      trackPointerEvents: [DomEventListenerFunctions.HandleSashPointerMove, DomEventListenerFunctions.HandleSashPointerUp],
    },
    {
      name: DomEventListenerFunctions.HandleSashPointerMove,
      params: ['handleSashPointerMove', EventExpression.ClientX, EventExpression.ClientY],
    },
    {
      name: DomEventListenerFunctions.HandleSashPointerUp,
      params: ['handleSashPointerUp', EventExpression.ClientX, EventExpression.ClientY],
    },
    {
      name: DomEventListenerFunctions.HandleTimelinePointerDown,
      params: ['handleTimelinePointerDown', EventExpression.ClientX],
      trackPointerEvents: [DomEventListenerFunctions.HandleTimelinePointerMove, DomEventListenerFunctions.HandleTimelinePointerUp],
    },
    {
      name: DomEventListenerFunctions.HandleTimelinePointerMove,
      params: ['handleTimelinePointerMove', EventExpression.ClientX],
    },
    {
      name: DomEventListenerFunctions.HandleTimelinePointerUp,
      params: ['handleTimelinePointerUp', EventExpression.ClientX],
    },
    {
      name: DomEventListenerFunctions.HandleTimelineDoubleClick,
      params: ['handleTimelineDoubleClick'],
    },
  ]
}
