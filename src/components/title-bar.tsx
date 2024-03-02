import { WebSocketStatus } from '@/type/websocket';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

declare global {
  interface Window {
    electron: {
      minimizeWindow: () => void;
      maximizeRestoreWindow: () => void;
      closeWindow: () => void;
    };
  }
}

interface TitleBarProps {
  status: WebSocketStatus;
  clientsConnected: number;
}

export function TitleBar({ status, clientsConnected }: TitleBarProps) {
  const minimizeWindow = () => window.electron.minimizeWindow();
  const closeWindow = () => window.electron.closeWindow();
  const isStatusOpened = status === WebSocketStatus.OPEN;

  return (
    <div id="title-bar">
      <div id="window-controls">
        <button id="close-button" onClick={closeWindow}>🔴</button>
        <button id="min-button" onClick={minimizeWindow}>🟡</button>
      </div>
      <div id="cam">
      </div>
      <div id="wbs-status">
        {isStatusOpened &&
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className='h-0' variant={null} size="icon">
                {isStatusOpened && <span className='text-xs animate-blink'>WBS</span>}
                <span className="sr-only">Websocket On</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side='bottom'>Websocket On</TooltipContent>
          </Tooltip>
        }
        <Tooltip>
          <TooltipTrigger asChild>
            <Button className='h-4 w-4' variant={null} size="icon">
              <span className='text-[10px] leading-[0px] flex h-4 w-4 text-black font-bold items-center justify-center rounded-full bg-green-600'>{clientsConnected}</span>
              <span className="sr-only">Connections Counter</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side='bottom'>Connections Counter</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};