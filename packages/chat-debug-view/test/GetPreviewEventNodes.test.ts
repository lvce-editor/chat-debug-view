import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { getPreviewEventNodes } from '../src/parts/GetPreviewEventNodes/GetPreviewEventNodes.ts'
import * as UiStrings from '../src/parts/UiStrings/UiStrings.ts'

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

test('getPreviewEventNodes should render invalid image fallback text without line numbers', () => {
  const result = getPreviewEventNodes(UiStrings.ImageCouldNotBeLoaded) as readonly {
    readonly className?: string
    readonly text?: string
    readonly type?: number
  }[]

  expect(result).not.toContainEqual(
    expect.objectContaining({
      className: 'ChatDebugViewEventLineNumber',
    }),
  )
  expect(result).toContainEqual(
    expect.objectContaining({
      className: 'ChatDebugViewEventRawText',
      type: VirtualDomElements.P,
    }),
  )
  expect(result).toContainEqual(
    expect.objectContaining({
      text: UiStrings.ImageCouldNotBeLoaded,
    }),
  )
})

test('getPreviewEventNodes should render chat-message-updated preview text without line numbers', () => {
  const result = getPreviewEventNodes('first line\nsecond line', {
    eventId: 1,
    text: 'first line\nsecond line',
    type: 'chat-message-updated',
  }) as readonly {
    readonly className?: string
    readonly text?: string
    readonly type?: number
  }[]

  expect(result).not.toContainEqual(
    expect.objectContaining({
      className: 'ChatDebugViewEventLineNumber',
    }),
  )
  expect(result).toContainEqual(
    expect.objectContaining({
      className: 'ChatDebugViewEventRawText',
      type: VirtualDomElements.P,
    }),
  )
  expect(result).toContainEqual(
    expect.objectContaining({
      text: 'first line\nsecond line',
    }),
  )
})

test('getPreviewEventNodes should wrap preview line numbers in a gutter', () => {
  const result = getPreviewEventNodes('first line\nsecond line') as readonly {
    readonly className?: string
    readonly text?: string
    readonly type?: number
  }[]

  expect(result).toContainEqual(
    expect.objectContaining({
      className: 'Gutter',
      type: VirtualDomElements.Div,
    }),
  )
  expect(result).toContainEqual(
    expect.objectContaining({
      className: 'Rows',
      type: VirtualDomElements.Div,
    }),
  )
  expect(result).toContainEqual(
    expect.objectContaining({
      className: 'ChatDebugViewEventLineNumber',
      type: VirtualDomElements.Span,
    }),
  )
})
