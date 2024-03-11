import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Upload, Settings } from "lucide-react";
import { useState } from "react";
import { TriggerEventParams } from "@/type/websocket";
import { SidebarEvents } from "./sidebar-events";
import { CallType } from "./call-type";
import { SidebarSettings } from "./sidebar-settings";

interface HeaderProps {
  sendMessage?: (params: TriggerEventParams) => void;
}

export function Header({ sendMessage }: HeaderProps) {
  const [selected, setSelected] = useState<string>("auto-dialer");

  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center justify-between w-screen px-4">
        <SidebarEvents sendMessage={sendMessage} selected={selected} />
        <CallType setSelected={setSelected} />
        <SidebarSettings />
      </div>
    </div>
  );
}
