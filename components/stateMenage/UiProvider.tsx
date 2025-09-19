'use client'
import React, { createContext, useContext, useState } from 'react';

type UiContextType = {
  loading: boolean;
  setLoading: (val: boolean) => void;
  error: string | null;
  setError: (val: string | null) => void;
  loadingOverlay: boolean;
  setLoadingOverlay: (val: boolean) => void;
  success: string | null;
  setSuccess: (val: string | null) => void;
  authCheck: string | null;
  setAuth: (val: string | null) => void;
};

const UiContext = createContext<UiContextType | undefined>(undefined);

export const UiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [loadingOverlay, setLoadingOverlay] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [authCheck , setAuth] = useState<string | null>(null);

  return (
    <UiContext.Provider value={{ loading, setLoading, error, setError, 
    loadingOverlay, setLoadingOverlay ,success, setSuccess , authCheck , setAuth  }}>
      {children}
    </UiContext.Provider>
  );
};

export const useUi = () => {
  const ctx = useContext(UiContext);
  if (!ctx) throw new Error("useUi must be used inside UiProvider");
  return ctx;
};
