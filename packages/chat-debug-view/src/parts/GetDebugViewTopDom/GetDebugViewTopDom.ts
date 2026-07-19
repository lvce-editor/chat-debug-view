import { mergeClassNames, type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { CategoryFilter } from '../EventCategoryFilter/EventCategoryFilter.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import { ChatDebugViewTop, ChatDebugViewTopDevtools, SearchField } from '../ClassNames/ClassNames.ts'
import * as GetFilterInputDom from '../GetFilterInputDom/GetFilterInputDom.ts'
import { getQuickFilterNodes } from '../GetQuickFilterNodes/GetQuickFilterNodes.ts'
import * as GetRefreshButtonDom from '../GetRefreshButtonDom/GetRefreshButtonDom.ts'

const filterInputWrapperNode: VirtualDomNode = {
  childCount: 1,
  className: SearchField,
  role: AriaRoles.None,
  type: VirtualDomElements.Div,
}

const debugViewTopNode: VirtualDomNode = {
  childCount: 2,
  className: ChatDebugViewTop,
  type: VirtualDomElements.Search,
}

const getFilterInputWrapperDom = (filterValue: string, useDevtoolsLayout: boolean): readonly VirtualDomNode[] => {
  return [filterInputWrapperNode, GetFilterInputDom.getFilterInputDom(filterValue, useDevtoolsLayout)]
}

export const getDebugViewTopDom = (
  filterValue: string,
  useDevtoolsLayout: boolean,
  categoryFilters: readonly CategoryFilter[],
): readonly VirtualDomNode[] => {
  const refreshButtonDom = GetRefreshButtonDom.getRefreshButtonDom()
  if (useDevtoolsLayout) {
    const quickFilterNodes = getQuickFilterNodes(categoryFilters)
    return [
      {
        childCount: 2 + (quickFilterNodes.length > 0 ? 1 : 0),
        className: mergeClassNames(ChatDebugViewTop, ChatDebugViewTopDevtools),
        type: VirtualDomElements.Search,
      },
      ...getFilterInputWrapperDom(filterValue, true),
      ...quickFilterNodes,
      ...refreshButtonDom,
    ]
  }

  return [debugViewTopNode, ...getFilterInputWrapperDom(filterValue, false), ...refreshButtonDom]
}
