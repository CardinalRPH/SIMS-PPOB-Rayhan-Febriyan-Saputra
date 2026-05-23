import z from "zod";

export const registerSchema = z.object({
    email: z.email("Field harus diisi dengan format email"),
    first_name: z.string("Field ini harus di isi dengan nama depan").min(2, "Panjang karakter minimal adalah 2 karakter").max(100, "Panjang karakter maxmimal adalah 100 karakter"),
    last_name: z.string("Field ini harus di isi dengan nama belakang").min(2, "Panjang karakter minimal adalah 2 karakter").max(100, "Panjang karakter maxmimal adalah 100 karakter"),
    password: z.string("Field password harus diisi").min(8, "Password harus diisi minimal 8 karakter"),
    confirmPass: z.string("Field konfirmasi password harus diisi")
}).refine((data) => data.password === data.confirmPass, {
    message: "password tidak sama",
    path: ["confirmPass"],
});

export type registerSchemaType = z.infer<typeof registerSchema>