'use client';

import React, { useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'http://localhost:3000';

export default function LoginPage() {
  const [username, setUsername] = useState('manager');
  const [password, setPassword] = useState('any');
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok || !data.access_token) {
        setError(data?.error || 'Login failed');
        setToken(null);
        return;
      }
      setToken(data.access_token);
    } catch (err: any) {
      setError(err?.message || 'Login error');
      setToken(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Login</h1>
      <p className="text-sm text-gray-600">Mock mode: try manager, admin, or inspector (any password)</p>
      <form className="space-y-4 bg-white border rounded p-4 shadow-sm" onSubmit={onSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Username</label>
            <input className="border rounded px-3 py-2 w-full" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input className="border rounded px-3 py-2 w-full" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60" type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <span className="text-xs text-gray-500">API: {API_URL}</span>
        </div>
      </form>
      {error && <div className="text-red-700 bg-red-50 border border-red-200 p-2 rounded text-sm">{error}</div>}
      {token && (
        <div className="text-sm">
          <div className="font-medium mb-1">Token</div>
          <pre className="mt-1 p-3 bg-gray-100 border rounded text-xs whitespace-pre-wrap break-all">{JSON.stringify({ access_token: token }, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}