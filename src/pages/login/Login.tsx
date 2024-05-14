import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import { Button, Input } from '@/components/ui'

import { useLoginUserMutation } from '@/features/auth/authApi'
import { useAuthState } from '@/features/auth/authSlice'

import { useTitle } from '@/hooks/useTitle'

import { isFetchBaseQueryError } from '@/services/isFetchBaseQueryError'
import { ERROR_CODES } from '@/services/types'

export type LoginFormValues = {
  email: string
  password: string
}

export const Login = () => {
  useTitle('Sign in')

  const { register, handleSubmit } = useForm<LoginFormValues>()
  const [loginUser] = useLoginUserMutation()
  const navigate = useNavigate()

  const [isWrongPassword, setIsWrongPassword] = useState(false)

  const { accessToken } = useAuthState()

  useEffect(() => {
    if (accessToken) {
      navigate('/')
    }
  }, [accessToken, navigate])

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
        <h1 className='font-medium text-secondary text-3xl font-secondary'>
          Sign in To Your Account
        </h1>

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
            <div className='text-error my-3 text-base'>
              Invalid email or password
            </div>
          )}

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
