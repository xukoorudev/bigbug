"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

interface DialogModalProps {
    title: string;
    description: string;
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode
}

export const DialogModal = ({
    title,
    description,
    isOpen,
    onClose,
    children
}:DialogModalProps) => {
    const onChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    }
    return (
        <Dialog open={isOpen} onOpenChange={onChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <>
                    {children}
                </>
            </DialogContent>
        </Dialog>
    )
}
