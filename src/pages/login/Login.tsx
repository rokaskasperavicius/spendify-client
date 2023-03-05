import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'

// Components
import { Input, Button } from 'components/ui'

// Hooks & Helpers
import { isFetchBaseQueryError } from 'services/isFetchBaseQueryError'
import { useLoginUserMutation } from 'features/auth/authApi'

// Types
import { LoginFormValues } from 'pages/login/types'
import { ERROR_CODES } from 'services/types'

export const Login = () => {
  const { register, handleSubmit } = useForm<LoginFormValues>()
  const [loginUser] = useLoginUserMutation()
  const navigate = useNavigate()

  const [isWrongPassword, setIsWrongPassword] = useState(false)

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      await loginUser(data).unwrap()
      navigate('/')
    } catch (error) {
      if (
        isFetchBaseQueryError(error) &&
        error.code === ERROR_CODES.INVALID_CREDENTIALS
      ) {
        setIsWrongPassword(true)
      }
    }
  }

  return (
    <div className='h-full flex justify-center items-center bg-primary'>
      <div className='p-6 w-[600px]'>
        <h2 className='font-medium text-secondary text-3xl'>
          Sign in To Your Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label className='flex flex-col my-6'>
            <span className='text-white'>Email</span>
            <Input {...register('email', { required: true })} />
          </label>

          <label className='flex flex-col mb-6'>
            <span className='text-white'>Password</span>
            <Input
              type='password'
              {...register('password', { required: true })}
            />
          </label>

          {isWrongPassword && (
            <div className='text-error my-3'>Invalid email or password</div>
          )}

          {/* #FFA552 */}
          <Button type='submit' variant='secondary'>
            Sign In
          </Button>

          <div className='flex justify-between text-secondary mt-2'>
            <Link to='/register'>Forgot Your Password?</Link>
            <Link to='/register'>Need an Account?</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
