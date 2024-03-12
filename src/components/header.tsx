import { useState } from "react";
import { TriggerEventParams } from "@/type/websocket";
import { SidebarEvents } from "./sidebar-events";
import { CallType } from "./call-type";
import { SidebarSettings } from "./sidebar-settings";

interface HeaderProps {
  sendMessage?: (params: TriggerEventParams) => void;
  status: string;
}

export function Header({ status, sendMessage }: HeaderProps) {
  const [callType, setCallType] = useState<string>("auto-dialer");
  const [customPocData, setCustomPocData] = useState<TriggerEventParams>({
    phone: "",
    poc_id: "",
    vendor_id: "",
  });

  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center justify-between w-screen px-4">
        <SidebarEvents
          status={status}
          customPocData={customPocData}
          setCustomPocData={setCustomPocData}
          sendMessage={sendMessage}
          callType={callType}
        />
        <CallType setCallType={setCallType} />
        <SidebarSettings />
      </div>
    </div>
  );
}
