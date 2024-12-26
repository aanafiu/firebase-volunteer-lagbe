import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300",
  {
    variants: {
      variant: {
        headerD:"text-bold text-[17px] font-bold hover:text-green-500 dark:bg-transparent hover:scale-[1.06]",
        default: "bg-blue-950 text-neutral-50 hover:bg-neutral-900/90 dark:bg-blue-950 dark:text-neutral-900 dark:hover:bg-neutral-50/90",
        destructive:
          "bg-green-600 text-white hover:bg-blue-950 font-bold dark:bg-blue-950 dark:hover:bg-green-600",
        outline:
          "border border-blue-950 bg-white hover:bg-neutral-100 hover:text-green-500 dark:border-white dark:bg-gray-950 dark:hover:bg-blue-950 dark:hover:text-white",
        secondary:
          "bg-green-500 text-white hover:bg-blue-950 dark:bg-green-500 dark:text-white-50 dark:hover:bg-blue-950/80",
        ghost: "hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
        link: "px-6 py-2 bg-green-500 font-bold text-white rounded-lg transition-transform transform hover:bg-gray-900 hover:text-green-500 hover:font-bold hover:scale-x-105 dark:bg-green-500 dark:hover:bg-gray-900 dark:hover:text-green-500",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    (<Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />)
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
