import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { getToolName } from '../GetToolName/GetToolName.ts'

const getMethods = new Set(['list_dir', 'list_files', 'read_file'])
const postMethods = new Set(['create_directory', 'create_file', 'mkdir', 'write_file'])
const deleteMethods = new Set(['delete_directory', 'delete_file', 'delete_folder', 'remove_directory', 'remove_file', 'remove_folder'])

export const getEventTableMethodLabel = (event: ChatViewEvent): string => {
  if (event.method) {
    return event.method
  }
  const toolName = getToolName(event)
  if (!toolName) {
    return ''
  }
  if (getMethods.has(toolName)) {
    return 'GET'
  }
  if (postMethods.has(toolName)) {
    return 'POST'
  }
  if (deleteMethods.has(toolName)) {
    return 'DELETE'
  }
  return ''
}
