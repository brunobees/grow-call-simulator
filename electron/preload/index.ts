import { ipcRenderer, contextBridge } from "electron";

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld("ipcRenderer", withPrototype(ipcRenderer));

// `exposeInMainWorld` can't detect attributes and methods of `prototype`, manually patching it.
function withPrototype(obj: Record<string, any>) {
  const protos = Object.getPrototypeOf(obj);

  for (const [key, value] of Object.entries(protos)) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) continue;

    if (typeof value === "function") {
      obj[key] = function (...args: any) {
        return value.call(obj, ...args);
      };
    } else {
      obj[key] = value;
    }
  }
  return obj;
}

// --------- Preload scripts loading ---------
function domReady(
  condition: DocumentReadyState[] = ["complete", "interactive"]
) {
  return new Promise((resolve) => {
    if (condition.includes(document.readyState)) {
      resolve(true);
    } else {
      document.addEventListener("readystatechange", () => {
        if (condition.includes(document.readyState)) {
          resolve(true);
        }
      });
    }
  });
}

const safeDOM = {
  append(parent: HTMLElement, child: HTMLElement) {
    if (!Array.from(parent.children).find((e) => e === child)) {
      return parent.appendChild(child);
    }
  },
  remove(parent: HTMLElement, child: HTMLElement) {
    if (Array.from(parent.children).find((e) => e === child)) {
      return parent.removeChild(child);
    }
  },
};

/**
 * https://tobiasahlin.com/spinkit
 * https://connoratherton.com/loaders
 * https://projects.lukehaas.me/css-loaders
 * https://matejkustec.github.io/SpinThatShit
 */
