/**
 * Button Component
 * <s
 * A versatile button component that supports multiple variants, sizes and can render as either a button or anchor element.
 *
 * @component
 *
 * @param {Object} props - Component props
 * @param {string} [props.variant] - Visual style variant of the button
 *   - 'default': Primary colored button with hover and active states
 *   - 'destructive': Red/danger button for destructive actions
 *   - 'outline': Outlined button with hover background
 *   - 'secondary': Secondary colored button
 *   - 'ghost': Transparent button with hover background
 *   - 'link': Text-only button with underline on hover
 *   - 'neumorphism': Soft UI style with shadow effects
 * @param {string} [props.size] - Size variant of the button
 *   - 'default': Standard size (h-9)
 *   - 'sm': Small size
 *   - 'lg': Large size
 *   - 'icon': Square button for icons
 *   - 'responsive': Responsive size that changes with viewport
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.asChild] - Whether to render as child component
 * @param {string} [props.link] - URL for anchor tag rendering
 * @param {Function} [props.onClick] - Click handler function
 *
 * @example
 * // Default button
 * <Button>Click me</Button>
 *
 * // Link button with custom variant and size
 * <Button variant="outline" size="lg" link="/dashboard">Go to Dashboard</Button>
 *
 * // Destructive button with click handler
 * <Button variant="destructive" onClick={() => handleDelete()}>Delete</Button>
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90 active:scale-95 active:shadow-inner transition-transform",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 active:scale-95 active:shadow-inner transition-transform",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground active:scale-95 active:shadow-inner transition-transform",
        filter : "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
          secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 active:scale-95 active:shadow-inner transition-transform",
        ghost: "hover:bg-accent hover:text-accent-foreground active:scale-95 active:shadow-inner transition-transform",
        link: "text-primary underline-offset-4 hover:underline active:scale-95 active:shadow-inner transition-transform",
        neumorphism:
          "bg-gray-200 text-gray-700 shadow-[8px_8px_16px_#d1d9e6,_-8px_-8px_16px_#ffffff] hover:shadow-[inset_1px_1px_2px_#d1d9e6,_inset_-2px_-2x_4px_#ffffff] dark:bg-gray-800 dark:text-gray-300 dark:shadow-[1px_1px_2px_#2e2e2e,_-1px_-1px_2px_#010101] dark:hover:bg-[#020817] active:scale-95 active:shadow-inner transition-transform"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
        responsive: "h-8 px-3 text-xs md:h-9 md:px-4 lg:h-10 lg:px-6"
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
