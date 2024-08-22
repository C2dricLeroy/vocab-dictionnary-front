import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";

const inputVariants = cva(
    "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "bg-primary",
                destructive: "bg-destructive"
            },
            variantSize: {
                default: "h-9 px-4 py-2",
                sm: "h-8 rounded-md px-3 text-xs",
                lg: "h-10 rounded-md px-8",
                icon: "h-9 w-9",
            },
        },
        defaultVariants: {
            variant: "default",
            variantSize: "default",
        },
    }
);

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement>,
        VariantProps<typeof inputVariants> {
    asChild?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, variant, variantSize, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "input";
        return (
            <Comp
                className={cn(inputVariants({ variant, variantSize, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Input.displayName = "Input";

export { Input, inputVariants };