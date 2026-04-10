import { terminate } from '@lvce-editor/viewlet-registry'
import * as AppendStoredEventForTest from '../AppendStoredEventForTest/AppendStoredEventForTest.ts'
import * as AppendStoredImageAttachmentForTest from '../AppendStoredImageAttachmentForTest/AppendStoredImageAttachmentForTest.ts'
import * as Create from '../Create/Create.ts'
import { diff2 } from '../Diff2/Diff2.ts'
import { getMenuEntries2 } from '../GetMenuEntries2/GetMenuEntries2.ts'
import { getMenuIds } from '../GetMenuIds/GetMenuIds.ts'
import * as HandleClickRefresh from '../HandleClickRefresh/HandleClickRefresh.ts'
import * as HandleCloseDetails from '../HandleCloseDetails/HandleCloseDetails.ts'
import * as HandleDetailsContextMenu from '../HandleDetailsContextMenu/HandleDetailsContextMenu.ts'
import * as HandleDetailsTopContextMenu from '../HandleDetailsTopContextMenu/HandleDetailsTopContextMenu.ts'
import * as SelectDetailTab from '../HandleDetailTab/HandleDetailTab.ts'
import * as HandleEventCategoryFilter from '../HandleEventCategoryFilter/HandleEventCategoryFilter.ts'
import * as HandleEventRowClick from '../HandleEventRowClick/HandleEventRowClick.ts'
import * as HandleHeaderContextMenu from '../HandleHeaderContextMenu/HandleHeaderContextMenu.ts'
import * as HandleInput from '../HandleInput/HandleInput.ts'
import * as HandleSashPointerDown from '../HandleSashPointerDown/HandleSashPointerDown.ts'
import * as HandleSashPointerMove from '../HandleSashPointerMove/HandleSashPointerMove.ts'
import * as HandleSashPointerUp from '../HandleSashPointerUp/HandleSashPointerUp.ts'
import * as HandleTableBodyContextMenu from '../HandleTableBodyContextMenu/HandleTableBodyContextMenu.ts'
import * as HandleTableResizerPointerDown from '../HandleTableResizerPointerDown/HandleTableResizerPointerDown.ts'
import * as HandleTableResizerPointerMove from '../HandleTableResizerPointerMove/HandleTableResizerPointerMove.ts'
import * as HandleTableResizerPointerUp from '../HandleTableResizerPointerUp/HandleTableResizerPointerUp.ts'
import * as HandleTableRowCopy from '../HandleTableRowCopy/HandleTableRowCopy.ts'
import * as HandleTimelineContextMenu from '../HandleTimelineContextMenu/HandleTimelineContextMenu.ts'
import * as HandleTimelineDoubleClick from '../HandleTimelineDoubleClick/HandleTimelineDoubleClick.ts'
import * as HandleTimelineInput from '../HandleTimelineInput/HandleTimelineInput.ts'
import * as HandleTimelinePointerDown from '../HandleTimelinePointerDown/HandleTimelinePointerDown.ts'
import * as HandleTimelinePointerMove from '../HandleTimelinePointerMove/HandleTimelinePointerMove.ts'
import * as HandleTimelinePointerUp from '../HandleTimelinePointerUp/HandleTimelinePointerUp.ts'
import * as HandleUseDevtoolsLayout from '../HandleUseDevtoolsLayout/HandleUseDevtoolsLayout.ts'
import * as HandleVisibilityToggles from '../HandleVisibilityToggles/HandleVisibilityToggles.ts'
import * as LoadContent from '../LoadContent/LoadContent.ts'
import * as Refresh from '../Refresh/Refresh.ts'
import { render2 } from '../Render2/Render2.ts'
import { renderEventListeners } from '../RenderEventListeners/RenderEventListeners.ts'
import * as Rerender from '../Rerender/Rerender.ts'
import * as ResetTableColumns from '../ResetTableColumns/ResetTableColumns.ts'
import * as Resize from '../Resize/Resize.ts'
import { saveState } from '../SaveState/SaveState.ts'
import * as SetEvents from '../SetEvents/SetEvents.ts'
import * as SetSessionId from '../SetSessionId/SetSessionId.ts'
import { getCommandIds, wrapCommand, wrapGetter } from '../State/ChatDebugViewStates.ts'
import * as ToggleTableColumnVisibility from '../ToggleTableColumnVisibility/ToggleTableColumnVisibility.ts'

