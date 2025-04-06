'use client';

import { useState } from 'react';

export default function TestDatabasePage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const testDatabase = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/db-test');
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(`Error: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Database Test Page</h1>
      
      <button 
        onClick={testDatabase}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 mb-4"
      >
        Test Database Connection
      </button>
      
      {loading && <p className="mb-4">Loading...</p>}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {result && (
        <div className="bg-gray-100 p-4 rounded">
          <pre className="whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
