import { TooltipProps } from 'recharts'

export const DashboardBarChartTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<string, string>) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload

    return (
      <div className='border border-black rounded-md p-4 bg-white max-w-xs sm:max-w-md md:max-w-2xl'>
        <p className='font-medium'>{label}</p>
        <p className='text-error-red'>Expenses: {data.expenses} DKK</p>
        <p className='text-primary'>Income: {data.income} DKK</p>
      </div>
    )
  }

  return null
}
