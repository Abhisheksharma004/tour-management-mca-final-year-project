'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// Map of guide IDs to slugs
const guideIdToSlug: {[key: string]: string} = {
  '1': 'maria-rodriguez',
  '2': 'sophia-chen',
  '3': 'hiroshi-tanaka',
  '4': 'james-wilson',
  '5': 'raj-mehta',
  '6': 'marco-rossi',
  '7': 'aisha-rahman',
  '8': 'carlos-mendoza',
  '9': 'emma-wilson'
};

export default function GuideProfileRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const guideId = searchParams.get('id') || '1';
  
  useEffect(() => {
    // Get the slug from the ID mapping or default to the first guide
    const slug = guideIdToSlug[guideId] || 'maria-rodriguez';
    
    // Redirect to the new guide profile page
    router.replace(`/guides/${slug}`);
  }, [guideId, router]);
  
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redirecting to guide profile...</h1>
        <p>Please wait while we redirect you to the guide's profile page.</p>
      </div>
    </div>
  );
} 