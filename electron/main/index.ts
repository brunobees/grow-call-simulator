import {
  app,
  BrowserWindow,
  globalShortcut,
  shell,
  ipcMain,
  screen,
} from "electron";
import { release } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { update } from "./update";
import '../../server.js'; 

globalThis.__filename = fileURLToPath(import.meta.url);
globalThis.__dirname = dirname(__filename);

// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.mjs    > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//
process.env.DIST_ELECTRON = join(__dirname, "../");
process.env.DIST = join(process.env.DIST_ELECTRON, "../dist");
process.env.VITE_PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? join(process.env.DIST_ELECTRON, "../public")
  : process.env.DIST;

// Disable GPU Acceleration for Windows 7
if (release().startsWith("6.1")) app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === "win32") app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let win: BrowserWindow | null = null;
// Here, you can also use other preload
const preload = join(__dirname, "../preload/index.mjs");
const url = process.env.VITE_DEV_SERVER_URL;
const indexHtml = join(process.env.DIST, "index.html");

async function createWindow() {
  // 
  // const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  win = new BrowserWindow({
    title: "Avaya Simulator",
    icon: join(process.env.VITE_PUBLIC, "favicon.ico"),
    webPreferences: {
      preload,
      // Certifique-se de manter as boas práticas de segurança:
      nodeIntegration: false,
      contextIsolation: true,
      // Adicione sandbox: true se possível para melhor segurança
    },
    resizable: false,
    width: 330, // Usa a largura total da tela
    height: 633, // Altura fixa
    x: 0, // Esquerda da tela
    y: 0, // Parte inferior da tela
    frame: false,
    transparent: true, // Isso torna a janela transparente
  });
  win.webContents.openDevTools();
  if (url) {
    win.loadURL(url);
  } else {
    win.loadFile(indexHtml);
  }
  // Sempre no topo
  win.setAlwaysOnTop(true, "floating");

  // win.webContents.on('will-navigate', (event, url) => {
  //   // Impede a navegação para qualquer URL que não seja parte do seu app
  //   if (!url.includes('http://localhost:5173/')) {
  //     event.preventDefault(); // Impede a criação de uma nova janela
  //     shell.openExternal(url); // Abre o URL no navegador padrão do usuário
  //   }
  // });

  // Impede a janela de ser maximizada.
  win.setMaximizable(false);

  // Impede a janela de ser redimensionada.
  win.setResizable(false);

  // Impede a janela de entrar em tela cheia.
  win.setFullScreenable(false);

  // Remove a barra de menus
  win.setMenu(null);

  // Test actively push message to the Electron-Renderer
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https:")) shell.openExternal(url);
    return { action: "deny" };
  });

  win.webContents.on("did-finish-load", () => {
    win?.webContents.insertCSS("body { border-radius: 20px; }");
  });

  globalShortcut.register("CommandOrControl+R", () => {
    win?.reload();
  });

  // Apply electron-updater
  update(win);
}
// Evento para minimizar
ipcMain.on("minimize-window", (event) => {
  const window = BrowserWindow.getFocusedWindow();
  window?.minimize();
});

// Evento para maximizar/restaurar a janela
ipcMain.on('maximize-restore-window', (event) => {
  const window = BrowserWindow.getFocusedWindow();
  if (window?.isMaximized()) {
    window.restore();
  } else {
    window?.maximize();
  }
});

// Evento para fechar a janela
ipcMain.on("close-window", (event) => {
  const window = BrowserWindow.getFocusedWindow();
  window?.close();
});

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  win = null;
  if (process.platform !== "darwin") app.quit();
});

app.on("second-instance", () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});

app.on("activate", () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});

// New window example arg: new windows url
ipcMain.handle("open-win", (_, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${url}#${arg}`);
  } else {
    childWindow.loadFile(indexHtml, { hash: arg });
  }
});
