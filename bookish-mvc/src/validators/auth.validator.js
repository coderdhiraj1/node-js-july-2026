import { z } from 'zod';

export const registerSchema = z.object({
    name: z
        .string()
        .min(2, { message: "Name must be at least 2 characters long" })
        .trim(),
    emailId: z
        .string()
        .email({ message: "Invalid email address" })
        .toLowerCase()
        .trim(),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z
        .string(),
    role: z
        .enum(['admin',"member"], { message: "Role must be either 'admin' or 'member'" })
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});


export const loginSchema = z.object({
    emailId: z
        .string()
        .email({ message: "Invalid email address" })
        .toLowerCase()
        .trim(),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters long" }),

});