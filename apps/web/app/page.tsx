import Link from 'next/link';

export default function Home() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Construction Safety Web</h1>
      <p className="text-sm text-gray-600">
        This is a minimal scaffold. Start by logging in, then visit the dashboard.
      </p>
      <div className="space-x-3">
        <Link className="text-blue-600 underline" href="/login">Login</Link>
        <Link className="text-blue-600 underline" href="/dashboard">Dashboard</Link>
      </div>
    </div>
  );
}