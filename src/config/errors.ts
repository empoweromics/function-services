export const ErrorMessage = {
  NO_USER_FOUND: "You did not Register!",
  MISSING_PARAM: "Missing ID Param!",
  UNAUTHRIAZED: "You Lack Permission To do so.",
  REQUIRES_BEARER_TOKEN: "Requires Bearer Authorization Token!",
  INVALID_EMAIL: "Wrong Email Supplied!",
  INVALID_NID: "Invalid National ID!",
  MALFORMED_TOKEN: "Wrong accessToken or malformed.",
  NO_CONTENT: "No content found!",
  INVALID_PARAMS: "Wrong Params Supplied!",
  SUCCESS_ACTION: "Action is successfull",
  INVALID_OTP_HEADER_TOKEN: "Invalid OTP header token (otpToken)",
  NO_RESOURCE_FOUND: "Invalid resource ",
  NO_GPX_POINTS: "Invalid GPX polygons ",
  INVALID_PHONE: "Invalid phone number",
  INVALID_CREDENTIALS: "wrong phone number or password incorrect",
  OTP_NOT_VERIFIED: "OTP Not verfied , please verfy your number before login",
  SOMETHING_WRONG_FILE: "Something Wrong Happened Parsing file!",
  PHONE_REGISTERD:
    "We can not create new account , your phone number is already registerd in our system",
  INVALID_OPERATION: "Lack enough items to do this operation."
};

export const ErrorCode = {
  NO_USER_FOUND: "user.invalid",
  INVALID_EMAIL: "email.invalid",
  INVALID_OTP_HEADER_TOKEN: "otptoken.invalid",
  INVALID_PHONE: "phone.invalid",
  INVALID_CREDENTIALS: "credentials.invalid",
  OTP_NOT_VERIFIED: "otp.verfied",
  PHONE_REGISTERD: "phone.registered"
};
