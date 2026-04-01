import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { EventCategoryFilterOption } from '../EventCategoryFilter/EventCategoryFilter.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as InputName from '../InputName/InputName.ts'

export const getQuickFilterNodes = (
  eventCategoryFilter: string,
  eventCategoryFilterOptions: readonly EventCategoryFilterOption[],
): readonly VirtualDomNode[] => {
  return [
    {
      childCount: eventCategoryFilterOptions.length,
      className: 'ChatDebugViewQuickFilters',
      type: VirtualDomElements.Div,
    },
    ...eventCategoryFilterOptions.flatMap((option) => {
      const isSelected = option.value === eventCategoryFilter
      return [
        {
          childCount: 2,
          className: `ChatDebugViewQuickFilterPill${isSelected ? ' ChatDebugViewQuickFilterPillSelected' : ''}`,
          type: VirtualDomElements.Label,
        },
        {
          checked: isSelected,
          childCount: 0,
          className: 'ChatDebugViewQuickFilterInput',
          inputType: 'radio',
          name: InputName.EventCategoryFilter,
          onChange: DomEventListenerFunctions.HandleInput,
          type: VirtualDomElements.Input,
          value: option.value,
        },
        text(option.label),
      ]
    }),
  ]
}
