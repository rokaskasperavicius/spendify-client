import { useState } from 'react'

// Components
import { Input, Button } from 'components/ui'

// Hooks
import { useRegisterMutation } from 'features/auth/api'
import { Link, useNavigate } from 'react-router-dom'

export const Register = () => {
  const [register] = useRegisterMutation()
  const navigate = useNavigate()

  const [firstName, setFirstName] = useState<string>()
  const [lastName, setLastName] = useState<string>()
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()

  const handleClick = async () => {
    const data = {
      firstName,
      lastName,
      email,
      password,
    }

    try {
      await register(data).unwrap()
      navigate('/login')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className='h-full flex justify-center items-center bg-primary'>
      <div className='p-6 w-[600px]'>
        <h2 className='font-medium text-[#f9f871] text-3xl'>
          Sign up for an Account
        </h2>

        <label className='flex flex-col my-6'>
          <span className='text-white'>First Name</span>
          <Input onChange={(e) => setFirstName(e.target.value)} />
        </label>

        <label className='flex flex-col my-6'>
          <span className='text-white'>Last Name</span>
          <Input onChange={(e) => setLastName(e.target.value)} />
        </label>

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
        <div className='text-[#f9f871] mb-6'>
          <Link to='/login'>Have an Account?</Link>
        </div>

        {/* #FFA552 */}
        <Button onClick={handleClick}>Sign Up</Button>
      </div>
    </div>
  )
}
