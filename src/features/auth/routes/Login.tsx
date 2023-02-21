import { useState } from 'react'

// Components
import { Input, Button } from 'components/ui'

// Hooks
import { useLoginMutation } from 'features/auth/api'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
  const [login] = useLoginMutation()
  const navigate = useNavigate()

  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()

  const handleClick = async () => {
    const data = {
      email,
      password,
    }

    try {
      await login(data).unwrap()
      navigate('/')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className='h-full'>
      <div className='p-6 text-white text-2xl font-medium'>Spendify</div>

      <div className='h-full flex justify-center items-center -mt-12'>
        <div className='p-6 w-[600px]'>
          <h2 className='font-medium text-[#f9f871] text-xl'>
            Sign in To Your Account
          </h2>

          <label className='flex flex-col my-6'>
            <span>Email</span>
            <Input onChange={(e) => setEmail(e.target.value)} />
          </label>

          <label className='flex flex-col mb-6'>
            Password
            <Input
              type='password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <Button onClick={handleClick}>Sign In</Button>
        </div>
      </div>
    </div>
  )
}
