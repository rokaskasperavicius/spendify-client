import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import isEmail from 'validator/lib/isEmail'

import { Button, Input } from '@/components/ui'

import { useRegisterUserMutation } from '@/features/auth/auth.api'
import { useAuthState } from '@/features/auth/auth.slice'
import { isPasswordValid } from '@/features/auth/utils/is-password-valid'

import { useTitle } from '@/hooks/use-title'

import { ERROR_CODES } from '@/lib/types'
import { isFetchBaseQueryError } from '@/lib/utils/is-fetch-base-query-error'

export type RegisterFormValues = {
  name: string
  email: string
  password: string
  repeatPassword: string
}

export const Register = () => {
  useTitle('Sign up')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>()

  const [registerUser] = useRegisterUserMutation()
  const navigate = useNavigate()
  const [isWrongEmail, setIsWrongEmail] = useState(false)

  const { isAuthenticated } = useAuthState()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    try {
      await registerUser(data).unwrap()
      navigate('/login')
    } catch (err) {
      if (isFetchBaseQueryError(err) && err.code === ERROR_CODES.USER_EXISTS) {
        setIsWrongEmail(true)
      }
    }
  }

  return (
    <div className='h-full flex justify-center items-center bg-primary'>
      <div className='p-6 w-[600px]'>
        <h1 className='font-medium text-secondary text-3xl font-secondary'>
          Sign up for an Account
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <label className='flex flex-col my-6'>
            <span className='text-white'>Name</span>
            <Input {...register('name', { required: true })} />
          </label>

          <label className='flex flex-col my-6'>
            <span className='text-white'>Email</span>
            <Input
              type='email'
              {...register('email', {
                validate: (value) => isEmail(value),
              })}
            />
          </label>

          <label className='flex flex-col mb-6'>
            <span className='text-white'>Password</span>
            <Input
              type='password'
              {...register('password', {
                validate: (value) => isPasswordValid(value),
              })}
            />
            {errors && errors.password && (
              <ul className='text-white text-sm'>
                <li>Between 8 and 40 characters</li>
                <li>Minimum one digit</li>
                <li>Minimum one uppercase and lowercase letters</li>
              </ul>
            )}
          </label>

          <label className='flex flex-col mb-6'>
            <span className='text-white'>Repeat Password</span>
            <Input
              type='password'
              {...register('repeatPassword', {
                validate: (value, values) => {
                  return value === values.password
                },
              })}
            />
            {errors && errors.repeatPassword && (
              <div className='text-error'>Passwords do not match</div>
            )}
          </label>

          {isWrongEmail && (
            <div className='text-error my-3'>
              The email has already been used
            </div>
          )}

          <Button type='submit' className='mt-2' variant='secondary'>
            Sign Up
          </Button>

          <div className='text-secondary mt-2'>
            <Link to='/login'>Have an Account?</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
