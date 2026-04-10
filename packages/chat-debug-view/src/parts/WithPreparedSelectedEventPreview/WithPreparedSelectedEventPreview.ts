import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { getAttachmentImagePreview } from '../GetAttachmentImagePreview/GetAttachmentImagePreview.ts'
import { setSelectedEventPreview } from '../SelectedEventPreview/SelectedEventPreview.ts'

export const withPreparedSelectedEventPreview = async (event: ChatViewEvent): Promise<ChatViewEvent> => {
  const preview = await getAttachmentImagePreview(event)
  return setSelectedEventPreview(event, preview)
}
