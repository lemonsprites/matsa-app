'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase-client';
import { User } from '@supabase/supabase-js';

interface UserContextType {
  user: User | null;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within AppProvider');
  return context;
}

export default function AppProvider({ children }: { children: React.ReactNode }) {
  const supabase = createClient();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Since middleware already verified the session server-side,
    // here we just sync client-side auth state for UI updates.
    const session = supabase.auth.getSession();

    session.then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    // Subscribe to auth state changes to keep UI in sync
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase]);


  return <UserContext.Provider value={{ user, loading }}>{children}</UserContext.Provider>;
}
