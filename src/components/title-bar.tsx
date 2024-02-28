import { Wifi } from 'lucide-react';

declare global {
  interface Window {
    electron: {
      minimizeWindow: () => void;
      maximizeRestoreWindow: () => void;
      closeWindow: () => void;
    };
  }
}

export function TitleBar() {
  const minimizeWindow = () => window.electron.minimizeWindow();
  const closeWindow = () => window.electron.closeWindow();

  return (
    <div id="title-bar">
      <div id="window-controls">
        <button id="close-button" onClick={closeWindow}>🔴</button>
        <button id="min-button" onClick={minimizeWindow}>🟡</button>
      </div>
      <div id="cam">
      </div>
      <div id="wbs-status">
        <span><Wifi size={16} color='green'/></span>
        <span>WBS</span>
      </div>
    </div>
  );
};
