import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "../../lib/utils";

const textareaVariants = cva(
    "flex w-full rounded-md border bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    {
        variants: {
            size: {
                default: "h-20",
                sm: "h-16",
                lg: "h-24",
            },
        },
        defaultVariants: {
            size: "default",
        },
    },
);

const Textarea = React.forwardRef(function Textarea(
    { className, size, ...props },
    ref,
) {
    return (
        <textarea
            ref={ref}
            className={cn(textareaVariants({ size }), className)}
            {...props}
        />
    );
});
Textarea.displayName = "Textarea";

export { Textarea };
