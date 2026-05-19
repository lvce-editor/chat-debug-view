const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const pad2 = (value: number): string => {
  return value.toString().padStart(2, '0')
}

const pad3 = (value: number): string => {
  return value.toString().padStart(3, '0')
}

export const formatTimestamp = (date: Readonly<Date>): string => {
  const month = monthNames[date.getUTCMonth()]
  const day = pad2(date.getUTCDate())
  const year = date.getUTCFullYear()
  const hours = pad2(date.getUTCHours())
  const minutes = pad2(date.getUTCMinutes())
  const seconds = pad2(date.getUTCSeconds())
  const milliseconds = pad3(date.getUTCMilliseconds())

  return `${month} ${day}, ${year}, ${hours}:${minutes}:${seconds}.${milliseconds} UTC`
}
