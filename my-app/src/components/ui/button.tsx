import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        neumorphism:
          "bg-gray-200 text-gray-700 shadow-[8px_8px_16px_#d1d9e6,_-8px_-8px_16px_#ffffff] hover:shadow-[inset_1px_1px_2px_#d1d9e6,_inset_-2px_-2x_4px_#ffffff] dark:bg-gray-800 dark:text-gray-300 dark:shadow-[1px_1px_2px_#2e2e2e,_-1px_-1px_2px_#010101] dark:hover:bg-[#020817]"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
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
  asChild?: boolean
  link?: string
}

export interface ButtonProps
    extends VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    link?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
    ({ className, variant, size, link, ...props }, ref) => {

        if (link) {
            return (
                <a
                    className={cn(buttonVariants({ variant, size, className }))}
                    ref={ref as React.Ref<HTMLAnchorElement>}
                    href={link}
                    {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
                >{props.children || "Link"}</a>
            );
        } else {
            return (
                <button
                    className={cn(buttonVariants({ variant, size, className }))}
                    ref={ref as React.Ref<HTMLButtonElement>}
                    {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
                />
            );
        }
    }
);


Button.displayName = "Button";

export { Button, buttonVariants };
