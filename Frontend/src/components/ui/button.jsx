import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "../../lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
    {
        variants: {
            variant: {
                default: "bg-primary text-white hover:bg-primary/90",
                destructive:
                    "bg-destructive text-white hover:bg-destructive/90",
                outline:
                    "border border-input hover:bg-accent hover:text-accent-foreground",
                subtle: "bg-muted text-muted-foreground hover:bg-muted/80",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "underline-offset-4 hover:underline text-primary",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 px-3",
                lg: "h-11 px-8",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

const Button = React.forwardRef(
    ({ className, variant, size, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(buttonVariants({ variant, size }), className)}
                {...props}
            />
        );
    },
);
Button.displayName = "Button";

export { Button };
