import React, { useState, useEffect } from "react";
import { Lock } from "lucide-react";
import brandConfig from "../config/brand";

export default function PasswordGate({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const isAuth = sessionStorage.getItem("almass_auth");
    if (isAuth === "true" || !brandConfig.sitePassword) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === brandConfig.sitePassword) {
      sessionStorage.setItem("almass_auth", "true");
      setIsAuthenticated(true);
    } else {
      setError(true);
    }
  };

  if (isAuthenticated) {
    return children;
  }

  return (
    <div className="fixed inset-0 bg-[#050505] flex items-center justify-center z-[9999] p-4 font-sans">
      <div className="w-full max-w-md bg-[#0a0a0a] rounded-2xl p-8 border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center mb-6 border border-brand-gold/20">
            <Lock className="text-brand-gold w-8 h-8" />
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-medium text-white mb-2 text-center">
            Private Access
          </h2>
          <p className="text-gray-400 text-sm text-center mb-8">
            This landing page is currently password protected.
          </p>

          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder="Enter password"
                className={`w-full bg-[#111] border ${error ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30 transition-all text-sm`}
              />
              {error && (
                <p className="text-red-500 text-xs mt-2 ml-1">Incorrect password</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-brand-gold text-brand-black py-3.5 rounded-xl text-base font-medium hover:bg-white transition-all mt-2"
            >
              Enter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
