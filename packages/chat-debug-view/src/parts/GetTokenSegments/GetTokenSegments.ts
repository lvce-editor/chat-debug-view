import { pushToken } from '../PushToken/PushToken.ts'

const numberRegex = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?/
const whitespaceRegex = /\s/u

interface TokenSegment {
  readonly className: string
  readonly value: string
}

export const getTokenSegments = (json: string): readonly TokenSegment[] => {
  const segments: TokenSegment[] = []
  let i = 0
  while (i < json.length) {
    const character = json[i]
    if (character === '"') {
      const start = i
      i++
      while (i < json.length) {
        const currentCharacter = json[i]
        if (currentCharacter === '\\') {
          i += 2
          continue
        }
        if (currentCharacter === '"') {
          i++
          break
        }
        i++
      }
      const tokenValue = json.slice(start, i)
      let lookAheadIndex = i
      while (lookAheadIndex < json.length && whitespaceRegex.test(json[lookAheadIndex])) {
        lookAheadIndex++
      }
      const className = json[lookAheadIndex] === ':' ? 'TokenKey' : 'TokenString'
      pushToken(segments, className, tokenValue)
      continue
    }

    const numberMatch = numberRegex.exec(json.slice(i))
    if (numberMatch) {
      pushToken(segments, 'TokenNumeric', numberMatch[0])
      i += numberMatch[0].length
      continue
    }

    if (json.startsWith('true', i)) {
      pushToken(segments, 'TokenBoolean', 'true')
      i += 4
      continue
    }

    if (json.startsWith('false', i)) {
      pushToken(segments, 'TokenBoolean', 'false')
      i += 5
      continue
    }

    if (json.startsWith('null', i)) {
      pushToken(segments, 'TokenBoolean', 'null')
      i += 4
      continue
    }

    pushToken(segments, 'TokenText', character)
    i++
  }
  return segments
}