function useLoading() {
  // const className = `loaders-css__square-spin`;
  const styleContent = `
  *,
  *:after,
  *:before {
    box-sizing: border-box;
  }
  
  body {
    display: grid;
    place-items: center;
    min-height: 70vh;
    border-radius: 20px;
    background: hsl(20 14.3% 4.1%);
  }
  
  svg {
    width: 30vmin;
  }
  
  :root {
    --speed: .875s;
  }
  
  g:nth-of-type(1) { --delay: 0.35; }
  g:nth-of-type(2) { --delay: 0.5; }
  g:nth-of-type(3) { --delay: 0.75; }
  g:nth-of-type(4) { --delay: 1; }
  g:nth-of-type(5) { --delay: 0.75; }
  g:nth-of-type(6) { --delay: 0.5; }
  g:nth-of-type(7) { --delay: 0.35; }
  
  line {
    transform-origin: 50% 50%;
    translate: 0 -50%;
    animation: drop var(--speed) calc((sin(var(--delay)) * -1s)) infinite alternate ease-in-out;
  }
  
  @keyframes drop {
    0%, 5% {
      translate: 0 -50%;
    }
    95%, 100% {
      translate: 0 50%;
    }
  }
  
  line,
  circle {
    transform-box: fill-box;
  }
  
  circle:first-of-type {
    transform-origin: 50% 100%;
    animation: pulse calc(var(--speed) * 2) calc((sin(var(--delay)) * -1s)) infinite ease-in-out;
  }
  
  circle:last-of-type {
    transform-origin: 50% 0%;
    animation: pulse calc(var(--speed) * 2) calc(((sin(var(--delay)) * -1s) + (var(--speed) * -1))) infinite ease-in-out;
  }
  
  @keyframes pulse {
    0%, 20% { transform: scale(1); }
    50%, 100% { transform: scale(0); }
  }
  
  svg {
    overflow: visible !important;
  }
    `;
  const oStyle = document.createElement("style");
  const oDiv = document.createElement("div");

  oStyle.id = "app-loading-style";
  oStyle.innerHTML = styleContent;
  oDiv.className = "app-loading-wrap";
  oDiv.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 350">
  <defs>
    <filter id="goo">
      <feGaussianBlur id="SvgjsFeGaussianBlur1000" result="SvgjsFeGaussianBlur1000" in="SourceGraphic" stdDeviation="10">
      </feGaussianBlur>
      <feColorMatrix id="SvgjsFeColorMatrix1001" result="SvgjsFeColorMatrix1001" in="SvgjsFeGaussianBlur1000" values="
            1 0 0 0 0                                      
            0 1 0 0 0
            0 0 1 0 0
            0 0 0 30 -10" type="matrix"></feColorMatrix>
      <feComposite id="SvgjsFeComposite1002" result="SvgjsFeComposite1002" in="SvgjsFeColorMatrix1001" operator="atop">
      </feComposite>
    </filter>
    <linearGradient id="g" x1="100%" x2="0" y1="0" y2="80%" gradientTransform="rotate(10)">
      <stop offset="0%" stop-color="#FEFE55" />
      <stop offset="100%" stop-color="#F2F209" />
    </linearGradient>
    <mask id="mask">
      <g>
        <circle cx="50" cy="25" r="25" fill="white"></circle>
        <line x1="50" x2="50" y1="100" y2="250" stroke-width="50" stroke="white" stroke-linecap="round"></line>
        <circle cx="50" cy="325" r="25" fill="white"></circle>
      </g>
      <g>
        <circle cx="150" cy="25" r="25" fill="white"></circle>
        <line x1="150" x2="150" y1="100" y2="250" stroke-width="50" stroke="white" stroke-linecap="round"></line>
        <circle cx="150" cy="325" r="25" fill="white"></circle>
      </g>
      <g>
        <circle cx="250" cy="25" r="25" fill="white"></circle>
        <line x1="250" x2="250" y1="100" y2="250" stroke-width="50" stroke="white" stroke-linecap="round"></line>
        <circle cx="250" cy="325" r="25" fill="white"></circle>
      </g>
      <g>
        <circle cx="350" cy="25" r="25" fill="white"></circle>
        <line x1="350" x2="350" y1="100" y2="250" stroke-width="50" stroke="white" stroke-linecap="round"></line>
        <circle cx="350" cy="325" r="25" fill="white"></circle>
      </g>
      <g>
        <circle cx="450" cy="25" r="25" fill="white"></circle>
        <line x1="450" x2="450" y1="100" y2="250" stroke-width="50" stroke="white" stroke-linecap="round"></line>
        <circle cx="450" cy="325" r="25" fill="white"></circle>
      </g>
      <g>
        <circle cx="550" cy="25" r="25" fill="white"></circle>
        <line x1="550" x2="550" y1="100" y2="250" stroke-width="50" stroke="white" stroke-linecap="round"></line>
        <circle cx="550" cy="325" r="25" fill="white"></circle>
      </g>
      <g>
        <circle cx="650" cy="25" r="25" fill="white"></circle>
        <line x1="650" x2="650" y1="100" y2="250" stroke-width="50" stroke="white" stroke-linecap="round"></line>
        <circle cx="650" cy="325" r="25" fill="white"></circle>
      </g>
    </mask>
  </defs>
  <g filter="url(#goo)">
    <rect x="0" y="0" width="100%" height="100%" fill="url(#g)" mask="url(#mask)"></rect>
  </g>
</svg>`;

  return {
    appendLoading() {
      safeDOM.append(document.head, oStyle);
      safeDOM.append(document.body, oDiv);
    },
    removeLoading() {
      safeDOM.remove(document.head, oStyle);
      safeDOM.remove(document.body, oDiv);
    },
  };
}

contextBridge.exposeInMainWorld("electron", {
  minimizeWindow: () => ipcRenderer.send("minimize-window"),
  maximizeRestoreWindow: () => ipcRenderer.send("maximize-restore-window"),
  closeWindow: () => ipcRenderer.send("close-window"),
});

// ----------------------------------------------------------------------

const { appendLoading, removeLoading } = useLoading();
domReady().then(appendLoading);

window.onmessage = (ev) => {
  ev.data.payload === "removeLoading" && removeLoading();
};

setTimeout(removeLoading, 4999);
