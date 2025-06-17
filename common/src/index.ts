import z from 'zod';

export const signupInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name : z.string(),
  contact: z.number().min(10)
});

export type SignupInput = z.infer<typeof signupInput>;

export const signinInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type SigninInput = z.infer<typeof signinInput>;

export const createPostInput = z.object({
  
  
  type : z.string(),
  rooms : z.string(),
  bathrooms : z.string(),
  description :z.string(),
  gender : z.string(),
  price    : z.number().min(1),
  location : z.string(),
  category : z.string(),
  photos: z.array(z.string().url()), 
  });

export type CreatePostInput = z.infer<typeof createPostInput>;

export const updatePostInput = z.object({
  
  type : z.string(),
  rooms : z.string(),
  bathrooms : z.string(),
  description :z.string(),
  gender : z.string(),
  price    : z.number().min(1),
  location : z.string(),
  category : z.string(),
  photos: z.array(z.string().url()), 
  });

export type UpdatePostInput = z.infer<typeof updatePostInput>;