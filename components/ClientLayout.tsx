// app/components/ClientLayout.tsx
'use client';

import { usePathname } from 'next/navigation';
import Navbar from '../components/navbar_component';
import UiState from '../components/stateMenage/UiState';
import I18nProvider from '../components/I18nProvider';
import { UiProvider } from '../components/stateMenage/UiProvider';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <I18nProvider>
      <UiProvider>
        <div className="relative">
          {pathname !== '/login' && pathname !== '/register' && pathname !== '/report' && pathname !== '/forgetPassword' && (
            <div className="absolute top-0 w-full z-10">
              <Navbar />
            </div>
          )}
          {children}
          <UiState />
        </div>
      </UiProvider>
    </I18nProvider>
  );
}
