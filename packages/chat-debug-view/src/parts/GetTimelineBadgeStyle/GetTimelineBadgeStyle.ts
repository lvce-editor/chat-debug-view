import { roundSeconds } from '../RoundSeconds/RoundSeconds.ts'

export const getTimelineBadgeStyle = (index: number, lastIndex: number): string => {
  if (index === 0 || lastIndex === 0) {
    return 'left:0;transform:translateX(0);'
  }
  if (index === lastIndex) {
    return 'left:100%;transform:translateX(-100%);'
  }
  return `left:${roundSeconds((index / lastIndex) * 100)}%;transform:translateX(-50%);`
}
