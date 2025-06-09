import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "bg-accent animate-pulse duration-200 rounded-md",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
