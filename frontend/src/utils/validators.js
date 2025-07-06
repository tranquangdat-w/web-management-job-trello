/* eslint-disable no-useless-escape */
export const FIELDS_REQUIRED_MESSAGE = 'This field is required'
export const EMAIL_RULE = /^\S+@\S+.\S+$/
export const EMAIL_RULE_MESSAGE = 'Email is invalid'
export const PASSWORD_RULE = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/
export const PASSWORD_RULE_MESSAGE = 'Password must have at least 8 characters including letters and numbers, special symbols'
export const REPASSWORD_RULE_MESSAGE = 'Password is not match'

export const LIMIT_COMMON_FILE_SIZE = 10485760 // 10 mb
export const ALLOW_COMMON_FILE_TYPES = ['image/jpg', 'image/jpeg', 'image/png']
export const singleFileValidator = (file) => {
  if (!file || !file.name || !file.size || !file.type) return 'File must not be blank'

  if (file.size > LIMIT_COMMON_FILE_SIZE) return 'File can not be large than 10mb'

  if (!ALLOW_COMMON_FILE_TYPES.includes(file.type)) return 'File format is not valid'

  return null
}
