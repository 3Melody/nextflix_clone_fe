'use client'
import React, { createContext, useContext, useState } from 'react';

type UiContextType = {
  loading: boolean;
  setLoading: (val: boolean) => void;
  error: string | null;
  setError: (val: string | null) => void;
  loadingOverlay: boolean;
  setLoadingOverlay: (val: boolean) => void;
};

const UiContext = createContext<UiContextType | undefined>(undefined);

export const UiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [loadingOverlay, setLoadingOverlay] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <UiContext.Provider value={{ loading, setLoading, error, setError, loadingOverlay, setLoadingOverlay }}>
      {children}
    </UiContext.Provider>
  );
};

export const useUi = () => {
  const ctx = useContext(UiContext);
  if (!ctx) throw new Error("useUi must be used inside UiProvider");
  return ctx;
};
