import { expect, test } from '@jest/globals'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import { getImagePreviewDom } from '../src/parts/GetImagePreviewDom/GetImagePreviewDom.ts'

test('getImagePreviewDom should wrap the stats and alt text in separate spans', () => {
  const result = getImagePreviewDom({
    alt: 'diagram.png',
    previewType: 'image',
    src: 'data:image/png;base64,preview',
    stats: '2 × 2 px · 3 B',
  })

  expect(result).toEqual([
    {
      childCount: 2,
      className: 'ChatDebugViewImagePreview',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'ChatDebugViewImagePreviewImageWrapper',
      type: VirtualDomElements.Div,
    },
    {
      alt: 'diagram.png',
      childCount: 0,
      className: 'ChatDebugViewImagePreviewImage',
      src: 'data:image/png;base64,preview',
      type: VirtualDomElements.Img,
    },
    {
      childCount: 2,
      className: 'ChatDebugViewImagePreviewLabel',
      type: VirtualDomElements.Span,
    },
    {
      childCount: 1,
      type: VirtualDomElements.Span,
    },
    text('2 × 2 px · 3 B'),
    {
      childCount: 1,
      type: VirtualDomElements.Span,
    },
    text('diagram.png'),
  ])
})
