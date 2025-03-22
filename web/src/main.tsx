
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MDTApp from './components/MDTApp'
import './index.css'
import { Toaster } from './components/ui/toaster'
import { Toaster as SonnerToaster } from 'sonner'
import { ThemeProvider } from './lib/next-themes-shim'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MDTApp />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
        <Toaster />
        <SonnerToaster position="top-right" />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
)
