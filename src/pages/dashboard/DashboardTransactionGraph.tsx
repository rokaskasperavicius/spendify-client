import { useState } from 'react'
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

// Components
import { Spinner } from 'components/ui'

// Types
import {
  GetAccountTransactions,
  AccountTransactionProps,
} from 'features/account/types'

import theme from 'styles/theme'

type Props = {
  isLoading: boolean
  transactions: GetAccountTransactions | undefined
}

const graphColor = ['#163b23', '#e9c4dc', '#0B0A91']

type CollectorLineDotProps = {
  lineIndex: number

  dotPayload: LineDotProps
  transactionPayload: AccountTransactionProps
}

type MousePosition = {
  x: number
  y: number
}

type LineDotProps = {
  id: string
  r: number
  cx: number
  cy: number
  fill: string
  stroke: string
  strokeWidth: number
  height: number
  value: number
  width: number
  index: number
  payload: AccountTransactionProps
}

// https://gist.github.com/Muzietto/270dba9ba818edab44d95cab99da0365
function tooltipCollector() {
  const lineDots: CollectorLineDotProps[] = []

  let _collection: any = []
  let ACTIVE: any = {}
  let activePayload: any = []
  let mousePos: any = { x: 0, y: 0 }

  return {
    collect: (y: any, t: any, id: any, yCoord: any) => {
      _collection.push({ index: t, x: y, y: yCoord, id })
    },
    maxAndMin: () => {
      return _collection
    },
    setMousePos: (x: any, y: any) => {
      mousePos = { x, y }
    },
    getMousePos: () => {
      return mousePos
    },

    setActive: (x: any) => {
      activePayload.push(x)
    },
    getActive: () => {
      return activePayload
    },

    setOne: (x: any) => {
      ACTIVE = x
    },
    getOne: () => {
      return ACTIVE
    },

    reset: () => {
      _collection = []
      activePayload = []
      ACTIVE = {}
      mousePos = { x: 0, y: 0 }
    },
  }
}

export const DashboardTransactionGraph = ({
  isLoading,
  transactions,
}: Props) => {
  const THE_COLLECTOR = tooltipCollector()

  const dotCount = transactions?.reduce((acc, cul) => {
    acc += cul.transactions.length
    return acc
  }, 0)

  return (
    <Spinner isLoading={isLoading}>
      <ResponsiveContainer>
        <LineChart
          // onClick={(e) => THE_COLLECTOR.setMousePos(e.chartX, e.chartY)}
          onMouseMove={(e) => THE_COLLECTOR.setMousePos(e.chartX, e.chartY)}
          // data={transactions}
          margin={{ top: 10, right: 50, bottom: 0, left: 10 }}
        >
          {transactions?.map((transaction, index) => (
            <>
              <Line
                onAnimationStart={() => console.log('START')}
                dot={
                  <Test
                    THE_COLLECTOR={THE_COLLECTOR}
                    bbb={index}
                    count={dotCount}
                  />
                }
                activeDot={<Test2 bbb={index} THE_COLLECTOR={THE_COLLECTOR} />}
                id={transaction.id}
                xAxisId={transaction.id}
                // dot={false}
                data={transaction.transactions}
                key={transaction.id}
                type='monotone'
                dataKey={(a) => a.amountInt}
                stroke={graphColor[index]}
                animationDuration={400}
                strokeWidth={2}
                // activeDot={{
                //   onMouseOver: (e: any) => console.log(e),
                //   onMouseLeave: (e: any) => console.log(e),
                // }}
              />
              {/* <XAxis dataKey='date' minTickGap={20} /> */}
              <XAxis
                xAxisId={transaction.id}
                hide={true}
                // tick={<Test bbb={index} />}
              />
            </>
          ))}
          <YAxis
            orientation='right'
            // axisLine={false}
            // tickLine={false}
            width={30}
            mirror={true}
            padding={{ top: 0, bottom: 20 }}
            label={{ value: 'DKK', position: 'right' }}
          />
          <Tooltip
            cursor={<Test3 THE_COLLECTOR={THE_COLLECTOR} />}
            content={<CustomTooltip THE_COLLECTOR={THE_COLLECTOR} />}
          />
        </LineChart>
      </ResponsiveContainer>
    </Spinner>
  )
}

type LineChartTooltip = {
  active: boolean

  getMousePosition: () => MousePosition
  // getLinePoints: () => LinePoints
}

