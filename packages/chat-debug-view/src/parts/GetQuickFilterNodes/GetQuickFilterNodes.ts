import { mergeClassNames, type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { CategoryFilter } from '../EventCategoryFilter/EventCategoryFilter.ts'
import { ChatDebugViewQuickFilterPill, ChatDebugViewQuickFilterPillSelected, ChatDebugViewQuickFilters } from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'

export const getQuickFilterNodes = (categoryFilters: readonly CategoryFilter[]): readonly VirtualDomNode[] => {
  return [
    {
      childCount: categoryFilters.length,
      className: ChatDebugViewQuickFilters,
      onClick: DomEventListenerFunctions.HandleEventCategoryFilter,
      role: 'listbox',
      type: VirtualDomElements.Div,
    },
    ...categoryFilters.flatMap((categoryFilter) => {
      const isSelected = categoryFilter.isSelectedProperty
      return [
        {
          'aria-selected': isSelected,
          childCount: 1,
          className: mergeClassNames(ChatDebugViewQuickFilterPill, isSelected ? ChatDebugViewQuickFilterPillSelected : ''),
          'data-value': categoryFilter.name,
          onClick: DomEventListenerFunctions.HandleEventCategoryFilter,
          role: 'option',
          type: VirtualDomElements.Div,
        },
        text(categoryFilter.label),
      ]
    }),
  ]
}
