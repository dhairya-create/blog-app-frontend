import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import UserContextProvider from './contexts/UserContext.tsx'
import { Toaster } from "react-hot-toast";




createRoot(document.getElementById('root')!).render(
 
     <UserContextProvider>
      <App />
     <Toaster
      position="top-center"
      toastOptions={{
        duration: 2500,
        style: {
          background: "#ffffff",
          color: "#111827",
          fontSize: "14px",
          borderRadius: "8px",
          padding: "12px 16px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        },
      }}
    />
     </UserContextProvider>

)
