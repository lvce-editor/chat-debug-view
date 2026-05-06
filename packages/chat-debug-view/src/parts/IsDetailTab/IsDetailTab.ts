import * as InputName from '../InputName/InputName.ts'

export const isDetailTab = (value: string): boolean => {
  return (
    value === InputName.Response ||
    value === InputName.Preview ||
    value === InputName.Payload ||
    value === InputName.Headers ||
    value === InputName.Timing
  )
}
