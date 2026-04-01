import { EventExpression } from '@lvce-editor/constants'
import type { DomEventListener } from '../DomEventListener/DomEventListener.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'

export const renderEventListeners = (): readonly DomEventListener[] => {
  return [
    {
      name: DomEventListenerFunctions.HandleEventRowClick,
      params: ['handleEventRowClick', 'event.target.dataset.index'],
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
  ]
}
