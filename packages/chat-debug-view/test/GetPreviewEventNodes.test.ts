import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { getPreviewEventNodes } from '../src/parts/GetPreviewEventNodes/GetPreviewEventNodes.ts'

test('getPreviewEventNodes should render image previews using an img node', () => {
  const result = getPreviewEventNodes({
    alt: 'diagram.png',
    previewType: 'image',
    src: 'data:image/png;base64,preview',
  }) as readonly {
    readonly alt?: string
    readonly className?: string
    readonly src?: string
    readonly text?: string
    readonly type?: number
  }[]

  expect(result).toContainEqual(
    expect.objectContaining({
      alt: 'diagram.png',
      className: 'ChatDebugViewImagePreviewImage',
      src: 'data:image/png;base64,preview',
      type: VirtualDomElements.Img,
    }),
  )
  expect(result).toContainEqual(
    expect.objectContaining({
      text: 'diagram.png',
    }),
  )
})
