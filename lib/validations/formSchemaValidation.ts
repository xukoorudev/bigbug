import { z } from "zod";

export const formSchema = z.object({
  name: z.string().trim().min(1, {
    message: "Store name is required.",
  }),
  // last: z.string().trim().min(1, {
  //   message: "Last name is required.",
  // }),
  // email: z.string().trim().email({
  //   message: "Invalid email address.",
  // }),
});