import { mergeClassNames, type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { CategoryFilter } from '../EventCategoryFilter/EventCategoryFilter.ts'
import {
  ChatDebugViewQuickFilterInput,
  ChatDebugViewQuickFilterPill,
  ChatDebugViewQuickFilterPillSelected,
  ChatDebugViewQuickFilters,
} from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as InputName from '../InputName/InputName.ts'

export const getQuickFilterNodes = (eventCategoryFilter: string, categoryFilters: readonly CategoryFilter[]): readonly VirtualDomNode[] => {
  return [
    {
      childCount: categoryFilters.length,
      className: ChatDebugViewQuickFilters,
      type: VirtualDomElements.Div,
    },
    ...categoryFilters.flatMap((categoryFilter) => {
      const isSelected = categoryFilter.name === eventCategoryFilter
      return [
        {
          childCount: 2,
          className: mergeClassNames(ChatDebugViewQuickFilterPill, isSelected ? ChatDebugViewQuickFilterPillSelected : ''),
          type: VirtualDomElements.Label,
        },
        {
          checked: isSelected,
          childCount: 0,
          className: ChatDebugViewQuickFilterInput,
          inputType: 'radio',
          name: InputName.EventCategoryFilter,
          onChange: DomEventListenerFunctions.HandleEventCategoryFilter,
          type: VirtualDomElements.Input,
          value: categoryFilter.name,
        },
        text(categoryFilter.label),
      ]
    }),
  ]
}
