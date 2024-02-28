import React, { useEffect, useState } from "react";

import { Header } from "@/components/header";
import { TitleBar } from "@/components/title-bar";
import { Mail } from "@/data";
import { useMail } from "@/use-mail";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface MailProps {
  accounts: {
    label: string;
    email: string;
    icon: React.ReactNode;
  }[];
  mails: Mail[];
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

function App({
  accounts,
  mails,
  defaultLayout = [265, 440, 655],
  defaultCollapsed = false,
  navCollapsedSize,
}: MailProps) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState("");

  const connectWebSocket = () => {
    const socket = new WebSocket("ws://localhost:8088");

    socket.onopen = (evt) => {
      console.log("WEBSOCKET - emulator.onopen");
    };

    socket.onmessage = (evt) => {
      const data = evt.data;
      if (data) {
        if (data["comando"]) {
          switch (data["comando"]) {
            case "MakeCall":
              sendMessage();
              break;
            default:
              break;
          }
        } else if (data["evento"]) {
          switch (data["evento"]) {
            case "DisconnectCall":
              sendMessage();
              break;
            default:
              break;
          }
        }
      }
    };

    socket.onerror = (evt) => {
      console.log("WEBSOCKET - emulator.onerror: ", evt);
    };

    socket.onclose = (evt) => {
      console.log("WEBSOCKET - emulator.onclose");
    };

    setSocket(socket);
  };

  const sendMessage = () => {
    const data = {
      evento: "DisconnectCall",
      ani: "5511999999999",
      dnis: "35879",
      ramal: "10738",
      gid: "615|254387|1",
    };

    if (socket) {
      console.log(data)
      const stringData = JSON.stringify(data);
      socket.send(stringData);
      console.log("WEBSOCKET - emulator.send: ", stringData);
    }
  };

  return (
    <>
      <TitleBar />
      <TooltipProvider delayDuration={0}>
        <div className={cn("flex items-center justify-center")}>
          <Header onMakeCall={sendMessage} />
        </div>
        <div className="h-[68%] text-sm flex items-center justify-center w-full">
          <div>
            <img
              className="w-8 h-auto"
              src="./src/assets/bees_logo.webp"
              alt="Avaya Logo"
            />
          </div>
        </div>
        <div className="flex flex-col w-full gap-4 items-center">
          <Button onClick={connectWebSocket} size="sm" className="w-[90%]">
            Connect
          </Button>
          <Label
            htmlFor="mute"
            className="flex flex-col items-center gap-2 text-xs font-normal"
          >
            <span className="flex  items-center gap-2">
              <Switch id="mute" aria-label="Mute thread" /> Enable Keep Alive
              event sending
            </span>
            <small>
              Make with 💛 by{" "}
              <a
                className="font-bold text-[hsl(60,99%,66%)] underline"
                href="https://github.com/bruno-candia"
              >
                Bruno
              </a>
            </small>
          </Label>
        </div>
      </TooltipProvider>
    </>
  );
}

export default App;
