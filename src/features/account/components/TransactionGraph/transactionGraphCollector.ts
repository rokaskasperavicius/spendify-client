// Types
import { CollectorLineDotProps } from 'features/account/components/TransactionGraph/types'

export class TransactionGraphCollector {
  lineDots: CollectorLineDotProps[]
  activeLineDot: CollectorLineDotProps | undefined

  constructor() {
    this.lineDots = []
    this.activeLineDot = undefined
  }

  resetCollector = () => {
    this.lineDots = []
    this.activeLineDot = undefined
  }

  pushLineDot = (lineDot: CollectorLineDotProps) => {
    // console.log(this.lineDots)
    this.lineDots.push(lineDot)
  }

  getLineDots = () => {
    return this.lineDots
  }

  setActiveLineDot = (x: number, y: number) => {
    let closestLineDot = this.lineDots.reduce((prev, next) => {
      const prevX = prev.dotPayload.cx
      const nextX = next.dotPayload.cx

      return Math.abs(prevX - x) < Math.abs(nextX - x) ? prev : next
    }, this.lineDots[0])

    const lineDotsWithSameX = this.lineDots.filter(
      (lineDot) => lineDot.dotPayload.cx === closestLineDot.dotPayload.cx
    )

    if (lineDotsWithSameX.length > 1) {
      closestLineDot = lineDotsWithSameX.reduce((prev, next) => {
        const prevX = prev.dotPayload.cx
        const prevY = prev.dotPayload.cy

        const nextX = next.dotPayload.cx
        const nextY = next.dotPayload.cy

        const prevDistance = Math.sqrt(
          Math.pow(prevX - x, 2) + Math.pow(prevY - y, 2)
        )

        const nextDistance = Math.sqrt(
          Math.pow(nextX - x, 2) + Math.pow(nextY - y, 2)
        )

        return prevDistance < nextDistance ? prev : next
      }, lineDotsWithSameX[0])
    }
    // console.log(closestLineDot)

    this.activeLineDot = closestLineDot
  }

  getActiveLineDot = () => {
    return this.activeLineDot
  }
}
