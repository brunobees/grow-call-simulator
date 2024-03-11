import { Header } from "@/components/header";
import { TitleBar } from "@/components/title-bar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useWebSocket } from "./hooks/useWebSocket";
import LogArea from "@/components/log-area";
import Footer from "@/components/footer";

function App() {
  const { status, connect, clientsConnected, close, logs, sendMessage } =
    useWebSocket("ws://localhost:8088");

  function handleConnection() {
    status === "OPEN" ? close() : connect();
  }

  return (
    <TooltipProvider delayDuration={0}>
      <TitleBar status={status} clientsConnected={clientsConnected} />
      <Header sendMessage={sendMessage} />
      {status === "OPEN" ? (
        <LogArea logs={logs} />
      ) : (
        <div className="h-[410px] text-sm flex justify-center items-center w-full">
          <img
            className="w-8 h-auto"
            src="https://www.bees.com/sites/g/files/wnfebl8851/files/styles/webp/public/BEES.COM/About%20Us/Slider%20with%20Timeline/timeline-april-27th-2020.webp?itok=RzufhdHs"
            alt="Avaya Logo"
          />
        </div>
      )}
      <Footer handleConnection={handleConnection} status={status} />
    </TooltipProvider>
  );
}

export default App;
