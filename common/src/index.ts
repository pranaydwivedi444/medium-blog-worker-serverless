import z from "zod";
//name optional
const nameSchema = z.string().optional();

// Check password with at least one special character or capital letter and 8 characters
const passwordSchema = z
  .string()
  .regex(
    /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/,
    "Password must be at least 8 characters long and contain at least one uppercase letter or special character"
  );
// Check email format
const emailSchema = z.string().email("Invalid email address");

const titleSchema = z
  .string()
  .min(5, { message: "Title must be at least 5 characters long" })
  .max(100, { message: "Title cannot exceed 100 characters" });

const contentSchema = z
  .string()
  .min(20, { message: "Content must be at least 20 characters long" })
  .max(5000, { message: "Content cannot exceed 5000 characters" });

export const signupInput = z.object({
  name: nameSchema,
  password: passwordSchema,
  email: emailSchema,
});

export const signinInput = z.object({
  password: passwordSchema,
  email: emailSchema,
});

export const createBlogInput = z.object({
  title: titleSchema,
  content: contentSchema,
});

export const updateBlogInput = z.object({
  id: z.string().uuid(),
  title: titleSchema,
  content: contentSchema,
});

export type SignupInput = z.infer<typeof signupInput>;
export type SigninInput = z.infer<typeof signinInput>;
export type CreateBlogInput = z.infer<typeof createBlogInput>;
export type UpdateBlogInput = z.infer<typeof updateBlogInput>;
