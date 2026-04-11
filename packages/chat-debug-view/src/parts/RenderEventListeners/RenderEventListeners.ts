import { EventExpression } from '@lvce-editor/constants'
import type { DomEventListener } from '../DomEventListener/DomEventListener.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'

export const renderEventListeners = (): readonly DomEventListener[] => {
  return [
    {
      name: DomEventListenerFunctions.HandleHeaderContextMenu,
      params: ['handleHeaderContextMenu', EventExpression.ClientX, EventExpression.ClientY],
      preventDefault: true,
    },
    {
      name: DomEventListenerFunctions.HandleEventRowClick,
      params: ['handleEventRowClick', EventExpression.ClientX, EventExpression.ClientY, EventExpression.Button],
    },
    {
      name: DomEventListenerFunctions.HandleEventRowClickAt,
      params: ['handleEventRowClickAt', EventExpression.ClientX, EventExpression.ClientY, EventExpression.Button],
    },
    {
      name: DomEventListenerFunctions.HandleTableBodyContextMenu,
      params: ['handleTableBodyContextMenu', EventExpression.ClientX, EventExpression.ClientY],
      preventDefault: true,
    },
    {
      name: DomEventListenerFunctions.HandleDetailsContextMenu,
      params: ['handleDetailsContextMenu'],
      preventDefault: true,
    },
    {
      name: DomEventListenerFunctions.HandleDetailsTopContextMenu,
      params: ['handleDetailsTopContextMenu'],
      preventDefault: true,
    },
    {
      name: DomEventListenerFunctions.HandleTimelineContextMenu,
      params: ['handleTimelineContextMenu'],
      preventDefault: true,
    },
    {
      name: DomEventListenerFunctions.HandleFilterInput,
      params: ['handleInput', EventExpression.TargetName, EventExpression.TargetValue],
    },
    {
      name: DomEventListenerFunctions.HandleEventCategoryFilter,
      params: ['handleEventCategoryFilter', EventExpression.TargetName, 'event.ctrlKey'],
    },
    {
      name: DomEventListenerFunctions.HandleTableHeaderClick,
      params: ['handleTableHeaderClick', EventExpression.TargetName],
    },
    {
      name: DomEventListenerFunctions.SelectDetailTab,
      params: ['selectDetailTab', EventExpression.TargetName],
    },
    {
      name: DomEventListenerFunctions.HandleTimelineRangePreset,
      params: ['handleTimelineRangePreset', 'event.target.dataset.value'],
    },
    {
      name: DomEventListenerFunctions.HandleCloseDetails,
      params: ['handleCloseDetails'],
    },
    {
      name: DomEventListenerFunctions.HandleClickRefresh,
      params: ['handleClickRefresh'],
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
      name: DomEventListenerFunctions.HandleTableResizerPointerDown,
      params: ['handleTableResizerPointerDown', EventExpression.TargetName, EventExpression.ClientX],
      trackPointerEvents: [DomEventListenerFunctions.HandleTableResizerPointerMove, DomEventListenerFunctions.HandleTableResizerPointerUp],
    },
    {
      name: DomEventListenerFunctions.HandleTableResizerPointerMove,
      params: ['handleTableResizerPointerMove', EventExpression.ClientX],
    },
    {
      name: DomEventListenerFunctions.HandleTableResizerPointerUp,
      params: ['handleTableResizerPointerUp'],
    },
    {
      name: DomEventListenerFunctions.HandleTimelinePointerDown,
      params: ['handleTimelinePointerDown', EventExpression.TargetName, EventExpression.ClientX],
      trackPointerEvents: [DomEventListenerFunctions.HandleTimelinePointerMove, DomEventListenerFunctions.HandleTimelinePointerUp],
    },
    {
      name: DomEventListenerFunctions.HandleTimelinePointerMove,
      params: ['handleTimelinePointerMove', EventExpression.ClientX],
    },
    {
      name: DomEventListenerFunctions.HandleTimelinePointerLeave,
      params: ['handleTimelinePointerLeave'],
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
