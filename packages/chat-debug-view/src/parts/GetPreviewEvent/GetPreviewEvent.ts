import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { getPreviewMessageText } from '../GetPreviewMessageText/GetPreviewMessageText.ts'
import { getPreviewName } from '../GetPreviewName/GetPreviewName.ts'
import { hasOwn } from '../HasOwn/HasOwn.ts'
import { shouldIncludeArguments } from '../ShouldIncludeArguments/ShouldIncludeArguments.ts'

export const getPreviewEvent = (event: ChatViewEvent): unknown => {
  const previewMessageText = getPreviewMessageText(event)
  if (previewMessageText !== undefined) {
    return previewMessageText
  }
  const name = getPreviewName(event)
  const previewEvent = {
    ...(name === undefined ? {} : { name }),
    ...(shouldIncludeArguments(event, name) ? { arguments: event.arguments } : {}),
    ...(hasOwn(event, 'result') ? { result: event.result } : {}),
  }
  if (Object.keys(previewEvent).length > 0) {
    return previewEvent
  }
  return event
}
