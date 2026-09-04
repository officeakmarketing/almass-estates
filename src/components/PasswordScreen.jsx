import React, { useState } from "react";
import brandConfig from "../config/brand";

export default function PasswordScreen({ onAuthenticated }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // The secure hash of the randomly generated password: "Xr9#mK2pL"
    const TARGET_HASH = "e18d4e18c89d023b81021e328428520efc361e812a78f8ba92071c788710d7bf";

    // Hash the input using Web Crypto API
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

    if (hashHex === TARGET_HASH) {
      setError("");
      onAuthenticated();
    } else {
      setError("Incorrect password");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-black px-4"
      style={{
        backgroundImage: `radial-gradient(circle at center, ${brandConfig.colors.gold}11 0%, transparent 70%)`,
      }}
    >
      <div
        className="w-full max-w-md p-8 rounded-2xl border bg-black/60 backdrop-blur-xl shadow-2xl"
        style={{
          borderColor: `${brandConfig.colors.gold}33`,
          boxShadow: `0 20px 40px -10px ${brandConfig.colors.gold}22`,
        }}
      >
        <div className="text-center mb-8">
          <h1
            className="text-3xl font-light tracking-tight mb-2"
            style={{ color: brandConfig.colors.gold }}
          >
            Access Restricted
          </h1>
          <p className="text-neutral-400 text-sm">
            Please enter the secure password to view this site.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 transition-all"
              style={{ focusRingColor: brandConfig.colors.gold }}
            />
            {error && (
              <p className="text-red-400 text-sm mt-2 text-center">{error}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-medium transition-all duration-300 hover:scale-[1.02]"
            style={{
              background: `linear-gradient(135deg, ${brandConfig.colors.gold}, ${brandConfig.colors.primary})`,
              color: brandConfig.colors.black,
            }}
          >
            Enter Website
          </button>
        </form>
      </div>
    </div>
  );
}
