'use client';

import AuthProvider from './auth/AuthProvider';
import type { User } from './auth/types';
import ToastProvider from './ToastProvider';
import FpjsProvider from './FpjsProvider';
import ReactQueryClientProvider from './ReactQueryClientProvider';

interface Props {
  init: {
    user?: User;
  };
}

export default function Providers({ children, init }: React.PropsWithChildren<Props>) {
  const { user } = init;

  return (
    <ReactQueryClientProvider>
      <AuthProvider init={user}>
        <ToastProvider>
          <FpjsProvider>{children}</FpjsProvider>
        </ToastProvider>
      </AuthProvider>
    </ReactQueryClientProvider>
  );
}
