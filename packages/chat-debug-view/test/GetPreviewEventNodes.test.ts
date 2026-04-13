import { expect, test } from '@jest/globals'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import { getPreviewEventNodes } from '../src/parts/GetPreviewEventNodes/GetPreviewEventNodes.ts'
import * as UiStrings from '../src/parts/UiStrings/UiStrings.ts'

test('getPreviewEventNodes should render image previews using an img node', () => {
  const result = getPreviewEventNodes({
    alt: 'diagram.png',
    previewType: 'image',
    src: 'data:image/png;base64,preview',
    stats: '2 × 2 px · 3 B',
  }) as readonly {
    readonly alt?: string
    readonly className?: string
    readonly src?: string
    readonly text?: string
    readonly type?: number
  }[]

  expect(result).toContainEqual(
    expect.objectContaining({
      className: 'ChatDebugViewImagePreviewImageWrapper',
      type: VirtualDomElements.Div,
    }),
  )
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
      childCount: 2,
      className: 'ChatDebugViewImagePreviewLabel',
      type: VirtualDomElements.Span,
    }),
  )
  expect(result).toContainEqual(
    expect.objectContaining({
      text: '2 × 2 px · 3 B',
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
    readonly childCount?: number
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
      childCount: 1,
      className: 'EditorContainer',
      type: VirtualDomElements.Div,
    }),
  )
  expect(result).toContainEqual(
    expect.objectContaining({
      childCount: 0,
      className: 'Gutter',
      type: VirtualDomElements.Div,
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
    readonly childCount?: number
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
      childCount: 1,
      className: 'EditorContainer',
      type: VirtualDomElements.Div,
    }),
  )
  expect(result).toContainEqual(
    expect.objectContaining({
      childCount: 0,
      className: 'Gutter',
      type: VirtualDomElements.Div,
    }),
  )
  expect(result).toContainEqual(
    expect.objectContaining({
      text: 'first line',
    }),
  )
  expect(result).toContainEqual(
    expect.objectContaining({
      text: 'second line',
    }),
  )
})

test('getPreviewEventNodes should render preview text in an editor shell', () => {
  const result = getPreviewEventNodes('first line\nsecond line') as readonly {
    readonly className?: string
    readonly text?: string
    readonly role?: string
    readonly style?: string
    readonly type?: number
    readonly ['aria-autocomplete']?: string
    readonly ['aria-multiline']?: boolean
    readonly ['aria-roledescription']?: string
    readonly autocapitalize?: string
    readonly autocomplete?: string
    readonly autocorrect?: string
    readonly name?: string
    readonly spellcheck?: boolean
    readonly wrap?: string
  }[]

  expect(result).toEqual([
    {
      childCount: 1,
      className: 'EditorContainer',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 2,
      className: 'Viewlet Editor',
      role: 'code',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 2,
      className: 'Gutter',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'row',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'ChatDebugViewEventLineNumber',
      type: VirtualDomElements.Span,
    },
    text('1'),
    {
      childCount: 1,
      className: 'row',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'ChatDebugViewEventLineNumber',
      type: VirtualDomElements.Span,
    },
    text('2'),
    {
      childCount: 2,
      className: 'EditorContent',
      type: VirtualDomElements.Div,
    },
    {
      'aria-autocomplete': 'list',
      'aria-multiline': true,
      'aria-roledescription': 'editor',
      autocapitalize: 'off',
      autocomplete: 'off',
      autocorrect: 'off',
      childCount: 0,
      className: 'EditorInput',
      name: 'editor',
      role: 'textbox',
      spellcheck: false,
      type: VirtualDomElements.TextArea,
      wrap: 'off',
    },
    {
      childCount: 2,
      className: 'EditorLayers',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'Selections',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: 'EditorSelection',
      style: 'height: 20px; left: 0px; top: 20px; width: 0px;',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 2,
      className: 'EditorRows',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 2,
      className: 'EditorRow',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'Token TokenText',
      type: VirtualDomElements.Span,
    },
    text('first line'),
    {
      childCount: 2,
      className: 'EditorRow',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'Token TokenText',
      type: VirtualDomElements.Span,
    },
    text('second line'),
  ])
})
