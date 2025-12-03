import { z } from "zod";

export const apiFormSchema = z.object({
  defaultCount: z.number().min(1).max(100),
  apiMethod: z.enum(["GET", "POST", "PATCH", "DELETE", "PUT"]),
  endPointName: z
    .string()
    .nonempty()
    .max(50)
    .regex(/^[A-Za-z0-9]+$/, "Only letters and numbers are allowed"),

  jsonTemplate: z
    .record(z.string(), z.string().min(1))
    .refine(
      (data) => Object.keys(data).length > 0,
      "At least one field must be added"
    ),
});

export const aiGenerationSchema = z.object({
  userMessage: z.string().nonempty().max(200),
});

export type AiGenerationDataType = z.infer<typeof aiGenerationSchema>;
export type ApiFormDataType = z.infer<typeof apiFormSchema>;
