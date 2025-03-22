
import React from 'react'
import ReactDOM from 'react-dom/client'
import MDTApp from './components/MDTApp'
import './index.css'
import { Toaster } from "./components/ui/toaster"
import { Toaster as SonnerToaster } from "sonner"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MDTApp />
    <Toaster />
    <SonnerToaster position="top-right" />
  </React.StrictMode>,
)
