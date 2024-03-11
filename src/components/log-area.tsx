import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronsDownUp } from "lucide-react";
import { WebsocketEventData } from "@/type/websocket";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface LogAreaProps {
  logs: WebsocketEventData[];
}

function LogArea({ logs }: LogAreaProps) {
  return (
    <div className="h-[410px] text-sm flex justify-start items-center w-full">
      <ScrollArea className="h-[410px] w-full my-8">
        {logs.map((log) => {
          const keysToShow = Object.keys(log).filter(
            (key) =>
              key !== "id" &&
              key !== "evento" &&
              key !== "eventoType" &&
              key !== "type"
          );
          return (
            <div key={log.id}>
              <Collapsible className="w-full self-start px-4 text-wrap py-4">
                <div className="flex items-center justify-between space-x-4 mb-2 w-full">
                  <h4 className="text-sm font-semibold">{log.eventoType}</h4>
                  {keysToShow.length > 0 && (
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <ChevronsDownUp className="h-4 w-4" />
                        <span className="sr-only">Toggle</span>
                      </Button>
                    </CollapsibleTrigger>
                  )}
                </div>
                <div className="rounded-md border px-4 py-2 mb font-mono text-xs shadow-sm">
                  {log.evento}
                </div>
                <CollapsibleContent className="space-y-2">
                  {keysToShow.map((key) => (
                    <div
                      key={key}
                      className="rounded-md border px-4 py-2 mt-2 font-mono text-xs shadow-sm"
                    >
                      {`${key}: ${log[key as keyof WebsocketEventData]}`}
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>
              <Separator />
            </div>
          );
        })}
      </ScrollArea>
    </div>
  );
}

export default LogArea;
