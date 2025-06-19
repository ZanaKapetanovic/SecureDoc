import { SignIn } from "@clerk/clerk-react";
import "./Login.css";

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-content">
        <header className="login-header">
          <h1>Welcome to SecureDoc</h1>
          <p>Seamless Security for Sensitive Data</p>
        </header>

        <div className="glass-panel">
          <SignIn 
            routing="path"
            path="/sign-in"
            signUpUrl="/sign-up"
            redirectUrl="/dashboard"
            afterSignInUrl="/mfa-setup"
            signInUrl="/sign-in"
            appearance={{
              layout: {
                logoPlacement: "none",
                showOptionalFields: false
              },
              variables: {
                colorPrimary: "#3b82f6",
                colorBackground: "transparent",
                colorInputBackground: "rgba(255, 255, 255, 0.05)",
                colorInputText: "#ffffff",
                colorTextOnPrimaryBackground: "#ffffff",
                borderRadius: "8px"
              },
              elements: {
                rootBox: {
                  width: "100%"
                },
                card: {
                  backgroundColor: "transparent",
                  border: "none",
                  boxShadow: "none",
                  width: "100%"
                },
                headerTitle: {
                  display: "none"
                },
                headerSubtitle: {
                  display: "none"
                },
                formFieldInput: {
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  color: "#ffffff",
                  "&:focus": {
                    border: "1px solid #3b82f6",
                    boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.3)"
                  }
                },
                formButtonPrimary: {
                  backgroundColor: "#3b82f6",
                  color: "#ffffff",
                  "&:hover": {
                    backgroundColor: "#2563eb"
                  }
                },
                footer: {
                  color: "#a8b1cf"
                },
                formFieldLabel: {
                  color: "#a8b1cf"
                }
              }
            }}
          />
        </div>

        <footer className="login-footer">
          End-to-end encryption • Enterprise-grade security • Privacy first
        </footer>
      </div>
    </div>
  );
};

export default Login; 