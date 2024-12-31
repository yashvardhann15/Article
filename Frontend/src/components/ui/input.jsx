import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const inputVariants = cva(
    "flex w-full rounded-md border bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    {
        variants: {
            size: {
                default: "h-10",
                sm: "h-9",
                lg: "h-11",
            },
        },
        defaultVariants: {
            size: "default",
        },
    },
);

const Input = React.forwardRef(function Input(
    { className, size, ...props },
    ref,
) {
    return (
        <input
            ref={ref}
            className={cn(inputVariants({ size }), className)}
            {...props}
        />
    );
});
Input.displayName = "Input";

export { Input };
