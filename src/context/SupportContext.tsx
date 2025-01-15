import React, { createContext, useContext, useState } from 'react';

interface SupportSettings {
  helplineNumber: string;
  supportEmail: string;
}

interface SupportContextType {
  settings: SupportSettings;
  updateSettings: (newSettings: Partial<SupportSettings>) => void;
}

const defaultSettings: SupportSettings = {
  helplineNumber: '+254 700 000 000',
  supportEmail: 'support@mku.ac.ke'
};

const SupportContext = createContext<SupportContextType | null>(null);

export function useSupport() {
  const context = useContext(SupportContext);
  if (!context) {
    throw new Error('useSupport must be used within a SupportProvider');
  }
  return context;
}

export default function SupportProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SupportSettings>(() => {
    const saved = localStorage.getItem('mku_support_settings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  const updateSettings = (newSettings: Partial<SupportSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem('mku_support_settings', JSON.stringify(updated));
  };

  return (
    <SupportContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SupportContext.Provider>
  );
}