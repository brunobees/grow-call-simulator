import { Header } from "@/components/header";
import { TitleBar } from "@/components/title-bar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useWebSocket } from "./hooks/useWebSocket";
import LogArea from "@/components/log-area";
import Footer from "@/components/footer";
import BEESLogo from "@/assets/bees_logo.webp";

function App() {
  const {
    setKeepAliveEnabled,
    keepAliveEnabled,
    status,
    connect,
    clientsConnected,
    close,
    logs,
    sendMessage,
  } = useWebSocket("ws://localhost:8088");

  function handleConnection() {
    status === "OPEN" ? close() : connect();
  }

  return (
    <TooltipProvider delayDuration={0}>
      <TitleBar status={status} clientsConnected={clientsConnected} />
      <Header status={status} sendMessage={sendMessage} />
      {status === "OPEN" ? (
        <LogArea logs={logs} />
      ) : (
        <div className="h-[410px] text-sm flex justify-center items-center w-full">
          <img className="w-8 h-auto" src={BEESLogo} alt="Avaya Logo" />
        </div>
      )}
      <Footer
        setKeepAliveEnabled={setKeepAliveEnabled}
        keepAliveEnabled={keepAliveEnabled}
        handleConnection={handleConnection}
        status={status}
      />
    </TooltipProvider>
  );
}

export default App;
