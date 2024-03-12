import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

interface FooterProps {
  handleConnection: () => void;
  status: string;
  setKeepAliveEnabled: (status: boolean) => void;
  keepAliveEnabled: boolean;
}

function Footer({
  setKeepAliveEnabled,
  keepAliveEnabled,
  handleConnection,
  status,
}: FooterProps) {
  return (
    <div className="flex flex-col w-full gap-4 items-center">
      <Button
        onClick={handleConnection}
        size="sm"
        disabled={status === "CONNECTING"}
        className={`w-[90%] ${cn(
          status === "CONNECTING"
            ? "bg-gray-500 text-gray-950"
            : "hsl(60,99%,66%)",
          "hover:bg-opacity-80"
        )}`}
      >
        {status === "OPEN" ? "DISCONNECT" : "CONNECT"}
      </Button>
      <Label
        htmlFor="mute"
        className="flex flex-col items-center gap-2 text-xs font-normal"
      >
        <span className="flex items-center gap-2">
          <Switch
            onCheckedChange={() => {
              setKeepAliveEnabled(!keepAliveEnabled);
            }}
            checked={keepAliveEnabled}
            id="mute"
            aria-label="Mute thread"
          />{" "}
          Enable Keep Alive event sending
        </span>
        <small>
          Made with 💛 by{" "}
          <a
            className="font-bold text-[hsl(60,99%,66%)] underline"
            href="https://github.com/bruno-candia"
          >
            Bruno
          </a>
        </small>
      </Label>
    </div>
  );
}

export default Footer;
