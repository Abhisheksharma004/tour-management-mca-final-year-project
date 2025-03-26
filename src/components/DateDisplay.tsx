'use client';

import { useEffect, useState } from 'react';
import { formatDate, formatDateTime } from '@/utils/dateFormatters';

type DateDisplayProps = {
  date: string;
  format?: 'date' | 'datetime';
  fallback?: string;
  className?: string;
};

/**
 * A component for displaying dates in a hydration-safe way
 * Renders the date client-side to prevent hydration errors
 */
export default function DateDisplay({ 
  date, 
  format = 'date', 
  fallback = '',
  className = '' 
}: DateDisplayProps) {
  const [formattedDate, setFormattedDate] = useState<string>('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    try {
      if (format === 'date') {
        setFormattedDate(formatDate(date));
      } else {
        setFormattedDate(formatDateTime(date));
      }
    } catch (error) {
      console.error('Error formatting date:', error);
      setFormattedDate(fallback || date);
    }
  }, [date, format, fallback]);

  // During server-side rendering, return a placeholder or the original date string
  // This ensures consistent rendering between server and client
  if (!isClient) {
    return <span suppressHydrationWarning className={className}>{fallback || date}</span>;
  }

  return (
    <span className={className}>
      {formattedDate || fallback || date}
    </span>
  );
} 