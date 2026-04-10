import { mergeClassNames, type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { DetailTab } from '../DetailTab/DetailTab.ts'
import { ChatDebugViewDetailsTab, ChatDebugViewDetailsTabSelected } from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getPanelId } from '../GetPanelId/GetPanelId.ts'
import { getTabId } from '../GetTabId/GetTabId.ts'
import * as InputName from '../InputName/InputName.ts'

const getDetailTabDom = (detailTab: DetailTab): readonly VirtualDomNode[] => {
  const isSelected = detailTab.isSelected
  return [
    {
      'aria-controls': getPanelId(detailTab.name),
      'aria-selected': isSelected,
      childCount: 1,
      className: mergeClassNames(ChatDebugViewDetailsTab, isSelected ? ChatDebugViewDetailsTabSelected : ''),
      id: getTabId(detailTab.name),
      name: InputName.DetailTab,
      onChange: DomEventListenerFunctions.SelectDetailTab,
      onClick: DomEventListenerFunctions.SelectDetailTab,
      role: 'tab',
      tabIndex: isSelected ? 0 : -1,
      type: VirtualDomElements.Button,
      value: detailTab.name,
    },
    text(detailTab.label),
  ]
}

export const getTabNodes = (detailTabs: readonly DetailTab[]): readonly VirtualDomNode[] => {
  return detailTabs.flatMap((detailTab) => {
    return getDetailTabDom(detailTab)
  })
}
