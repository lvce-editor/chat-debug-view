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

export const getQuickFilterNodes = (categoryFilters: readonly CategoryFilter[]): readonly VirtualDomNode[] => {
  return [
    {
      childCount: categoryFilters.length,
      className: ChatDebugViewQuickFilters,
      role: 'listbox',
      type: VirtualDomElements.Div,
    },
    ...categoryFilters.flatMap((categoryFilter) => {
      const isSelected = categoryFilter.isSelectedProperty
      return [
        {
          ariaSelected: isSelected ? 'true' : 'false',
          childCount: 2,
          className: mergeClassNames(ChatDebugViewQuickFilterPill, isSelected ? ChatDebugViewQuickFilterPillSelected : ''),
          role: 'option',
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
