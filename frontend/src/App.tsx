import React, { useState, useRef } from 'react'
import { SignedIn, SignedOut, SignIn, useClerk, useAuth } from '@clerk/clerk-react'
import { useNavigate, Routes, Route } from 'react-router-dom'
import MFASetup from './components/MFASetup'
import './App.css'

const App = () => {
  const { signOut } = useClerk()
  const { getToken } = useAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState<'secure' | 'unlock'>('secure')
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSignOut = () => {
    signOut().then(() => navigate('/'))
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      if (mode === 'unlock' && !selectedFile.name.endsWith('.encrypted')) {
        setError('Please select a file with .encrypted extension for unlocking')
        return
      }
      setFile(selectedFile)
      setError(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    setLoading(true)
    setError(null)

    const formData = new FormData()
    formData.append('document', file)

    try {
      const token = await getToken() // fresh token
      const response = await fetch(`http://localhost:8000/api/${mode}/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`// token included in every request
        },
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to process document')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      const fileName = mode === 'secure' 
        ? `secured_${file.name}.encrypted`
        : `unlocked_${file.name.replace('.encrypted', '')}`
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()
      link.remove()
      setFile(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while processing the file')
    } finally {
      setLoading(false)
    }
  }

  const renderApp = () => (
    <div className="app-container">
      <div className="content-wrapper">
        <header className="app-header">
          <h1>Welcome to SecureDoc</h1>
          <p>Seamless Security for Sensitive Data</p>
          <button onClick={handleSignOut} className="sign-out-button">
            Sign Out
          </button>
        </header>

        <div className="glass-panel">
          <div className="mode-buttons">
            <button
              onClick={() => {
                setMode('secure')
                setError(null)
                setFile(null)
                if (fileInputRef.current) {
                  fileInputRef.current.value = ''
                }
              }}
              className={mode === 'secure' ? 'active' : ''}
            >
              Secure Document
            </button>
            <button
              onClick={() => {
                setMode('unlock')
                setError(null)
                setFile(null)
                if (fileInputRef.current) {
                  fileInputRef.current.value = ''
                }
              }}
              className={mode === 'unlock' ? 'active' : ''}
            >
              Unlock Document
            </button>
          </div>

          <div className="upload-area" onClick={handleUploadClick}>
            <input
              type="file"
              onChange={handleFileChange}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
            <div className="upload-content">
              <div className="upload-icon">📄</div>
              <p>Click to select a file to {mode}</p>
              {file && <p className="file-info">Selected: {file.name}</p>}
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button
            className="submit-button"
            onClick={handleSubmit}
            disabled={!file || loading}
          >
            {loading ? (
              <span className="loading">
                Processing<span className="dots"></span>
              </span>
            ) : (
              `${mode === 'secure' ? 'Secure' : 'Unlock'} Document`
            )}
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <Routes>
      <Route
        path="/mfa-setup"
        element={
          <SignedIn>
            <MFASetup />
          </SignedIn>
        }
      />
      <Route
        path="/*"
        element={
          <>
            <SignedIn>
              {renderApp()}
            </SignedIn>
            <SignedOut>
              <div className="sign-in-container">
                <div>
                  <div className="glass-panel">
                    <div className="login-header">
                      <h1>Welcome to SecureDoc</h1>
                      <p>Secure your documents with end-to-end encryption</p>
                    </div>
                    <SignIn 
                      routing="path" 
                      path="/"
                      appearance={{
                        layout: {
                          logoPlacement: "none",
                          showOptionalFields: false
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
                          card: {
                            boxShadow: 'none',
                            width: '100%'
                          }
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </SignedOut>
          </>
        }
      />
    </Routes>
  )
}

export default App 