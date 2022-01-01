import { check } from "express-validator";

export const registerValidator = () => {
  return [
    check('name').exists().withMessage('name is required'),
    check('email')
      .exists()
      .withMessage('email is required')
      .isEmail()
      .withMessage('wrong format'),
    check('password')
      .exists()
      .withMessage('password is required')
      .isLength({ min: 6 })
      .withMessage('password min length is 6 chars'),
  ];
};

export const loginValidator = () => {
  return [
    check('email')
      .exists()
      .withMessage('email is required')
      .isEmail()
      .withMessage('wrong format'),
    check("password").exists().withMessage("password is required"),
  ];
};

export const refreshTokenValidator = () => {
  return [
    check("refreshToken").exists().withMessage("refreshToken is required"),
  ]
}

export const validateActionValidator = () => {
  return [
    check("actionName").exists().withMessage("actionName is required"),
  ]
}

export const userActionValidator = () => {
  return [
    check("actionName").exists().withMessage("actionName is required"),
    check("userId").exists().withMessage("user id is required"),
  ]
}