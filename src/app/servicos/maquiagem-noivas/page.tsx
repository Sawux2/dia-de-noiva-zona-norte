// src/app/servicos/maquiagem-noivas/page.tsx
// EXEMPLO: Como criar uma página de serviço com SEO AUTOMÁTICO

import { Metadata } from 'next';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import AutomaticSEO, { generateServiceBreadcrumbs } from '@/components/SEO/AutomaticSEO';

// ==========================================
// METADATA (Next.js 14+ - SSR)
// ==========================================
export const metadata: Metadata = {
  title: 'Maquiagem de Noivas Profissional em São Paulo',
  description: 'Maquiagem de noivas impecável e duradoura. Teste incluso, produtos premium e atendimento personalizado no Studio Amendola.',
  keywords: ['maquiagem de noivas', 'make noiva são paulo', 'maquiadora profissional'],
};

// ==========================================
// PÁGINA
// ==========================================
export default function MaquiagemNoivasPage() {
  // Dados do serviço (pode vir de um banco de dados)
  const serviceData = {
    serviceName: 'Maquiagem de Noivas',
    serviceDescription: 'Maquiagem profissional para noivas com teste incluso, produtos premium de longa duração e atendimento personalizado.',
    servicePrice: 'A partir de R$ 500',
    serviceUrl: '/servicos/maquiagem-noivas',
    breadcrumbs: generateServiceBreadcrumbs('Maquiagem de Noivas', 'maquiagem-noivas'),
  };

  // FAQs do serviço
  const faqs = [
    {
      question: 'O teste de maquiagem está incluso?',
      answer: 'Sim! Oferecemos teste de maquiagem gratuito para todas as noivas. É importante para garantir que você fique 100% satisfeita no grande dia.',
    },
    {
      question: 'Quanto tempo dura a maquiagem?',
      answer: 'Nossa maquiagem é feita com produtos de alta fixação que duram mais de 12 horas, perfeita para casamentos longos.',
    },
    {
      question: 'Vocês atendem em domicílio?',
      answer: 'Sim! Atendemos tanto no studio quanto em domicílio. Entre em contato para saber mais sobre deslocamento.',
    },
  ];

  return (
    <>
      {/* ============================================
          SCHEMAS AUTOMÁTICOS - Injeta no <head>
          ============================================ */}
      <AutomaticSEO type="service" data={serviceData} />
      <AutomaticSEO type="faq" data={{ faqs }} />

      <Header />
      
      <main>
        {/* Conteúdo da página */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold mb-6">
              Maquiagem de Noivas Profissional
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {serviceData.serviceDescription}
            </p>

            {/* Benefícios */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="text-4xl mb-4">✨</div>
                <h3 className="text-xl font-bold mb-2">Teste Incluso</h3>
                <p className="text-gray-600">Faça seu teste sem compromisso</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="text-4xl mb-4">💄</div>
                <h3 className="text-xl font-bold mb-2">Produtos Premium</h3>
                <p className="text-gray-600">Marcas internacionais de alta qualidade</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="text-4xl mb-4">⏰</div>
                <h3 className="text-xl font-bold mb-2">Longa Duração</h3>
                <p className="text-gray-600">Perfeita por mais de 12 horas</p>
              </div>
            </div>

            {/* FAQ */}
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">Perguntas Frequentes</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <details key={index} className="bg-white p-6 rounded-2xl shadow-lg">
                    <summary className="font-bold cursor-pointer">{faq.question}</summary>
                    <p className="mt-4 text-gray-600">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

/**
 * =====================================================
 * RESULTADO: Google vai reconhecer automaticamente:
 * =====================================================
 * 
 * ✅ Schema de Serviço (Service)
 * ✅ Breadcrumbs (navegação)
 * ✅ FAQ (perguntas expandidas no Google)
 * ✅ LocalBusiness (do layout.tsx)
 * ✅ Organization (do layout.tsx)
 * 
 * TUDO AUTOMÁTICO! Sem precisar copiar/colar schemas!
 */