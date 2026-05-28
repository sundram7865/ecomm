import * as yup from 'yup'

export const loginSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
})

export const registerSchema = yup.object({
  name: yup.string().min(2, 'Name must be at least 2 characters').required('Name is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Please confirm your password'),
})

export const checkoutSchema = yup.object({
  fullName:  yup.string().required('Full name is required'),
  phone:     yup.string().matches(/^[6-9]\d{9}$/, 'Enter a valid 10-digit phone number').required('Phone is required'),
  address:   yup.string().min(10, 'Enter a complete address').required('Address is required'),
  city:      yup.string().required('City is required'),
  state:     yup.string().required('State is required'),
  pincode:   yup.string().matches(/^\d{6}$/, 'Pincode must be 6 digits').required('Pincode is required'),
})