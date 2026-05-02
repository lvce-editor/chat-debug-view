import {
  TokenAttributeName,
  TokenComment,
  TokenKey,
  TokenKeyword,
  TokenNumeric,
  TokenPropertyName,
  TokenSelector,
  TokenString,
  TokenTag,
  TokenText,
} from '../ClassNames/ClassNames.ts'
import type { SyntaxHighlightLanguage } from '../GetLanguageFromFileExtension/GetLanguageFromFileExtension.ts'
import { getTokenSegments, type TokenSegment } from '../GetTokenSegments/GetTokenSegments.ts'
import { pushToken } from '../PushToken/PushToken.ts'

const jsKeywords = new Set([
  'async',
  'await',
  'class',
  'const',
  'else',
  'export',
  'extends',
  'for',
  'from',
  'function',
  'if',
  'import',
  'let',
  'new',
  'return',
  'switch',
  'try',
  'while',
])

const tsKeywords = new Set([...jsKeywords, 'interface', 'implements', 'number', 'readonly', 'string', 'type'])

const pythonKeywords = new Set([
  'as',
  'class',
  'def',
  'elif',
  'else',
  'except',
  'False',
  'for',
  'from',
  'if',
  'import',
  'None',
  'return',
  'True',
  'try',
  'while',
  'with',
])

const isIdentifierStart = (character: string | undefined): boolean => {
  return !!character && /[A-Za-z_$]/.test(character)
}

const isIdentifierPart = (character: string | undefined): boolean => {
  return !!character && /[A-Za-z0-9_$]/.test(character)
}

const isPythonIdentifierStart = (character: string | undefined): boolean => {
  return !!character && /[A-Za-z_]/.test(character)
}

const isPythonIdentifierPart = (character: string | undefined): boolean => {
  return !!character && /[A-Za-z0-9_]/.test(character)
}

const isDigit = (character: string | undefined): boolean => {
  return !!character && character >= '0' && character <= '9'
}

const getStringEnd = (value: string, start: number, quote: string): number => {
  let i = start + 1
  while (i < value.length) {
    if (value[i] === '\\') {
      i += 2
      continue
    }
    if (value[i] === quote) {
      return i + 1
    }
    i++
  }
  return value.length
}

const getBlockCommentEnd = (value: string, start: number, terminator: string): number => {
  const endIndex = value.indexOf(terminator, start)
  if (endIndex === -1) {
    return value.length
  }
  return endIndex + terminator.length
}

const getLineCommentEnd = (value: string, start: number): number => {
  const endIndex = value.indexOf('\n', start)
  if (endIndex === -1) {
    return value.length
  }
  return endIndex
}

const getNumberEnd = (value: string, start: number): number => {
  let i = start
  while (isDigit(value[i])) {
    i++
  }
  if (value[i] === '.') {
    i++
    while (isDigit(value[i])) {
      i++
    }
  }
  return i
}

const tokenizeCode = (
  value: string,
  keywords: ReadonlySet<string>,
  isIdentifierStartCharacter: (character: string | undefined) => boolean,
  isIdentifierPartCharacter: (character: string | undefined) => boolean,
  lineCommentPrefix: string,
  supportsBlockComments: boolean,
): readonly TokenSegment[] => {
  let segments: readonly TokenSegment[] = []
  let i = 0
  while (i < value.length) {
    if (value.startsWith(lineCommentPrefix, i)) {
      const end = getLineCommentEnd(value, i)
      segments = pushToken(segments, TokenComment, value.slice(i, end))
      i = end
      continue
    }
    if (supportsBlockComments && value.startsWith('/*', i)) {
      const end = getBlockCommentEnd(value, i, '*/')
      segments = pushToken(segments, TokenComment, value.slice(i, end))
      i = end
      continue
    }
    if (value[i] === '"' || value[i] === "'" || value[i] === '`') {
      const end = getStringEnd(value, i, value[i])
      segments = pushToken(segments, TokenString, value.slice(i, end))
      i = end
      continue
    }
    if (isDigit(value[i])) {
      const end = getNumberEnd(value, i)
      segments = pushToken(segments, TokenNumeric, value.slice(i, end))
      i = end
      continue
    }
    if (isIdentifierStartCharacter(value[i])) {
      let end = i + 1
      while (isIdentifierPartCharacter(value[end])) {
        end++
      }
      const identifier = value.slice(i, end)
      const className = keywords.has(identifier) ? TokenKeyword : TokenText
      segments = pushToken(segments, className, identifier)
      i = end
      continue
    }
    segments = pushToken(segments, TokenText, value[i])
    i++
  }
  return segments
}

const pushTrimmedSelector = (segments: readonly TokenSegment[], value: string): readonly TokenSegment[] => {
  const leadingWhitespace = value.match(/^\s*/)?.[0] ?? ''
  const trailingWhitespace = value.match(/\s*$/)?.[0] ?? ''
  const trimmed = value.slice(leadingWhitespace.length, value.length - trailingWhitespace.length)
  let result = segments
  result = pushToken(result, TokenText, leadingWhitespace)
  result = pushToken(result, TokenSelector, trimmed)
  result = pushToken(result, TokenText, trailingWhitespace)
  return result
}

