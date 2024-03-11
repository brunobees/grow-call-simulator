import {
  autoDialerRequest,
} from "@/utils/events";
import {
  SheetDescription,
} from "@/components/ui/sheet";

import { Events } from "@/components/events";

function AutoDialerEvents() {
  return (
    <>
      <SheetDescription className="ml-3 mt-4 mb-2">
        Auto Dialer Request
      </SheetDescription>
      <Events links={autoDialerRequest} />
    </>
  );
}

export default AutoDialerEvents;
