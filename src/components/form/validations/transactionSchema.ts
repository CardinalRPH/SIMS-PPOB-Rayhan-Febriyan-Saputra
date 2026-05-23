import z from "zod";

export const topUpchema = z.object({
  top_up_amount: z
    .number("Field ini harus di isi dengan nomor")
    .positive("Field harus bernilai positive").min(10000, "Minimum Top up adalah 10.000").max(1000000, "Maksimal Top up adalah 1.000.000"),
});

export type topUpSchemaType = z.infer<typeof topUpchema>;

export const transactionSchema = z.object({
  service_code: z.string("Field ini wajib di isi"),
});

export type transactionSchemaType = z.infer<typeof transactionSchema>;
