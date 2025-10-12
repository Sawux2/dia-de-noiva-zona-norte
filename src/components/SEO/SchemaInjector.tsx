// src/components/SEO/SchemaInjector.tsx
// Injeta schemas de forma que o Google consiga ler corretamente

import Script from 'next/script';
import type { SchemaType } from '@/types/seo';

interface SchemaInjectorProps {
  schemas: SchemaType | SchemaType[];
}

/**
 * Componente que injeta schemas no <head> usando Next/Script
 * Google consegue ler perfeitamente
 */
export default function SchemaInjector({ schemas }: SchemaInjectorProps) {
  const schemaArray = Array.isArray(schemas) ? schemas : [schemas];

  return (
    <>
      {schemaArray.map((schema, index) => (
        <Script
          key={index}
          id={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
          strategy="beforeInteractive" // Carrega antes da interação (melhor para SEO)
        />
      ))}
    </>
  );
}

/**
 * Versão para usar diretamente no <head> (Server Component)
 */
export function SchemaHead({ schemas }: SchemaInjectorProps) {
  const schemaArray = Array.isArray(schemas) ? schemas : [schemas];

  return (
    <>
      {schemaArray.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema, null, 0), // Minificado para performance
          }}
        />
      ))}
    </>
  );
}