const CustomTooltip = ({ active, THE_COLLECTOR, ...a }: any) => {
  // console.log('CLICk')
  // console.log(a)

  // console.log(THE_COLLECTOR.maxAndMin())

  // console.log(payload[0]?.payload, payload[1]?.payload)
  // console.log(a)

  // console.log(a.coordinate.x)

  // const goal = a.coordinate.x
  const { x: goal, y } = THE_COLLECTOR.getMousePos()
  // console.log(THE_COLLECTOR.getMousePos())

  const coords = THE_COLLECTOR.maxAndMin()
  // console.log(coords)
  // console.log(THE_COLLECTOR.getActive())
  // console.log(coords)
  // goal = 5
  // console.log(goal)

  var closest = coords?.reduce(
    function (prev: any, curr: any) {
      return Math.abs(curr.x - goal) < Math.abs(prev.x - goal) ? curr : prev
    },
    { index: 0, x: 0, y: 0 }
  )

  const closestX = closest.x

  const xMultiples = coords.filter((coord: any) => coord.x === closestX)
  // console.log(xMultiples)
  const isMultiple = xMultiples.length > 1

  // console.log(isMultiple, closestX, coords)

  if (isMultiple) {
    // console.log(xMultiples)
    // Math.abs(curr.x - goal) < Math.abs(prev.x - goal) ? curr : prev

    closest = xMultiples?.reduce(function (prev: any, curr: any) {
      const currNorm = Math.sqrt(
        Math.pow(curr.x - goal, 2) + Math.pow(curr.y - y, 2)
      )

      const prevNorm = Math.sqrt(
        Math.pow(prev.x - goal, 2) + Math.pow(prev.y - y, 2)
      )

      return currNorm < prevNorm ? curr : prev
    }, xMultiples[0])
  }

  // console.log(closest)

  const index = coords.findIndex(
    (a: any) => a.index === closest.index && a.x === closest.x
  )

  THE_COLLECTOR.setOne(
    index >= 0 ? THE_COLLECTOR.getActive()[index] : undefined
  )

  // const payload = THE_COLLECTOR.getOne()

  const payload = index >= 0 ? THE_COLLECTOR.getActive()[index] : undefined

  const closestIndex = closest.index

  // console.log(closest)
  // console.log(payload)

  // console.log(goal)
  // console.log(closest)
  // console.log(coords)

  const data =
    payload && (payload?.payload as GetAccountTransactions | undefined)

  if (active && data) {
    return (
      <div
        className='border-2 rounded-md p-4 bg-white flex gap-6'
        style={{ borderColor: graphColor[closestIndex] }}
      >
        <div>
          <span className='font-medium'>{data.title}</span> ({data.category})
          <div className='text-gray-500'>{data.date}</div>
        </div>

        <div className='flex flex-col items-end'>
          <div className='font-medium'>{data.amount} DKK</div>
          <div className='text-gray-500'>{data.totalAmount} DKK</div>
        </div>
      </div>
    )
  }

  return null
}

const Test = ({ THE_COLLECTOR, bbb, count, ...a }: any) => {
  const coords = THE_COLLECTOR.maxAndMin()

  // console.log(a)

  const id = a.id

  // console.log(coords.length, count, a)
  if (!coords.find((coord: any) => coord.x === a.cx && coord.index === bbb)) {
    THE_COLLECTOR.collect(a.cx, bbb, a.id, a.cy)
    THE_COLLECTOR.setActive(a)
  }

  // console.log(a)
  // console.log(a)

  // console.log(THE_COLLECTOR)
  // console.log(a)
  // console.log(THE_COLLECTOR.maxAndMin())
  return (
    <circle
      r={a.r}
      // id={a.id}
      stroke={a.stroke}
      stroke-width={a.strokeWidth}
      fill={a.fill}
      fillOpacity={0}
      width={a.width}
      height={a.height}
      cx={a.cx}
      cy={a.cy}
      // className='recharts-dot recharts-line-dot z-1'
    ></circle>
  )
}

const Test2 = ({ bbb, THE_COLLECTOR }: any) => {
  const a = THE_COLLECTOR.getOne()
  // console.log(a.cx, a.cy)

  if (!a) return null
  return (
    <circle
      r={a.r}
      // r={10}
      id={a.id}
      fill={a.stroke}
      // fill='#FF0000'
      // stroke='#FF0000'
      stroke-width={a.strokeWidth}
      // stroke={a.fill}
      stroke={a.stroke}
      width={a.width}
      height={a.height}
      cx={a.cx}
      // cx={1290}
      cy={a.cy}
      // cy={511.8666666666667}
      // className='recharts-dot recharts-line-dot z-50'
    ></circle>
  )
}

const Test3 = ({ THE_COLLECTOR, ...b }: any) => {
  // console.log(b)
  const a = THE_COLLECTOR.getOne()
  // console.log(a)

  // return null

  if (!a) return null
  return (
    <line
      {...a}
      x1={a.cx}
      y1={0}
      x2={a.cx}
      y2={a.height + 10}
      stroke-width={1}
      stroke='#ccc'
      className='recharts-tooltip-cursor'
    />
  )
}
