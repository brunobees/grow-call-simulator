import { avayaRequest, avayaResponse, phoneEvents } from "@/utils/avaya-events";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SheetDescription } from "@/components/ui/sheet";
import { Events } from "@/components/events";
import { TriggerEventParams } from "@/type/websocket";

interface ManualCallEvents {
  customPocData: TriggerEventParams;
  sendMessage?: (params: TriggerEventParams) => void;
  status: string;
  setOpen: (openStatus: boolean) => void;
}

function ManualCallEvents({
  customPocData,
  sendMessage,
  status,
  setOpen,
}: ManualCallEvents) {
  return (
    <ScrollArea className="h-[410px] pb-4">
      <SheetDescription className="ml-3 mt-4 mb-2">
        Avaya Request
      </SheetDescription>
      <Events
        setOpen={setOpen}
        status={status}
        customPocData={customPocData}
        sendMessage={sendMessage}
        links={avayaRequest}
      />
      <Separator className="w-[90%] mx-auto" />
      <SheetDescription className="ml-3 mt-4 mb-2">
        Phone Events
      </SheetDescription>
      <Events
        setOpen={setOpen}
        status={status}
        customPocData={customPocData}
        sendMessage={sendMessage}
        links={phoneEvents}
      />
      <Separator className="w-[90%] mx-auto" />
      <SheetDescription className="ml-3 mt-4 mb-2">
        Avaya Response
      </SheetDescription>
      <Events
        setOpen={setOpen}
        status={status}
        customPocData={customPocData}
        sendMessage={sendMessage}
        links={avayaResponse}
      />
      <Separator className="w-[90%] mx-auto" />
    </ScrollArea>
  );
}

export default ManualCallEvents;
