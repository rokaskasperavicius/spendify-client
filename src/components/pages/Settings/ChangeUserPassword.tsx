import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import passwordValidator from 'password-validator'

// Components
import { Container, Input, Button } from 'components/ui'

// Hooks & Helpers
import { usePatchUserPasswordMutation } from 'features/auth/authApi'
import { isFetchBaseQueryError } from 'services/isFetchBaseQueryError'

// Types
import { ERROR_CODES } from 'services/types'

type FormValues = {
  oldPassword: string
  newPassword: string
  repeatNewPassword: string
}

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

export const ChangeUserPassword = () => {
  const [isWrongPassword, setIsWrongPassword] = useState(false)

  const [patchUserPassword, { isLoading }] = usePatchUserPasswordMutation()

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const onSubmit = async (data: FormValues) => {
    const { oldPassword, newPassword } = data
    try {
      await patchUserPassword({ oldPassword, newPassword }).unwrap()

      setIsWrongPassword(false)
      reset()

      toast.success('Updated Password')
    } catch (err) {
      if (
        isFetchBaseQueryError(err) &&
        err.code === ERROR_CODES.INVALID_CREDENTIALS
      ) {
        setIsWrongPassword(true)
      }
    }
  }

  return (
    <Container className='space-y-4'>
      <div className='font-medium'>Change Password</div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className='space-y-4'>
        <label className='flex flex-col space-y-2'>
          <span className='text-black'>Old Password</span>
          <div>
            <Input
              className='w-full'
              type='password'
              {...register('oldPassword', { required: true })}
            />
          </div>
        </label>

        <div>
          <label className='flex flex-col space-y-2'>
            <span className='text-black'>New Password</span>
            <div>
              <Input
                className='w-full'
                type='password'
                {...register('newPassword', {
                  validate: (value) => !!passwordSchema.validate(value),
                })}
              />
            </div>
          </label>

          {errors && errors.newPassword && (
            <ul className='text-error-red text-sm'>
              <li>Between 8 and 40 characters</li>
              <li>Minimum one digit</li>
              <li>Minimum one uppercase and lowercase letters</li>
            </ul>
          )}
        </div>

        <div>
          <label className='flex flex-col space-y-2'>
            <span className='text-black'>Repeat New Password</span>
            <div>
              <Input
                className='w-full'
                type='password'
                {...register('repeatNewPassword', {
                  validate: (value, formValues) =>
                    value === formValues.newPassword,
                })}
              />
            </div>
          </label>

          {errors && errors.repeatNewPassword && (
            <div className='text-error-red text-sm'>Password must match</div>
          )}
        </div>

        {isWrongPassword && (
          <div className='text-error-red'>Invalid password</div>
        )}

        <Button
          isDisabled={isLoading}
          type='submit'
          className='mt-2'
          variant='primary-two'
        >
          Save Changes
        </Button>
      </form>
    </Container>
  )
}
