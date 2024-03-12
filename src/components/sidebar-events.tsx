import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
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
import CustomPocForm from "./custom-poc-form";
import { Separator } from "./ui/separator";
import { useState } from "react";

interface SidebarEventsProps {
  customPocData: TriggerEventParams;
  sendMessage?: (params: TriggerEventParams) => void;
  callType: string;
  status: string;
  setCustomPocData: (data: any) => void;
}

export function SidebarEvents({
  customPocData,
  setCustomPocData,
  sendMessage,
  callType,
  status,
}: SidebarEventsProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex-grow">
      <Sheet open={open} onOpenChange={setOpen}>
        <Tooltip>
          <TooltipTrigger asChild>
            <SheetTrigger>
              <Menu size={16} />
            </SheetTrigger>
          </TooltipTrigger>
          <TooltipContent>Avaya Events</TooltipContent>
        </Tooltip>
        <SheetContent side="left" className="bg-black px-0 h-full">
          <SheetHeader className="flex text-start ml-2 mb-4">
            <SheetTitle>Select a call option</SheetTitle>
            <SheetDescription>
              <div>
                <span className="font-medium">poc_id:*</span>{" "}
                {customPocData.poc_id}
              </div>

              <div>
                <span className="font-medium">phone:*</span>{" "}
                {customPocData.phone}
              </div>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="block w-44 overflow-hidden whitespace-nowrap text-ellipsis">
                    <span className="font-medium">vendor_id:</span>{" "}
                    {customPocData.vendor_id}
                  </div>
                </TooltipTrigger>
                <TooltipContent>{customPocData.vendor_id}</TooltipContent>
              </Tooltip>
            </SheetDescription>
          </SheetHeader>
          <div className="grid-rows-2">
            <Separator />
            <div>
              {callType === "auto-dialer" ? (
                <AutoDialerEvents
                  setOpen={setOpen}
                  status={status}
                  customPocData={customPocData}
                  sendMessage={sendMessage}
                />
              ) : (
                <ManualCallEvents
                  setOpen={setOpen}
                  status={status}
                  customPocData={customPocData}
                  sendMessage={sendMessage}
                />
              )}
            </div>
            <Separator />
            <SheetFooter className="mt-4 mx-2">
              <CustomPocForm
                customPocData={customPocData}
                setCustomPocData={setCustomPocData}
              />
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
