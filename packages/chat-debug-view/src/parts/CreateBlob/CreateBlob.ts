import * as CreateCanvasBlob from '../CreateCanvasBlob/CreateCanvasBlob.ts'
import * as DecodeBase64 from '../DecodeBase64/DecodeBase64.ts'

export const createBlob = async (mimeType: string, contentKind: string, content: string): Promise<Blob> => {
  if (contentKind === 'canvas') {
    return CreateCanvasBlob.createCanvasBlob(mimeType)
  }
  if (contentKind === 'base64') {
    return new Blob([DecodeBase64.decodeBase64(content)], {
      type: mimeType,
    })
  }
  return new Blob([content], {
    type: mimeType,
  })
}
