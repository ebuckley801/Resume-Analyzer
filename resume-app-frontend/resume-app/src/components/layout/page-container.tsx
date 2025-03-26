import { cn } from "@/lib/utils";

interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function PageContainer({ children, className, ...props }: PageContainerProps) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      <div className="flex-1">
        <div className={cn("container flex flex-col items-center py-8", className)} {...props}>
          {children}
        </div>
      </div>
    </div>
  );
} 