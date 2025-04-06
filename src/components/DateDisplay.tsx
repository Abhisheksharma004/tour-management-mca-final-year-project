'use client';

import { useEffect, useState } from 'react';
import { formatDateForDisplay } from './common/DateUtils';

type DateDisplayProps = {
  date: string;
  format?: 'date' | 'datetime' | 'time';
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
      const formatted = formatDateForDisplay(date, format);
      setFormattedDate(formatted);
    } catch (error) {
      console.error('Error formatting date:', error);
      setFormattedDate(fallback || date);
    }
  }, [date, format, fallback]);

  // During server-side rendering, return a placeholder with formatDateForDisplay
  // This ensures consistent rendering between server and client
  if (!isClient) {
    return (
      <span suppressHydrationWarning className={className}>
        {formatDateForDisplay(date, format)}
      </span>
    );
  }

  return (
    <span className={className}>
      {formattedDate || fallback || date}
    </span>
  );
} 