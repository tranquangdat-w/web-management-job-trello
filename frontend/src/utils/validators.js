export const FIELDS_REQUIRED_MESSAGE = 'This field is required'
export const EMAIL_RULE = /^\S+@\S+.\S+$/
export const EMAIL_RULE_MESSAGE = 'Email is invalid'
// export const PASSWORD_RULE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const PASSWORD_RULE = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]+$/;
export const PASSWORD_RULE_MESSAGE = 'Password must include both letters and numbers';


