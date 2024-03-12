export enum WebSocketStatus {
  IDLE = "IDLE",
  CONNECTING = "CONNECTING",
  OPEN = "OPEN",
  CONNECTED_NO_PEER = "CONNECTED_NO_PEER",
  CLOSING = "CLOSING",
  CLOSED = "CLOSED",
  AWAITING_CONNECTION = "AWAITING_CONNECTION",
}

export interface WebsocketEventData {
  id: string;
  eventoType: string;
  length?: number;
  comando?: string;
  numero?: string;
  phone?: string;
  poc_id?: string;
  gid?: string;
  ani?: string;
  dnis?: string;
  evento: string;
  isTyped?: boolean | null;
  keepAlive?: string | null;
  vendor_id?: string | null;
}

export interface TriggerEventParams {
  evento?: string;
  phone: string;
  poc_id: string;
  vendor_id?: string;
  isTyped?: boolean;
}

export interface EventsProps {
  title: string;
  type: string;
  label?: string;
  variant: "default" | "ghost" | "outline";
}
