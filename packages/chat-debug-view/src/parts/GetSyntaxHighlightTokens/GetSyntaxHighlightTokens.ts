/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */

import type { SyntaxHighlightLanguage } from '../GetLanguageFromFileExtension/GetLanguageFromFileExtension.ts'
import {
  TokenAttributeName,
  TokenComment,
  TokenKeyword,
  TokenNumeric,
  TokenPropertyName,
  TokenSelector,
  TokenString,
  TokenTag,
  TokenText,
} from '../ClassNames/ClassNames.ts'
import { getTokenSegments, type TokenSegment } from '../GetTokenSegments/GetTokenSegments.ts'
import { pushToken } from '../PushToken/PushToken.ts'

const jsIdentifierStartRegex = /[A-Za-z_$]/
const jsIdentifierPartRegex = /[\w$]/
const pythonIdentifierStartRegex = /[A-Za-z_]/
const pythonIdentifierPartRegex = /\w/
const cssIdentifierRegex = /[A-Za-z-]/
const htmlTagNameRegex = /[A-Za-z0-9:-]/
const htmlAttributeStartRegex = /[A-Za-z:_-]/
const htmlAttributePartRegex = /[\w:-]/
const leadingWhitespaceRegex = /^\s*/
const trailingWhitespaceRegex = /\s*$/

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
  return !!character && jsIdentifierStartRegex.test(character)
}

const isIdentifierPart = (character: string | undefined): boolean => {
  return !!character && jsIdentifierPartRegex.test(character)
}

const isPythonIdentifierStart = (character: string | undefined): boolean => {
  return !!character && pythonIdentifierStartRegex.test(character)
}

