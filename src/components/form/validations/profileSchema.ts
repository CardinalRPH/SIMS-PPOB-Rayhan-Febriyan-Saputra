import z from "zod";

export const updateProfileSchema = z.object({
  first_name: z
    .string("Field ini harus di isi dengan nama depan")
    .min(2, "Panjang karakter minimal adalah 2 karakter")
    .max(16, "Panjang karakter maxmimal adalah 16 karakter"),
  last_name: z
    .string("Field ini harus di isi dengan nama belakang")
    .min(2, "Panjang karakter minimal adalah 2 karakter")
    .max(16, "Panjang karakter maxmimal adalah 16 karakter"),
});

export type updateProfileSchemaType = z.infer<typeof updateProfileSchema>
