import { z } from "zod";

const userNameValidationSchema = z.object({
    firstName: z.string({ required_error: 'First name is required' }),
    lastName: z.string({ required_error: 'Last name is required' }),
  });
  
  const userAddressValidationSchema = z.object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
  });
  
  const userOrderValidationSchema = z.object({
    productName: z.string(),
    price: z.number(),
    quantity: z.number(),
  });
  
  const userValidationSchema = z.object({
    userId: z.number({ required_error: 'User ID is required' }),
    username: z.string({ required_error: 'Username is required' }),
    password: z.string(),
    fullName: userNameValidationSchema,
    age: z.number(),
    email: z.string({ required_error: 'Email is required' }).email(),
    isActive: z.boolean(),
    hobbies: z.array(z.string()),
    address: userAddressValidationSchema,
    orders: z.array(userOrderValidationSchema),
  });

  export default userValidationSchema;