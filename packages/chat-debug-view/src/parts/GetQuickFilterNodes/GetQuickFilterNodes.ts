// cspell:ignore multiselectable
import { mergeClassNames, type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { CategoryFilter } from '../EventCategoryFilter/EventCategoryFilter.ts'
import { ChatDebugViewQuickFilterPill, ChatDebugViewQuickFilterPillSelected, ChatDebugViewQuickFilters } from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'

export const getQuickFilterNodes = (categoryFilters: readonly CategoryFilter[]): readonly VirtualDomNode[] => {
  return [
    {
      'aria-multiselectable': true,
      childCount: categoryFilters.length,
      className: ChatDebugViewQuickFilters,
      onClick: DomEventListenerFunctions.HandleEventCategoryFilter,
      role: 'listbox',
      type: VirtualDomElements.Div,
    },
    ...categoryFilters.flatMap((categoryFilter) => {
      const { isSelected, label, name } = categoryFilter
      return [
        {
          ariaSelected: isSelected,
          childCount: 1,
          className: mergeClassNames(ChatDebugViewQuickFilterPill, isSelected ? ChatDebugViewQuickFilterPillSelected : ''),
          name,
          onClick: DomEventListenerFunctions.HandleEventCategoryFilter,
          role: 'option',
          type: VirtualDomElements.Button,
        },
        text(label),
      ]
    }),
  ]
}
