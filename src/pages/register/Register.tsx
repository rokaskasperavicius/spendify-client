import passwordValidator from 'password-validator'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import isEmail from 'validator/lib/isEmail'

import { Button, Input } from '@/components/ui'

import { useRegisterUserMutation } from '@/features/auth/authApi'
import { useAuthState } from '@/features/auth/authSlice'

import { useTitle } from '@/hooks/useTitle'

import { isFetchBaseQueryError } from '@/services/isFetchBaseQueryError'
import { ERROR_CODES } from '@/services/types'

const passwordSchema = new passwordValidator()
passwordSchema
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(40) // Maximum length 40
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(1) // Must have at least 1 digit

export type RegisterFormValues = {
  name: string
  email: string
  password: string
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
      if (
        isFetchBaseQueryError(err) &&
        err.code === ERROR_CODES.INVALID_CREDENTIALS
      ) {
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
                validate: (value) => !!passwordSchema.validate(value),
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
