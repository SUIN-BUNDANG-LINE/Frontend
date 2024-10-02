'use client';

import { FpjsProvider as Provider, FingerprintJSPro } from '@fingerprintjs/fingerprintjs-pro-react';

export default function FpjsProvider({ children }: React.PropsWithChildren) {
  const apiKey = process.env.NEXT_PUBLIC_CREDENTIAL_API_KEY!;
  const credentialServerUrl = process.env.NEXT_PUBLIC_CREDENTIAL_SERVER_URL;

  return (
    <Provider
      loadOptions={{
        apiKey,
        endpoint: credentialServerUrl,
        scriptUrlPattern: [
          `${credentialServerUrl}/web/v<version>/<apiKey>/loader_v<loaderVersion>.js`,
          FingerprintJSPro.defaultScriptUrlPattern,
        ],
        region: 'ap',
      }}>
      {children}
    </Provider>
  );
}
