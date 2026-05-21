import z from "zod";

const envSchema = z.object({
    VITE_API_URL: z.url("Format URL tidak valid")
})

const metaEnv = envSchema.parse(import.meta.env)

export default metaEnv