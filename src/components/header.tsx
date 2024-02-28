import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Options } from "@/components/options";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Upload, Settings, Menu } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface HeaderProps {
  onMakeCall: () => void;
}

export function Header({onMakeCall}: HeaderProps) {
  return (
    <div className="flex items-center justify-between w-screen px-4">
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
          <SheetContent side="left" className="bg-black  px-0">
            <SheetHeader>
              <SheetTitle>Select a call option</SheetTitle>
            </SheetHeader>
            <ScrollArea className="h-screen pb-4">
              <SheetDescription className="ml-3 mt-4 mb-2">
                Avaya Request
              </SheetDescription>
              <Options
                links={[
                  {
                    title: "Make Call",
                    variant: "default",
                    triggerEvent: onMakeCall,
                  },
                  {
                    title: "Transfer Init",
                    variant: "ghost",
                  },
                  {
                    title: "Transfer Complete",
                    variant: "ghost",
                  },
                  {
                    title: "Transfer Cancel",
                    variant: "ghost",
                  },
                  {
                    title: "Available",
                    variant: "ghost",
                  },
                  {
                    title: "Keep Alive Ack",
                    variant: "ghost",
                  },
                  {
                    title: "Get Status",
                    variant: "ghost",
                  },
                  {
                    title: "Alternate",
                    variant: "ghost",
                  },
                ]}
              />
              <Separator className="w-[90%] mx-auto" />
              <SheetDescription className="ml-3 mt-4 mb-2">
                Phone Events
              </SheetDescription>
              <Options
                links={[
                  {
                    title: "Incoming Call",
                    variant: "ghost",
                  },
                  {
                    title: "Disconnect Call",
                    variant: "ghost",
                  },
                  {
                    title: "Available",
                    variant: "ghost",
                  },
                  {
                    title: "Pause",
                    variant: "ghost",
                  },
                ]}
              />
              <Separator className="w-[90%] mx-auto" />
              <SheetDescription className="ml-3 mt-4 mb-2">
                Avaya Response
              </SheetDescription>
              <Options
                links={[
                  {
                    title: "Make Call ACK",
                    variant: "ghost",
                  },
                  {
                    title: "Make Call FAil",
                    variant: "ghost",
                  },
                  {
                    title: "Transfer Init ACK",
                    variant: "ghost",
                  },
                  {
                    title: "Transfer Init Fail",
                    variant: "ghost",
                  },
                  {
                    title: "Transfer Complete ACK",
                    variant: "ghost",
                  },
                  {
                    title: "Transfer Complete Fail",
                    variant: "ghost",
                  },
                  {
                    title: "Transfer Cancel ACK",
                    variant: "ghost",
                  },
                  {
                    title: "Transfer Cancel Fail",
                    variant: "ghost",
                  },
                  {
                    title: "Available ACK",
                    variant: "ghost",
                  },
                  {
                    title: "Available Fail",
                    variant: "ghost",
                  },
                  {
                    title: "Get Status Em Chamada",
                    variant: "ghost",
                  },
                  {
                    title: "Get Status Pausa",
                    variant: "ghost",
                  },
                  {
                    title: "Get Status Disponivel",
                    variant: "ghost",
                  },
                  {
                    title: "Get Status Não Logado",
                    variant: "ghost",
                  },
                  {
                    title: "Alternate Sucesso",
                    variant: "ghost",
                  },
                  {
                    title: "Alternate Fail",
                    variant: "ghost",
                  },
                ]}
              />
              <Separator className="w-[90%] mx-auto" />
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex-grow">
        <Select defaultValue="auto-dialer">
          <Tooltip>
            <TooltipTrigger asChild>
              <SelectTrigger className="mx-auto font-medium text-base w-auto flex gap-2 h-4 p-0 border-none transition hover:text-gray-500">
                <SelectValue placeholder="Call Mode" />
              </SelectTrigger>
              </TooltipTrigger>
            <TooltipContent>Call Mode</TooltipContent>
          </Tooltip>
          <SelectContent>
            <SelectItem value="auto-dialer">Auto Dialer</SelectItem>
            <SelectItem value="search or get-next">Manual Call</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex-grow-0 flex gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button className="w-7" variant="ghost" size="icon">
              <Upload className="h-4 w-4" />
              <span className="sr-only">Upload Call List</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Upload Call List</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button className="w-7" variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
              <span className="sr-only">Settings</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Settings</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
