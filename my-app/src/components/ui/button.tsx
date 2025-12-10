import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default:
                    "bg-black text-white shadow hover:bg-gray-900 active:scale-95 active:shadow-inner transition-transform",
                destructive:
                    "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 active:scale-95 active:shadow-inner transition-transform",
                outline:
                    "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground active:scale-95 active:shadow-inner transition-transform",
                filter: "border border-input bg-background shadow-sm text-gray-500 hover:bg-gray-100 hover:text-gray-700",
                secondary:
                    "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 active:scale-95 active:shadow-inner transition-transform",
                ghost: "hover:bg-accent hover:text-accent-foreground active:scale-95 active:shadow-inner transition-transform",
                link: "text-primary underline-offset-4 hover:underline active:scale-95 active:shadow-inner transition-transform",
                neumorphism:
                    "bg-gray-200 text-gray-700 shadow-[8px_8px_16px_#d1d9e6,_-8px_-8px_16px_#ffffff] hover:shadow-[inset_1px_1px_2px_#d1d9e6,_inset_-2px_-2x_4px_#ffffff] dark:bg-gray-800 dark:text-gray-300 dark:shadow-[1px_1px_2px_#2e2e2e,_-1px_-1px_2px_#010101] dark:hover:bg-[#020817] active:scale-95 active:shadow-inner transition-transform",
            },
            size: {
                default: "h-9 px-4 py-2",
                sm: "h-8 rounded-md px-3 text-xs",
                lg: "h-10 rounded-md px-8",
                icon: "h-9 w-9",
                responsive: "h-8 px-3 text-xs md:h-9 md:px-4 lg:h-10 lg:px-6",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    link?: string;
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
