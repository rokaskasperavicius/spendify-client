type Props = Array<{
  id: string
  from: number | undefined
  to: number | undefined
}>

export const filterIntervals = (intervals: Props) =>
  intervals.filter((interval) => interval.from && interval.to) as Array<{
    id: string
    from: number
    to: number
  }>
