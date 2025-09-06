'use client';

import React, { useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'http://localhost:3000';

export default function DashboardPage() {
  const [token, setToken] = useState<string>('');
  const [health, setHealth] = useState<any>(null);
  const [secure, setSecure] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  async function fetchHealth() {
    setError(null);
    setHealth(null);
    try {
      const res = await fetch(`${API_URL}/health`);
      const data = await res.json();
      setHealth(data);
    } catch (e: any) {
      setError(e?.message || 'Failed to fetch /health');
    }
  }

  async function fetchSecure() {
    setError(null);
    setSecure(null);
    try {
      const res = await fetch(`${API_URL}/health/secure`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      const bodyText = await res.text();
      let data: any;
      try { data = JSON.parse(bodyText); } catch { data = bodyText; }
      if (!res.ok) {
        setSecure({ error: true, status: res.status, body: data });
        return;
      }
      setSecure(data);
    } catch (e: any) {
      setError(e?.message || 'Failed to fetch /health/secure');
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Dashboard</h1>

      <div className="space-y-2">
        <div className="text-sm text-gray-700">API URL: {API_URL}</div>
        <div>
          <label className="block text-sm mb-1">JWT Token (paste from Login page)</label>
          <input className="border rounded px-3 py-2 w-full" value={token} onChange={(e) => setToken(e.target.value)} />
        </div>
        <div className="space-x-3">
          <button className="bg-gray-800 text-white px-3 py-2 rounded" onClick={fetchHealth}>Fetch /health</button>
          <button className="bg-blue-600 text-white px-3 py-2 rounded" onClick={fetchSecure}>Fetch /health/secure</button>
        </div>
      </div>

      {error && <div className="text-red-600 text-sm">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded p-3 bg-white">
          <div className="font-medium mb-2">/health</div>
          <pre className="text-xs whitespace-pre-wrap break-all">{health ? JSON.stringify(health, null, 2) : 'No data'}</pre>
        </div>
        <div className="border rounded p-3 bg-white">
          <div className="font-medium mb-2">/health/secure</div>
          <pre className="text-xs whitespace-pre-wrap break-all">{secure ? JSON.stringify(secure, null, 2) : 'No data'}</pre>
          <div className="text-xs text-gray-600 mt-2">
            Tip: Use manager/admin token for access. Inspector will be denied (403).
          </div>
        </div>
      </div>
    </div>
  );
}