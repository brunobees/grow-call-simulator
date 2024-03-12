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
import { useEffect, useRef } from "react";

interface LogAreaProps {
  logs: WebsocketEventData[];
}

function LogArea({ logs }: LogAreaProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scrollToBottom = () => {
      if (viewportRef.current) {
        viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
      }
    };

    scrollToBottom();
  }, [logs]);

  return (
    <div className="h-[410px] text-sm flex justify-start items-center w-full">
      <ScrollArea
        onViewportRef={(ref) => {
          viewportRef.current = ref;
        }}
        className="h-[410px] w-full my-8"
      >
        {logs.map((log) => {
          const keysToShow = Object.keys(log).filter(
            (key) =>
              key !== "id" &&
              key !== "evento" &&
              key !== "comando" &&
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
