import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
interface NavProps {
  links: {
    title: string;
    label?: string;
    triggerEvent?: () => void;
    variant: "default" | "ghost";
  }[];
}

export function Options({ links }: NavProps) {
  return (
    <div className="group text-white flex flex-col gap-4 py-2 data-[collapsed=true]:py-2">
      <ul className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) => (
          <li
            key={index}
            className={cn(
              buttonVariants({ variant: link.variant, size: "sm" }),
              link.variant === "default" &&
                "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
              "justify-start"
            )}
          >
            <button onClick={link.triggerEvent}>{link.title}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
