import { EventsProps } from "../type/websocket";

export const avayaRequest: EventsProps[] = [
  {
    type: "avaya-request",
    title: "MakeCall",
    variant: "outline",
  },
  {
    type: "avaya-request",
    title: "TransferInit",
    variant: "ghost",
  },
  {
    type: "avaya-request",
    title: "TransferComplete",
    variant: "ghost",
  },
  {
    type: "avaya-request",
    title: "TransferCancel",
    variant: "ghost",
  },
  {
    type: "avaya-request",
    title: "Available",
    variant: "ghost",
  },
  {
    type: "avaya-request",
    title: "KeepAlive_Ack",
    variant: "ghost",
  },
  {
    type: "avaya-request",
    title: "GetStatus",
    variant: "ghost",
  },
  {
    type: "avaya-request",
    title: "Alternate",
    variant: "ghost",
  },
];

export const phoneEvents: EventsProps[] = [
  {
    type: "phone-events",
    title: "IncomingCall",
    variant: "ghost",
  },
  {
    type: "phone-events",
    title: "DisconnectCall",
    variant: "outline",
  },
  {
    type: "phone-events",
    title: "Available",
    variant: "ghost",
  },
  {
    type: "phone-events",
    title: "Pause",
    variant: "ghost",
  },
];

export const autoDialerRequest: EventsProps[] = [
  {
    type: "auto-dialer-request",
    title: "IncomingCall",
    variant: "outline",
  },
];

export const avayaResponse: EventsProps[] = [
  {
    type: "avaya-response",
    title: "MakeCall_ACK",
    variant: "ghost",
  },
  {
    type: "avaya-response",
    title: "MakeCall_Fail",
    variant: "outline",
  },
  {
    type: "avaya-response",
    title: "TransferInit_ACK",
    variant: "ghost",
  },
  {
    type: "avaya-response",
    title: "TransferInit_Fail",
    variant: "ghost",
  },
  {
    type: "avaya-response",
    title: "TransferComplete_ACK",
    variant: "ghost",
  },
  {
    type: "avaya-response",
    title: "TransferComplete_Fail",
    variant: "ghost",
  },
  {
    type: "avaya-response",
    title: "TransferCancel_ACK",
    variant: "ghost",
  },
  {
    type: "avaya-response",
    title: "TransferCancel_Fail",
    variant: "ghost",
  },
  {
    type: "avaya-response",
    title: "Available_ACK",
    variant: "ghost",
  },
  {
    type: "avaya-response",
    title: "Available_Fail",
    variant: "ghost",
  },
  {
    type: "avaya-response",
    title: "GetStatus_EmChamada",
    variant: "ghost",
  },
  {
    type: "avaya-response",
    title: "GetStatus_Pausa",
    variant: "ghost",
  },
  {
    type: "avaya-response",
    title: "GetStatus_Disponivel",
    variant: "ghost",
  },
  {
    type: "avaya-response",
    title: "GetStatus_NaoLogado",
    variant: "ghost",
  },
  {
    type: "avaya-response",
    title: "Alternate_Sucesso",
    variant: "ghost",
  },
  {
    type: "avaya-response",
    title: "Alternate_Fail",
    variant: "ghost",
  },
];
