'use client';

import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import {Link} from "@/i18n/routing";


const logoVariants = cva(
    "flex items-center justify-center",
    {
        variants: {
            variant: {
                default: "",
                plainBackground: ""
            },
            variantSize: {
                default: "h-9 w-auto px-4 py-2",
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

export interface LogoProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof logoVariants> {
    asChild?: boolean;
    logoSrc: string;
    altText?: string;
}

const Logo = React.forwardRef<HTMLDivElement, LogoProps>(
    ({ className, variant, variantSize, asChild = false, logoSrc, altText = "Logo", ...props }, ref) => {
        const Comp = asChild ? Slot : "div";
        const handleLogoClick = (event: React.MouseEvent) => {
            event.preventDefault();
            window.location.replace("/");
        };
        return (
            <Link href="/">
                <Comp
                    className={cn(logoVariants({ variant, variantSize, className }))}
                    ref={ref}
                    {...props}
                    onClick={handleLogoClick}
                    style={{ cursor: 'pointer' }}
                >
                    <img
                        src={logoSrc}
                        alt={altText}
                        className="h-full w-auto max-w-full"
                    />
                </Comp>
            </Link>
        );
    }
);
Logo.displayName = "Logo";

export { Logo, logoVariants };