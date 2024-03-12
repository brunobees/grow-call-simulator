import { autoDialerRequest } from "@/utils/avaya-events";
import { SheetDescription } from "@/components/ui/sheet";

import { Events } from "@/components/events";
import { TriggerEventParams } from "@/type/websocket";

interface AutoDialerEventsProps {
  customPocData: TriggerEventParams;
  sendMessage?: (params: TriggerEventParams) => void;
  status: string;
  setOpen: (openStatus: boolean) => void;
}

function AutoDialerEvents({
  setOpen,
  status,
  customPocData,
  sendMessage,
}: AutoDialerEventsProps) {
  return (
    <>
      <SheetDescription className="font-medium ml-3 mt-4 mb-2">
        Auto Dialer Request
      </SheetDescription>
      <Events
        setOpen={setOpen}
        status={status}
        customPocData={customPocData}
        sendMessage={sendMessage}
        links={autoDialerRequest}
      />
    </>
  );
}

export default AutoDialerEvents;
