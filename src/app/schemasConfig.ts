import { Schema } from './types';

export const schemasConfig: Record<string, (pathname: string) => Schema[]> = {
  '/': (pathname) => [
    // Home page schemas
  ],
  '/servicos': (pathname) => [
    // Service list page schemas
  ],
  '/servicos/[slug]': (pathname) => {
    // Dynamic service page
    const slug = pathname.split('/').pop();
    // Gerar schema baseado no slug
    return [ ... ];
  },
  // ... outras rotas
};