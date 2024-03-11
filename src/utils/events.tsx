import { EventsProps } from "../type/websocket";

export const avayaRequest: EventsProps[] = [
  {
    title: "Make Call",
    variant: "default",
  },
  {
    title: "Transfer Init",
    variant: "ghost",
  },
  {
    title: "Transfer Complete",
    variant: "ghost",
  },
  {
    title: "Transfer Cancel",
    variant: "ghost",
  },
  {
    title: "Available",
    variant: "ghost",
  },
  {
    title: "Keep Alive Ack",
    variant: "ghost",
  },
  {
    title: "Get Status",
    variant: "ghost",
  },
  {
    title: "Alternate",
    variant: "ghost",
  },
];

export const phoneEvents: EventsProps[] = [
  {
    title: "Incoming Call",
    variant: "ghost",
  },
  {
    title: "Disconnect Call",
    variant: "ghost",
  },
  {
    title: "Available",
    variant: "ghost",
  },
  {
    title: "Pause",
    variant: "ghost",
  },
];

export const autoDialerRequest: EventsProps[] = [
  {
    title: "Incoming Call",
    variant: "default",
  },
];

export const avayaResponse: EventsProps[] = [
  {
    title: "Make Call ACK",
    variant: "ghost",
  },
  {
    title: "Make Call FAil",
    variant: "ghost",
  },
  {
    title: "Transfer Init ACK",
    variant: "ghost",
  },
  {
    title: "Transfer Init Fail",
    variant: "ghost",
  },
  {
    title: "Transfer Complete ACK",
    variant: "ghost",
  },
  {
    title: "Transfer Complete Fail",
    variant: "ghost",
  },
  {
    title: "Transfer Cancel ACK",
    variant: "ghost",
  },
  {
    title: "Transfer Cancel Fail",
    variant: "ghost",
  },
  {
    title: "Available ACK",
    variant: "ghost",
  },
  {
    title: "Available Fail",
    variant: "ghost",
  },
  {
    title: "Get Status Em Chamada",
    variant: "ghost",
  },
  {
    title: "Get Status Pausa",
    variant: "ghost",
  },
  {
    title: "Get Status Disponivel",
    variant: "ghost",
  },
  {
    title: "Get Status Não Logado",
    variant: "ghost",
  },
  {
    title: "Alternate Sucesso",
    variant: "ghost",
  },
  {
    title: "Alternate Fail",
    variant: "ghost",
  },
];
