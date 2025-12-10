import * as React from "react"
// 1. Assurez-vous d'importer cva et VariantProps
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// 2. Définition des Variants (inputVariants)
// J'ai renommé cv en cva.
const inputVariants = cva(
    // Classes de base communes à tous les inputs
    "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
    {
        variants: {
            variant: {
                default:
                    "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light",
                destructive: "bg-destructive border-destructive/50 text-destructive-foreground placeholder:text-destructive-foreground/70", // Ajout de classes shadcn standard
                neumorphism:
                    "bg-gray-200 shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff] dark:bg-gray-800 dark:shadow-[1px_1px_2px_#2e2e2e,-1px_-1px_2px_#010101] dark:text-gray-300",
            },
            variantSize: {
                default: "h-10 px-4 py-2", // J'ai ajusté la hauteur standard à 10 pour un meilleur alignement
                sm: "h-8 rounded-md px-3 text-xs",
                lg: "h-12 rounded-md px-4 text-base", // Ajout d'une taille "lg" plus standard
            },
        },
        defaultVariants: {
            variant: "default",
            variantSize: "default",
        },
    }
);

// 3. Définition des Props
// On étend les props HTML standard avec les props générées par inputVariants
export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement>,
        VariantProps<typeof inputVariants> {} // Pas besoin de asChild pour un input

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  // 4. Décomposition des Props
  // Il faut déconstruire 'variant' et 'variantSize' en plus de 'className' et 'type'
  ({ className, type, variant, variantSize, ...props }, ref) => {
    return (
      <input
        type={type}
        // 5. Utilisation de inputVariants
        // On combine les classes CVA générées avec les classes personnalisées
        className={cn(
          inputVariants({ variant, variantSize, className })
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input, inputVariants }