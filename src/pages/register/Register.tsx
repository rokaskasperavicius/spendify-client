import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import isEmail from 'validator/lib/isEmail'
import passwordValidator from 'password-validator'

// Components
import { Input, Button } from 'components/ui'

// Hooks & Helpers
import { useRegisterUserMutation } from 'features/auth/authApi'
import { isFetchBaseQueryError } from 'services/isFetchBaseQueryError'

// Types
import { RegisterFormValues } from 'pages/register/types'
import { ERROR_CODES } from 'services/types'

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

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>()

  const [registerUser] = useRegisterUserMutation()
  const navigate = useNavigate()
  const [isWrongEmail, setIsWrongEmail] = useState(false)

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    try {
      await registerUser(data).unwrap()
      navigate('/login')
    } catch (err) {
      if (
        isFetchBaseQueryError(err) &&
        err.code === ERROR_CODES.INVALID_EMAIL
      ) {
        setIsWrongEmail(true)
      }
    }
  }

  return (
    <div className='h-full flex justify-center items-center bg-primary'>
      <div className='p-6 w-[600px]'>
        <h2 className='font-medium text-secondary text-3xl'>
          Sign up for an Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <label className='flex flex-col my-6'>
            <span className='text-white'>First Name</span>
            <Input {...register('firstName', { required: true })} />
          </label>

          <label className='flex flex-col my-6'>
            <span className='text-white'>Last Name</span>
            <Input {...register('lastName', { required: true })} />
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

          <Button type='submit' className='mt-2'>
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