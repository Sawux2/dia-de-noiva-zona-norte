'use client';

import { usePathname } from 'next/navigation';
import { schemasConfig } from '@/app/schemasConfig';

export default function DynamicSchemas() {
  const pathname = usePathname();
  let schemas: Schema[] = [];

  // Encontrar a configuração para a rota atual
  for (const route in schemasConfig) {
    // Aqui precisaríamos de uma função de matching de rotas dinâmicas
    if (pathname === route) {
      schemas = schemasConfig[route](pathname);
      break;
    }
  }

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}