import React from 'react'
import ReactDOM from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

const PUBLISHABLE_KEY = "pk_test_YWNlLXNuYWlsLTcyLmNsZXJrLmFjY291bnRzLmRldiQ"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider 
      publishableKey={PUBLISHABLE_KEY}
      appearance={{
        layout: {
          showOptionalFields: false,
          socialButtonsVariant: "iconButton"
        },
        elements: {
          socialButtons: {
            display: "none"
          },
          dividerRow: {
            display: "none"
          },
          dividerText: {
            display: "none"
          },
          alternativeMethodsButton: {
            display: "none"
          }
        }
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>
) 