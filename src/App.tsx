import { useEffect, useRef, useState } from "react";
import { Header } from "@/components/header";
import { TitleBar } from "@/components/title-bar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useWebSocket } from "./hooks/useWebSocket";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Archive, ArchiveX, ChevronsDownUp, Filter, Search, Trash2 } from "lucide-react";
import { WebsocketEventData } from "./type/websocket";
import { Input } from "./components/ui/input";

function App() {
  const { status, connect, clientsConnected, close, logs, sendMessage } = useWebSocket('ws://localhost:8088');
  const [searchedLogs, setSearchedLogs] = useState<Array<WebsocketEventData>>([]);
  const logsEndRef = useRef<HTMLDivElement>(null);


  function handleConnection() {
    if (status === "OPEN") {
      close();
    } else {
      connect();
    }
  }

  function handleSearchLogs(event: { target: { value: any; }; }) {
    const search = event.target.value;
    console.log(logs)

    setSearchedLogs(logs.filter(log => log.evento.includes(search))); 
    console.log(searchedLogs);
  }

  // Efeito para lidar com mensagens recebidas
  useEffect(() => {
    console.log(logs)
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <TooltipProvider delayDuration={0}>
      <TitleBar status={status} clientsConnected={clientsConnected} />
      <div className="flex items-center justify-center">
        <Header sendMessage={sendMessage} />
      </div>
        <div className="flex items-center px-4 py-2">
          <div className="flex items-center gap-2">
          <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <form >
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input onChange={handleSearchLogs} placeholder="Search" className="pl-8" />
                </div>
              </form>
            </div>
            <Separator orientation="vertical" className="mx-1 h-6" />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Filter className="h-4 w-4" />
                  <span className="sr-only">Filter Logs</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Filter Logs</TooltipContent>
            </Tooltip>
          </div>
        </div>
      {status === "OPEN" ? (
        <div className="h-[380px] text-sm flex justify-start items-center w-full">
          <ScrollArea className="h-[380px] w-full">
            {logs.map((log, index) => {
              const keysToShow = Object.keys(log).filter(key => key !== 'id' && key !== 'evento' && key !== 'eventoType' && key !== 'type');
              return (
                <div key={log.id}>
                  <Collapsible className="w-full self-start px-4 text-wrap py-4">
                    <div className="flex items-center justify-between space-x-4 mb-2 w-full">
                      <h4 className="text-sm font-semibold">
                        {log.eventoType}
                      </h4>
                      {keysToShow.length > 0 && (<CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <ChevronsDownUp className="h-4 w-4" />
                          <span className="sr-only">Toggle</span>
                        </Button>
                      </CollapsibleTrigger>)}
                    </div>
                    <div className="rounded-md border px-4 py-2 mb font-mono text-xs shadow-sm">
                      {log.evento}
                    </div>
                    <CollapsibleContent className="space-y-2">
                      {keysToShow.map((key) => (
                        <div key={key} className="rounded-md border px-4 py-2 mt-2 font-mono text-xs shadow-sm">
                          {`${key}: ${log[key as keyof WebsocketEventData]}`}
                        </div>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                  <Separator />
                </div>
              )
            })}
          </ScrollArea>
        </div>
      ) : (
        <div className="h-[380px] text-sm flex justify-center items-center w-full">
          <img
            className="w-8 h-auto"
            src="./src/assets/bees_logo.webp"
            alt="Avaya Logo"
          />
        </div>
      )}
      <div className="flex flex-col w-full gap-4 items-center">
        <Button onClick={handleConnection} size="sm" disabled={status === "CONNECTING"} className={`w-[90%] ${cn(
          status === "CONNECTING" ? "bg-gray-500 text-gray-950" : "hsl(60,99%,66%)",
          "hover:bg-opacity-80"
        )}`}>
          {status === "OPEN" ? "DISCONNECT" : "CONNECT"}
        </Button>
        <Label htmlFor="mute" className="flex flex-col items-center gap-2 text-xs font-normal">
          <span className="flex items-center gap-2">
            <Switch id="mute" aria-label="Mute thread" /> Enable Keep Alive event sending
          </span>
          <small>
            Made with 💛 by{" "}
            <a className="font-bold text-[hsl(60,99%,66%)] underline" href="https://github.com/bruno-candia">
              Bruno
            </a>
          </small>
        </Label>
      </div>
    </TooltipProvider>
  );
}

export default App;
