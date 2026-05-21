import z from "zod";

export const loginSchema = z.object({
    email: z.email("Field harus diisi dengan format email"),
    password: z.string("Field password harus diisi").min(8, "Password harus diisi minimal 8 karakter")
})

export type loginSchemaType = z.infer<typeof loginSchema>
