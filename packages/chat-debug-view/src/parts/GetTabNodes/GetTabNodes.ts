import { mergeClassNames, type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import { ChatDebugViewDetailsTab, ChatDebugViewDetailsTabSelected } from '../ClassNames/ClassNames.ts'
import * as DetailTab from '../DetailTab/DetailTab.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getPanelId } from '../GetPanelId/GetPanelId.ts'
import { getTabId } from '../GetTabId/GetTabId.ts'
import * as InputName from '../InputName/InputName.ts'

const getDetailTabDom = (detailTab: string, selectedDetailTab: string): readonly VirtualDomNode[] => {
  const isSelected = detailTab === selectedDetailTab
  return [
    {
      'aria-controls': getPanelId(detailTab),
      'aria-selected': isSelected,
      childCount: 1,
      className: mergeClassNames(ChatDebugViewDetailsTab, isSelected ? ChatDebugViewDetailsTabSelected : ''),
      id: getTabId(detailTab),
      name: InputName.DetailTab,
      onChange: DomEventListenerFunctions.SelectDetailTab,
      onClick: DomEventListenerFunctions.SelectDetailTab,
      role: 'tab',
      tabIndex: isSelected ? 0 : -1,
      type: VirtualDomElements.Button,
      value: detailTab,
    },
    text(DetailTab.getDetailTabLabel(detailTab)),
  ]
}

export const getTabNodes = (selectedDetailTab: string): readonly VirtualDomNode[] => {
  return DetailTab.detailTabs.flatMap((detailTab) => {
    return getDetailTabDom(detailTab, selectedDetailTab)
  })
}
