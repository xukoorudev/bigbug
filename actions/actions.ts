"use server";
import prisma from "@/lib/prisma";
import { formSchema } from "@/lib/validations/formSchemaValidation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export type FormState = {
  status: boolean
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
};


export async function onSubmitAction(
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const parsed = formSchema.safeParse(formData);

  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();

  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const key of Object.keys(formData)) {
      fields[key] = formData[key].toString();
    }
    
    return {
      status: false,
      message: "Invalid form data",
      fields,
      issues: parsed.error.issues.map((issue) => issue.message),
    };
  }

  if (!user) {
    return {
      message: "Unauthorised! Please login to create stote.",
      status: false
    }
  }

  await prisma.store.create({
    data: {
      name: parsed.data.name,
      userId: user?.id 
    }
  })

  return { message: "Store has been created.",  status: true };
}