const tokenizeCss = (value: string): readonly TokenSegment[] => {
  let segments: readonly TokenSegment[] = []
  let i = 0
  let inDeclarationBlock = false

  while (i < value.length) {
    if (value.startsWith('/*', i)) {
      const end = getBlockCommentEnd(value, i, '*/')
      segments = pushToken(segments, TokenComment, value.slice(i, end))
      i = end
      continue
    }
    if (value[i] === '"' || value[i] === "'") {
      const end = getStringEnd(value, i, value[i])
      segments = pushToken(segments, TokenString, value.slice(i, end))
      i = end
      continue
    }
    if (!inDeclarationBlock) {
      const nextBrace = value.indexOf('{', i)
      if (nextBrace === -1) {
        segments = pushToken(segments, TokenText, value.slice(i))
        break
      }
      segments = pushTrimmedSelector(segments, value.slice(i, nextBrace))
      segments = pushToken(segments, TokenText, '{')
      i = nextBrace + 1
      inDeclarationBlock = true
      continue
    }
    if (value[i] === '}') {
      segments = pushToken(segments, TokenText, '}')
      i++
      inDeclarationBlock = false
      continue
    }
    if (isDigit(value[i])) {
      const end = getNumberEnd(value, i)
      segments = pushToken(segments, TokenNumeric, value.slice(i, end))
      i = end
      continue
    }
    if (/[A-Za-z-]/.test(value[i])) {
      let end = i + 1
      while (/[A-Za-z-]/.test(value[end] ?? '')) {
        end++
      }
      const identifier = value.slice(i, end)
      let lookAhead = end
      while (value[lookAhead] === ' ' || value[lookAhead] === '\t') {
        lookAhead++
      }
      if (value[lookAhead] === ':') {
        segments = pushToken(segments, TokenPropertyName, identifier)
      } else {
        segments = pushToken(segments, TokenText, identifier)
      }
      i = end
      continue
    }
    segments = pushToken(segments, TokenText, value[i])
    i++
  }

  return segments
}

const tokenizeHtmlTag = (value: string, start: number): { readonly end: number; readonly segments: readonly TokenSegment[] } => {
  let segments: readonly TokenSegment[] = []

  if (value.startsWith('</', start)) {
    const end = value.indexOf('>', start)
    const tagEnd = end === -1 ? value.length : end + 1
    segments = pushToken(segments, TokenTag, value.slice(start, tagEnd))
    return { end: tagEnd, segments }
  }

  let i = start + 1
  while (/[A-Za-z0-9:-]/.test(value[i] ?? '')) {
    i++
  }
  segments = pushToken(segments, TokenTag, value.slice(start, i))

  while (i < value.length) {
    if (value[i] === '>') {
      segments = pushToken(segments, TokenText, '>')
      return { end: i + 1, segments }
    }
    if (value[i] === '"' || value[i] === "'") {
      const end = getStringEnd(value, i, value[i])
      segments = pushToken(segments, TokenString, value.slice(i, end))
      i = end
      continue
    }
    if (/[A-Za-z:_-]/.test(value[i])) {
      let end = i + 1
      while (/[A-Za-z0-9:_-]/.test(value[end] ?? '')) {
        end++
      }
      const attributeName = value.slice(i, end)
      segments = pushToken(segments, TokenAttributeName, attributeName)
      i = end
      continue
    }
    segments = pushToken(segments, TokenText, value[i])
    i++
  }

  return { end: value.length, segments }
}

const tokenizeHtml = (value: string): readonly TokenSegment[] => {
  let segments: readonly TokenSegment[] = []
  let i = 0
  while (i < value.length) {
    if (value.startsWith('<!--', i)) {
      const end = getBlockCommentEnd(value, i, '-->')
      segments = pushToken(segments, TokenComment, value.slice(i, end))
      i = end
      continue
    }
    if (value[i] === '<') {
      const tokenizedTag = tokenizeHtmlTag(value, i)
      for (const segment of tokenizedTag.segments) {
        segments = pushToken(segments, segment.className, segment.value)
      }
      i = tokenizedTag.end
      continue
    }
    const nextTag = value.indexOf('<', i)
    const end = nextTag === -1 ? value.length : nextTag
    segments = pushToken(segments, TokenText, value.slice(i, end))
    i = end
  }
  return segments
}

export const getSyntaxHighlightTokens = (value: string, language: SyntaxHighlightLanguage): readonly TokenSegment[] => {
  switch (language) {
    case 'css':
      return tokenizeCss(value)
    case 'html':
      return tokenizeHtml(value)
    case 'javascript':
      return tokenizeCode(value, jsKeywords, isIdentifierStart, isIdentifierPart, '//', true)
    case 'json':
      return getTokenSegments(value)
    case 'python':
      return tokenizeCode(value, pythonKeywords, isPythonIdentifierStart, isPythonIdentifierPart, '#', false)
    case 'typescript':
      return tokenizeCode(value, tsKeywords, isIdentifierStart, isIdentifierPart, '//', true)
  }
}
