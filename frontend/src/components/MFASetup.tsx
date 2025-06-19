import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import "./Login.css";

const MFASetup = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  useEffect(() => {
    const setupMFA = async () => {
      try {
        if (!user) return;

        // Check if MFA is already enabled
        const factors = await user.getFactors();
        
        if (factors.length === 0) {
          // Create a new TOTP (Time-based One-Time Password) factor
          const factor = await user.createFactor({
            strategy: 'totp',
            type: 'totp'
          });
          
          // Get the QR code URL
          if (factor.type === 'totp') {
            setQrCodeUrl(factor.totpUrl || '');
          }

          // Store the factor for later verification
          localStorage.setItem('pendingFactorId', factor.id);
        } else {
          // MFA is already set up, redirect to dashboard
          navigate('/dashboard');
        }
      } catch (err) {
        console.error('Error setting up MFA:', err);
        navigate('/dashboard');
      }
    };

    setupMFA();
  }, [user, navigate]);

  const handleVerify = async (code: string) => {
    try {
      if (!user) return;

      const factorId = localStorage.getItem('pendingFactorId');
      if (!factorId) {
        console.error('No pending factor found');
        return;
      }

      // Get the factor
      const factors = await user.getFactors();
      const factor = factors.find(f => f.id === factorId);
      
      if (!factor) {
        console.error('Factor not found');
        return;
      }

      // Attempt to verify the code
      await factor.verify(code);

      // Clear the pending factor
      localStorage.removeItem('pendingFactorId');

      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      console.error('Error verifying MFA:', err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <header className="login-header">
          <h1>Set Up Two-Factor Authentication</h1>
          <p>Enhance your account security with 2FA</p>
        </header>

        <div className="glass-panel">
          {qrCodeUrl && (
            <div className="qr-code">
              <img src={qrCodeUrl} alt="QR Code for 2FA Setup" />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="verification-code" className="form-label">
              Enter Verification Code
            </label>
            <input
              type="text"
              id="verification-code"
              className="form-input"
              placeholder="Enter the 6-digit code"
              onChange={(e) => {
                if (e.target.value.length === 6) {
                  handleVerify(e.target.value);
                }
              }}
            />
          </div>
        </div>

        <footer className="login-footer">
          Use an authenticator app like Google Authenticator or Authy
        </footer>
      </div>
    </div>
  );
};

export default MFASetup; 