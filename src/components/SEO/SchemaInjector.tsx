// src/components/SchemaInjector.tsx
'use client';

import { usePathname } from 'next/navigation';
import { generateSchemas } from '@/lib/schemaGenerator';

export default function SchemaInjector() {
  const pathname = usePathname();
  const schemas = generateSchemas(pathname);

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}