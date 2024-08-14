'use client'

import { z } from "zod"
import { useEffect, useRef, useTransition } from "react";
import { useForm } from "react-hook-form"
import { useFormState } from "react-dom";
import { zodResolver } from "@hookform/resolvers/zod"

import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from "@/components/ui/form"
import { DialogModal } from "@/components/dialog-modal"
import { useStoreModal } from "@/hooks/useStoreModal"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"


import { formSchema } from "@/lib/validations/formSchemaValidation";
import { onSubmitAction } from "@/actions/actions";

import { X } from "lucide-react";

export const StoreModal =  () => {
    const storeModal = useStoreModal()
    const [pending, startTransaction] = useTransition();

    const [state, formAction] = useFormState(onSubmitAction, {
        message: "",
        status: true
      });

      useEffect(() => {
        if (!state) {
          return;
        }
      
        if (state.status) {
            toast.success("Store has been created.")
        }else{
            toast.error("Failed to create Store.")
        }
      }, [state]);


     // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        name: "",
        ...(state?.fields ?? {}),
        },
        
    })

    const formRef = useRef<HTMLFormElement>(null);

    return (
        <DialogModal 
            title="Create store"
            description="Add a store to manage products and categories"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            <div>
                <div className="space-y-4 py-2 pb-4">
                    <Form {...form}>
                        {state?.message !== "" && !state.issues && (
                            <div className="text-red-500">{state.message }</div>                      
                        )}

                        {state?.issues && (
                            <div className="text-red-500">
                            <ul>
                                {state.issues.map((issue) => (
                                <li key={issue} className="flex gap-1">
                                    <X fill="red" />
                                    {issue}
                                </li>
                                ))}
                            </ul>
                            </div>
                        )}
                            <form
                                ref={formRef}
                                className="space-y-8"
                                action={formAction}
                                onSubmit={(evt) => {
                                evt.preventDefault();
                                form.handleSubmit(() => {
                                    formAction(new FormData(formRef.current!));
                                })(evt);
                                }}
                            >
                            <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder='Store name . . .' {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <div className="pt-6 space-x-2 flex items-center justify-end">
                                <Button variant="secondary" onClick={storeModal.onClose}>Cancel</Button>
                                <Button type="submit"disabled={pending}>Continue</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </DialogModal>

    )
}