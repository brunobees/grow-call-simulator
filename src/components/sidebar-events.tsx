import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Menu } from "lucide-react";
import { TriggerEventParams } from "@/type/websocket";
import ManualCallEvents from "@/components/manual-call-events";
import AutoDialerEvents from "@/components/auto-dialer-events";

interface SidebarEventsProps {
  sendMessage?: (params: TriggerEventParams) => void;
  selected: string;
}

export function SidebarEvents({ sendMessage, selected }: SidebarEventsProps) {
  return (
    <div className="flex-grow">
      <Sheet>
        <Tooltip>
          <TooltipTrigger asChild>
            <SheetTrigger>
              <Menu size={16} />
            </SheetTrigger>
          </TooltipTrigger>
          <TooltipContent>Avaya Events</TooltipContent>
        </Tooltip>
        <SheetContent side="left" className="bg-black px-0">
          <SheetHeader>
            <SheetTitle>Select a call option</SheetTitle>
          </SheetHeader>
          {selected === "auto-dialer" ? (
            <AutoDialerEvents />
          ) : (
            <ManualCallEvents />
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
