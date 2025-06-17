import z from 'zod';
export declare const signupInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    name: z.ZodString;
    contact: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    name: string;
    contact: number;
}, {
    email: string;
    password: string;
    name: string;
    contact: number;
}>;
export type SignupInput = z.infer<typeof signupInput>;
export declare const signinInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type SigninInput = z.infer<typeof signinInput>;
export declare const createPostInput: z.ZodObject<{
    type: z.ZodString;
    rooms: z.ZodString;
    bathrooms: z.ZodString;
    description: z.ZodString;
    gender: z.ZodString;
    price: z.ZodNumber;
    location: z.ZodString;
    category: z.ZodString;
    photos: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    type: string;
    rooms: string;
    bathrooms: string;
    description: string;
    gender: string;
    price: number;
    location: string;
    category: string;
    photos: string[];
}, {
    type: string;
    rooms: string;
    bathrooms: string;
    description: string;
    gender: string;
    price: number;
    location: string;
    category: string;
    photos: string[];
}>;
export type CreatePostInput = z.infer<typeof createPostInput>;
export declare const updatePostInput: z.ZodObject<{
    type: z.ZodString;
    rooms: z.ZodString;
    bathrooms: z.ZodString;
    description: z.ZodString;
    gender: z.ZodString;
    price: z.ZodNumber;
    location: z.ZodString;
    category: z.ZodString;
    photos: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    type: string;
    rooms: string;
    bathrooms: string;
    description: string;
    gender: string;
    price: number;
    location: string;
    category: string;
    photos: string[];
}, {
    type: string;
    rooms: string;
    bathrooms: string;
    description: string;
    gender: string;
    price: number;
    location: string;
    category: string;
    photos: string[];
}>;
export type UpdatePostInput = z.infer<typeof updatePostInput>;
