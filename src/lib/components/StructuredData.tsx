/**
 * STRUCTURED DATA COMPONENT
 * 
 * Componente que injeta schemas JSON-LD no <head> da página.
 * Usa Next.js <Script> component para otimização.
 * 
 * USO:
 * <StructuredData config={{ pageType: 'service', ... }} />
 */

'use client';

import Script from 'next/script';
import { useSchemaGenerator } from '@/lib/schemas/useSchemaGenerator';
import type { SchemaConfig } from '@/lib/schemas/types';

interface StructuredDataProps {
  config: SchemaConfig;
}

export function StructuredData({ config }: StructuredDataProps) {
  const { jsonLd } = useSchemaGenerator(config);

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: jsonLd }}
    />
  );
}

/**
 * Componente alternativo para injetar JSON-LD customizado
 * Use quando precisar passar schemas manualmente
 */
interface CustomStructuredDataProps {
  jsonLd: string;
  id?: string;
}

export function CustomStructuredData({ 
  jsonLd, 
  id = 'custom-structured-data' 
}: CustomStructuredDataProps) {
  return (
    <Script
      id={id}
      type="application/ld+json"
      strategy="afterInteractive" // ✅ corrigido aqui
      dangerouslySetInnerHTML={{ __html: jsonLd }}
    />
  );
}
