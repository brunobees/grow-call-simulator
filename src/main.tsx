import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { accounts, mails } from "@/data"
import './index.css'


const defaultLayout = undefined
const defaultCollapsed = undefined

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
   <App
      accounts={accounts}
      mails={mails}
      defaultLayout={defaultLayout}
      defaultCollapsed={defaultCollapsed}
      navCollapsedSize={4}
    />
  </React.StrictMode>,
)

postMessage({ payload: 'removeLoading' }, '*')
