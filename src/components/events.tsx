import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  EventsProps,
  TriggerEventParams,
  WebSocketStatus,
} from "@/type/websocket";
import { useToast } from "./ui/use-toast";

interface Props {
  customPocData: TriggerEventParams;
  sendMessage: any;
  status: string;
  links: EventsProps[];
  setOpen: (openStatus: boolean) => void;
}

export function Events({
  setOpen,
  customPocData,
  sendMessage,
  status,
  links,
}: Props) {
  const { toast } = useToast();

  function mountEventObj(link: EventsProps) {
    switch (link.type) {
      case "avaya-request":
        if (link.title === "MakeCall" || link.title === "TransferInit") {
          return {
            comando: link.title,
            numero: customPocData.phone,
            gid: "615|254387|1",
          };
        }

        return {
          comando: link.title,
        };

      case "avaya-response":
        return {
          evento: link.title,
        };

      case "phone-events":
        if (link.title === "Available" || link.title === "Pause") {
          return {
            evento: link.title,
          };
        }

        return {
          evento: link.title,
          ani: customPocData.phone,
          dnis: "35879",
          ramal: "120906 ",
          gid: "615|254387|1",
        };

      case "auto-dialer-request":
        if (customPocData.vendor_id) {
          return {
            evento: link.title,
            phone: customPocData.phone,
            poc_id: customPocData.poc_id,
            vendor_id: customPocData.vendor_id,
            isTyped: false,
          };
        }

        return {
          evento: link.title,
          phone: customPocData.phone,
          poc_id: customPocData.poc_id,
          isTyped: false,
        };
    }
  }

  return (
    <div className="group text-white flex flex-col gap-4 py-2 data-[collapsed=true]:py-2">
      <ul className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) => (
          <button
            className={cn(
              buttonVariants({ variant: link.variant, size: "sm" }),
              link.variant === "default" &&
                "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
              "justify-start"
            )}
            onClick={() => {
              if (
                status === WebSocketStatus.IDLE ||
                status === WebSocketStatus.CLOSED
              ) {
                toast({
                  description:
                    "You need to connect the websocket to send an event.",
                });
              } else if (
                !!customPocData.poc_id &&
                status !== WebSocketStatus.IDLE &&
                status !== WebSocketStatus.CLOSED
              ) {
                setOpen(false);
                sendMessage(mountEventObj(link));
                toast({
                  description: "Event sent successfully.",
                });
              } else {
                toast({
                  description:
                    "You need to define a POC to send an event. Please access Custom POC Data to add a poc.",
                });
              }
            }}
          >
            <li key={index}>{link.title}</li>
          </button>
        ))}
      </ul>
    </div>
  );
}
