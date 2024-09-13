import passwordValidator from 'password-validator'

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

export const isPasswordValid = (password: string): boolean =>
  Boolean(passwordSchema.validate(password))
