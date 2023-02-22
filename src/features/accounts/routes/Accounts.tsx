import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
const data = [
  { name: '1st, 2023', value: 400 },
  { name: '2nd, 2023', value: 500 },
  { name: '3rd, 2023', value: 800 },
  { name: '5th, 2023', value: 100 },
  { name: '6th, 2023', value: 100 },
  { name: '7th, 2023', value: 100 },
  { name: '8th, 2023', value: 200 },
  { name: '9th, 2023', value: 500 },
  { name: '10th, 2023', value: 800 },
  { name: '11h, 2023', value: 900 },
  { name: '12th, 2023', value: 100 },
  { name: '13th, 2023', value: 100 },
  { name: '14th, 2023', value: 300 },
  { name: '15th, 2023', value: 100 },
  { name: '16th, 2023', value: 100 },
  { name: '17th, 2023', value: 600 },
  { name: '18th, 2023', value: 700 },
  { name: '19th, 2023', value: 800 },
  { name: '20th, 2023', value: 100 },
  { name: '21th, 2023', value: 800 },
  { name: '22th, 2023', value: 800 },
  { name: '22th, 2023', value: 100 },
  { name: '23th, 2023', value: 100 },
  { name: '24th, 2023', value: 100 },
  { name: '25th, 2023', value: 300 },
  { name: '26th, 2023', value: 400 },
  { name: '27th, 2023', value: 700 },
  { name: '28th, 2023', value: 900 },
]

export const Accounts = () => {
  return (
    <div className='flex h-full border-y border-gray-300'>
      <aside className='w-[300px] border-r border-gray-300 p-4 space-y-4'>
        <div>Linked Accounts</div>
        <div className='flex gap-4 items-center cursor-pointer group'>
          <img
            src='https://cdn.nordigen.com/ais/LAN_AND_SPAR_BANK_LOSADKKK.png'
            width={70}
            alt='bank'
          />

          <div>
            <div className='group-hover:underline'>Studiekonto</div>
            <div className='text-gray-500 text-sm mt-1'>DK4404004025963089</div>
          </div>
        </div>

        <div className='bg-gray-300 h-[1px] w-full' />

        <div className='flex gap-4 items-center cursor-pointer group'>
          <img
            src='https://cdn.nordigen.com/ais/LAN_AND_SPAR_BANK_LOSADKKK.png'
            width={70}
            alt='bank'
          />

          <div>
            <div className='group-hover:underline'>StudieOpsparing</div>
            <div className='text-gray-500 text-sm mt-1'>DK3904004028411265</div>
          </div>
        </div>

        <button className='bg-primary px-4 py-2 rounded-md w-full text-white'>
          Link a new Account
        </button>
      </aside>

      {/* <div className='flex-1 flex justify-center items-center'>
        <div>Please select an Account</div>
      </div> */}

      <div className='flex-1 flex flex-col'>
        <div className='p-4 border-b border-gray-300'>
          <div>Studiekonto</div>
          <div className='text-gray-500 text-sm mt-1'>DK4404004025963089</div>
        </div>

        <div className='flex-1'>
          <ResponsiveContainer>
            <LineChart
              data={data}
              margin={{ top: 10, right: 50, bottom: 0, left: 10 }}
            >
              <Line
                type='monotone'
                dataKey='value'
                stroke='#8884d8'
                animationDuration={3000}
              />
              <XAxis dataKey='name' minTickGap={20} />
              <YAxis
                orientation='right'
                // axisLine={false}
                // tickLine={false}
                width={30}
                mirror={true}
                padding={{ top: 0, bottom: 20 }}
                label={{ value: 'kr.', position: 'right' }}
              />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
