import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import isEmail from 'validator/lib/isEmail'

// Components
import { Container, Input, Button } from 'components/ui'

// Hooks & Helpers
import { usePatchUserInfoMutation } from 'features/auth/authApi'
import { useAuthState } from 'features/auth/authSlice'
import { isFetchBaseQueryError } from 'services/isFetchBaseQueryError'

// Types
import { ERROR_CODES } from 'services/types'

type FormValues = {
  name: string
  email: string
}

export const ChangeAccountInformation = () => {
  const [isWrongEmail, setIsWrongEmail] = useState(false)

  const [patchUserInfo, { isLoading }] = usePatchUserInfoMutation()
  const { name, email } = useAuthState()

  const {
    register,
    reset,
    handleSubmit,
    formState: { isDirty },
  } = useForm<FormValues>({
    defaultValues: {
      name: name || '',
      email: email || '',
    },
  })

  const onSubmit = async (data: FormValues) => {
    try {
      await patchUserInfo(data).unwrap()
      setIsWrongEmail(false)
      reset(data)

      toast.success('Updated Information')
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
    <Container className='space-y-4'>
      <div className='font-medium'>Change Account Information</div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className='space-y-4'>
        <label className='flex flex-col space-y-2'>
          <span className='text-black'>Name</span>
          <div>
            <Input
              className='w-full'
              {...register('name', { required: true })}
            />
          </div>
        </label>

        <label className='flex flex-col space-y-2'>
          <span className='text-black'>Email</span>
          <div>
            <Input
              className='w-full'
              type='email'
              {...register('email', {
                validate: (value) => isEmail(value),
              })}
            />
          </div>
        </label>

        {isWrongEmail && (
          <div className='text-error-red'>
            This email has already been taken
          </div>
        )}

        <Button
          isDisabled={!isDirty || isLoading}
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
