'use client';

import { useEffect } from 'react';
import app from '@/lib/firebase';

export default function FirebaseProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Firebase가 초기화되었는지 확인 (개발 환경에서만)
    if (process.env.NODE_ENV === 'development') {
      console.log('Firebase initialized:', app.name);
    }
  }, []);

  return <>{children}</>;
} 