export const commandMap = {
  'ChatDebug.appendStoredEventForTest': wrapCommand(AppendStoredEventForTest.appendStoredEventForTest),
  'ChatDebug.appendStoredImageAttachmentForTest': wrapCommand(AppendStoredImageAttachmentForTest.appendStoredImageAttachmentForTest),
  'ChatDebug.create': Create.create,
  'ChatDebug.diff2': diff2,
  'ChatDebug.getCommandIds': getCommandIds,
  'ChatDebug.getMenuEntries': wrapGetter(getMenuEntries2),
  'ChatDebug.getMenuIds': getMenuIds,
  'ChatDebug.handleClickRefresh': wrapCommand(HandleClickRefresh.handleClickRefresh),
  'ChatDebug.handleCloseDetails': wrapCommand(HandleCloseDetails.handleCloseDetails),
  'ChatDebug.handleDetailsContextMenu': wrapCommand(HandleDetailsContextMenu.handleDetailsContextMenu),
  'ChatDebug.handleDetailsTopContextMenu': wrapCommand(HandleDetailsTopContextMenu.handleDetailsTopContextMenu),
  'ChatDebug.handleEventCategoryFilter': wrapCommand(HandleEventCategoryFilter.handleEventCategoryFilter),
  'ChatDebug.handleEventRowClick': wrapCommand(HandleEventRowClick.handleEventRowClick),
  'ChatDebug.handleHeaderContextMenu': wrapCommand(HandleHeaderContextMenu.handleHeaderContextMenu),
  'ChatDebug.handleInput': wrapCommand(HandleInput.handleInput),
  'ChatDebug.handleSashPointerDown': wrapCommand(HandleSashPointerDown.handleSashPointerDown),
  'ChatDebug.handleSashPointerMove': wrapCommand(HandleSashPointerMove.handleSashPointerMove),
  'ChatDebug.handleSashPointerUp': wrapCommand(HandleSashPointerUp.handleSashPointerUp),
  'ChatDebug.handleShowEventStreamFinishedEvents': wrapCommand(HandleVisibilityToggles.handleShowEventStreamFinishedEvents),
  'ChatDebug.handleShowInputEvents': wrapCommand(HandleVisibilityToggles.handleShowInputEvents),
  'ChatDebug.handleShowResponsePartEvents': wrapCommand(HandleVisibilityToggles.handleShowResponsePartEvents),
  'ChatDebug.handleTableBodyContextMenu': wrapCommand(HandleTableBodyContextMenu.handleTableBodyContextMenu),
  'ChatDebug.handleTableResizerPointerDown': wrapCommand(HandleTableResizerPointerDown.handleTableResizerPointerDown),
  'ChatDebug.handleTableResizerPointerMove': wrapCommand(HandleTableResizerPointerMove.handleTableResizerPointerMove),
  'ChatDebug.handleTableResizerPointerUp': wrapCommand(HandleTableResizerPointerUp.handleTableResizerPointerUp),
  'ChatDebug.handleTableRowCopy': wrapCommand(HandleTableRowCopy.handleTableRowCopy),
  'ChatDebug.handleTimelineContextMenu': wrapCommand(HandleTimelineContextMenu.handleTimelineContextMenu),
  'ChatDebug.handleTimelineDoubleClick': wrapCommand(HandleTimelineDoubleClick.handleTimelineDoubleClick),
  'ChatDebug.handleTimelineEndSeconds': wrapCommand(HandleTimelineInput.handleTimelineEndSeconds),
  'ChatDebug.handleTimelinePointerDown': wrapCommand(HandleTimelinePointerDown.handleTimelinePointerDown),
  'ChatDebug.handleTimelinePointerMove': wrapCommand(HandleTimelinePointerMove.handleTimelinePointerMove),
  'ChatDebug.handleTimelinePointerUp': wrapCommand(HandleTimelinePointerUp.handleTimelinePointerUp),
  'ChatDebug.handleTimelineRangePreset': wrapCommand(HandleTimelineInput.handleTimelineRangePreset),
  'ChatDebug.handleTimelineStartSeconds': wrapCommand(HandleTimelineInput.handleTimelineStartSeconds),
  'ChatDebug.handleUseDevtoolsLayout': wrapCommand(HandleUseDevtoolsLayout.setUseDevtoolsLayout),
  'ChatDebug.loadContent': wrapCommand(LoadContent.loadContent),
  'ChatDebug.loadContent2': wrapCommand(LoadContent.loadContent),
  'ChatDebug.refresh': wrapCommand(Refresh.refresh),
  'ChatDebug.render2': render2,
  'ChatDebug.renderEventListeners': renderEventListeners,
  'ChatDebug.rerender': wrapCommand(Rerender.rerender),
  'ChatDebug.resetTableColumns': wrapCommand(ResetTableColumns.resetTableColumns),
  'ChatDebug.resize': wrapCommand(Resize.resize),
  'ChatDebug.saveState': wrapGetter(saveState),
  'ChatDebug.selectDetailTab': wrapCommand(SelectDetailTab.selectDetailTab),
  'ChatDebug.setEvents': wrapCommand(SetEvents.setEvents),
  'ChatDebug.setSessionId': wrapCommand(SetSessionId.setSessionId),
  'ChatDebug.terminate': terminate,
  'ChatDebug.toggleTableColumnVisibility': wrapCommand(ToggleTableColumnVisibility.toggleTableColumnVisibility),
}
