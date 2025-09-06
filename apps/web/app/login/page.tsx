'use client';

import React, { useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'http://localhost:3000';

export default function LoginPage() {
  const [username, setUsername] = useState('manager');
  const [password, setPassword] = useState('any');
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok || !data.access_token) {
        setError(data?.error || 'Login failed');
        return;
      }
      setToken(data.access_token);
    } catch (err: any) {
      setError(err?.message || 'Login error');
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Login</h1>
      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <label className="block text-sm mb-1">Username</label>
          <input className="border rounded px-3 py-2 w-full" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input className="border rounded px-3 py-2 w-full" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">Login</button>
      </form>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      {token && (
        <div className="text-sm break-all">
          <div className="font-medium">Token</div>
          <div className="mt-1 p-2 bg-gray-100 border rounded">{token}</div>
        </div>
      )}
      <div className="text-sm text-gray-600">
        Try users: manager, admin, inspector (password can be any value in mock mode)
      </div>
    </div>
  );
}