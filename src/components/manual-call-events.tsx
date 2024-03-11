import { avayaRequest, avayaResponse, phoneEvents } from "@/utils/events";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SheetDescription } from "@/components/ui/sheet";
import { Events } from "@/components/events";

function ManualCallEvents() {
  return (
    <ScrollArea className="h-screen pb-4">
      <SheetDescription className="ml-3 mt-4 mb-2">
        Avaya Request
      </SheetDescription>
      <Events links={avayaRequest} />
      <Separator className="w-[90%] mx-auto" />
      <SheetDescription className="ml-3 mt-4 mb-2">
        Phone Events
      </SheetDescription>
      <Events links={phoneEvents} />
      <Separator className="w-[90%] mx-auto" />
      <SheetDescription className="ml-3 mt-4 mb-2">
        Avaya Response
      </SheetDescription>
      <Events links={avayaResponse} />
      <Separator className="w-[90%] mx-auto" />
    </ScrollArea>
  );
}

export default ManualCallEvents;