const isPythonIdentifierPart = (character: string | undefined): boolean => {
  return !!character && pythonIdentifierPartRegex.test(character)
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

type IdentifierPredicate = (character: string | undefined) => boolean

type MutableTokenizerState = {
  i: number
  segments: readonly TokenSegment[]
}

const appendLineComment = (value: string, state: MutableTokenizerState): boolean => {
  if (!value.startsWith('//', state.i) && !value.startsWith('#', state.i)) {
    return false
  }
  const end = getLineCommentEnd(value, state.i)
  state.segments = pushToken(state.segments, TokenComment, value.slice(state.i, end))
  state.i = end
  return true
}

const appendBlockComment = (value: string, state: MutableTokenizerState): boolean => {
  if (!value.startsWith('/*', state.i)) {
    return false
  }
  const end = getBlockCommentEnd(value, state.i, '*/')
  state.segments = pushToken(state.segments, TokenComment, value.slice(state.i, end))
  state.i = end
  return true
}

const appendStringToken = (value: string, state: MutableTokenizerState): boolean => {
  const quote = value[state.i]
  if (quote !== '"' && quote !== "'" && quote !== '`') {
    return false
  }
  const end = getStringEnd(value, state.i, quote)
  state.segments = pushToken(state.segments, TokenString, value.slice(state.i, end))
  state.i = end
  return true
}

const appendNumericToken = (value: string, state: MutableTokenizerState): boolean => {
  if (!isDigit(value[state.i])) {
    return false
  }
  const end = getNumberEnd(value, state.i)
  state.segments = pushToken(state.segments, TokenNumeric, value.slice(state.i, end))
  state.i = end
  return true
}

const appendIdentifierToken = (
  value: string,
  state: MutableTokenizerState,
  keywords: ReadonlySet<string>,
  isIdentifierStartCharacter: IdentifierPredicate,
  isIdentifierPartCharacter: IdentifierPredicate,
): boolean => {
  if (!isIdentifierStartCharacter(value[state.i])) {
    return false
  }
  let end = state.i + 1
  while (isIdentifierPartCharacter(value[end])) {
    end++
  }
  const identifier = value.slice(state.i, end)
  const className = keywords.has(identifier) ? TokenKeyword : TokenText
  state.segments = pushToken(state.segments, className, identifier)
  state.i = end
  return true
}

const appendTextCharacter = (value: string, state: MutableTokenizerState): void => {
  state.segments = pushToken(state.segments, TokenText, value[state.i])
  state.i++
}

const tokenizeCode = (
  value: string,
  keywords: ReadonlySet<string>,
  isIdentifierStartCharacter: IdentifierPredicate,
  isIdentifierPartCharacter: IdentifierPredicate,
  supportsBlockComments: boolean,
): readonly TokenSegment[] => {
  const state: MutableTokenizerState = {
    i: 0,
    segments: [],
  }
  while (state.i < value.length) {
    if (appendLineComment(value, state)) {
      continue
    }
    if (supportsBlockComments && appendBlockComment(value, state)) {
      continue
    }
    if (appendStringToken(value, state)) {
      continue
    }
    if (appendNumericToken(value, state)) {
      continue
    }
    if (appendIdentifierToken(value, state, keywords, isIdentifierStartCharacter, isIdentifierPartCharacter)) {
      continue
    }
    appendTextCharacter(value, state)
  }
  return state.segments
}

const pushTrimmedSelector = (segments: readonly TokenSegment[], value: string): readonly TokenSegment[] => {
  const leadingWhitespace = value.match(leadingWhitespaceRegex)?.[0] ?? ''
  const trailingWhitespace = value.match(trailingWhitespaceRegex)?.[0] ?? ''
  const trimmed = value.slice(leadingWhitespace.length, value.length - trailingWhitespace.length)
  let result = segments
  result = pushToken(result, TokenText, leadingWhitespace)
  result = pushToken(result, TokenSelector, trimmed)
  result = pushToken(result, TokenText, trailingWhitespace)
  return result
}

const getCssIdentifierEnd = (value: string, start: number): number => {
  let end = start + 1
  while (cssIdentifierRegex.test(value[end] ?? '')) {
    end++
  }
  return end
}

const getCssIdentifierClassName = (value: string, end: number): string => {
  let lookAhead = end
  while (value[lookAhead] === ' ' || value[lookAhead] === '\t') {
    lookAhead++
  }
  return value[lookAhead] === ':' ? TokenPropertyName : TokenText
}

const appendCssIdentifier = (value: string, state: MutableTokenizerState): boolean => {
  if (!cssIdentifierRegex.test(value[state.i] ?? '')) {
    return false
  }
  const end = getCssIdentifierEnd(value, state.i)
  const identifier = value.slice(state.i, end)
  state.segments = pushToken(state.segments, getCssIdentifierClassName(value, end), identifier)
  state.i = end
  return true
}

const appendCssOutsideDeclaration = (value: string, state: MutableTokenizerState): boolean => {
  const nextBrace = value.indexOf('{', state.i)
  if (nextBrace === -1) {
    state.segments = pushToken(state.segments, TokenText, value.slice(state.i))
    state.i = value.length
    return true
  }
  state.segments = pushTrimmedSelector(state.segments, value.slice(state.i, nextBrace))
  state.segments = pushToken(state.segments, TokenText, '{')
  state.i = nextBrace + 1
  return false
}

const tokenizeCss = (value: string): readonly TokenSegment[] => {
  const state: MutableTokenizerState = {
    i: 0,
    segments: [],
  }
  let inDeclarationBlock = false

  while (state.i < value.length) {
    if (appendBlockComment(value, state)) {
      continue
    }
    if (appendStringToken(value, state)) {
      continue
    }
    if (!inDeclarationBlock) {
      if (appendCssOutsideDeclaration(value, state)) {
        break
      }
      inDeclarationBlock = true
      continue
    }
    if (value[state.i] === '}') {
      state.segments = pushToken(state.segments, TokenText, '}')
      state.i++
      inDeclarationBlock = false
      continue
    }
    if (appendNumericToken(value, state)) {
      continue
    }
    if (appendCssIdentifier(value, state)) {
      continue
    }
    appendTextCharacter(value, state)
  }

  return state.segments
}

const getHtmlTagNameEnd = (value: string, start: number): number => {
  let i = start + 1
  while (htmlTagNameRegex.test(value[i] ?? '')) {
    i++
  }
  return i
}

const getHtmlAttributeEnd = (value: string, start: number): number => {
  let end = start + 1
  while (htmlAttributePartRegex.test(value[end] ?? '')) {
    end++
  }
  return end
}

const appendHtmlAttribute = (value: string, state: MutableTokenizerState): boolean => {
  if (!htmlAttributeStartRegex.test(value[state.i] ?? '')) {
    return false
  }
  const end = getHtmlAttributeEnd(value, state.i)
  state.segments = pushToken(state.segments, TokenAttributeName, value.slice(state.i, end))
  state.i = end
  return true
}

const appendHtmlString = (value: string, state: MutableTokenizerState): boolean => {
  const quote = value[state.i]
  if (quote !== '"' && quote !== "'") {
    return false
  }
  const end = getStringEnd(value, state.i, quote)
  state.segments = pushToken(state.segments, TokenString, value.slice(state.i, end))
  state.i = end
  return true
}

const tokenizeHtmlTag = (value: string, start: number): { readonly end: number; readonly segments: readonly TokenSegment[] } => {
  let segments: readonly TokenSegment[] = []

  if (value.startsWith('</', start)) {
    const end = value.indexOf('>', start)
    const tagEnd = end === -1 ? value.length : end + 1
    segments = pushToken(segments, TokenTag, value.slice(start, tagEnd))
    return { end: tagEnd, segments }
  }

  let i = getHtmlTagNameEnd(value, start)
  segments = pushToken(segments, TokenTag, value.slice(start, i))

  while (i < value.length) {
    if (value[i] === '>') {
      segments = pushToken(segments, TokenText, '>')
      return { end: i + 1, segments }
    }
    const state: MutableTokenizerState = { i, segments }
    if (appendHtmlString(value, state)) {
      i = state.i
      segments = state.segments
      continue
    }
    if (appendHtmlAttribute(value, state)) {
      i = state.i
      segments = state.segments
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
      const { end, segments: tagSegments } = tokenizeHtmlTag(value, i)
      for (const segment of tagSegments) {
        segments = pushToken(segments, segment.className, segment.value)
      }
      i = end
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
      return tokenizeCode(value, jsKeywords, isIdentifierStart, isIdentifierPart, true)
    case 'json':
      return getTokenSegments(value)
    case 'python':
      return tokenizeCode(value, pythonKeywords, isPythonIdentifierStart, isPythonIdentifierPart, false)
    case 'typescript':
      return tokenizeCode(value, tsKeywords, isIdentifierStart, isIdentifierPart, true)
  }
}
