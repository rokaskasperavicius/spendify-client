import { useState } from 'react'

// Components
import { Input, Button } from 'components/ui'

// Hooks
import { useLoginMutation } from 'features/auth/api'
import { Link, useNavigate } from 'react-router-dom'

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
    <div className='h-full flex justify-center items-center bg-primary'>
      <div className='p-6 w-[600px]'>
        <h2 className='font-medium text-[#f9f871] text-3xl'>
          Sign in To Your Account
        </h2>

        <label className='flex flex-col my-6'>
          <span className='text-white'>Email</span>
          <Input onChange={(e) => setEmail(e.target.value)} />
        </label>

        <label className='flex flex-col mb-6'>
          <span className='text-white'>Password</span>
          <Input
            type='password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        {/* <span className='text-[#B38A58]'>Incorrect email or password</span> */}
        <div className='flex justify-between text-[#f9f871] mb-6'>
          <Link to='/register'>Forgot Your Password?</Link>
          <Link to='/register'>Need an Account?</Link>
        </div>

        {/* #FFA552 */}
        <Button onClick={handleClick}>Sign In</Button>
      </div>
    </div>
  )
}
