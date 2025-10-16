/**
 * HOME PAGE - Página Principal
 * 
 * Estrutura clean com componentes separados
 * Inclui schemas SEO automáticos
 */

import { StructuredData } from '@/lib/components/StructuredData';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import Testimonials from '@/components/home/Testimonials';

export default function HomePage() {
  return (
    <>
      {/* ========================================
          SCHEMAS SEO (invisível pro usuário)
          ======================================== */}
      <StructuredData 
        config={{
          pageType: 'home',
          breadcrumbs: [
            { 
              name: 'Home', 
              url: 'https://studioamendollanoivas.com.br' 
            }
          ],
          faq: [
            {
              question: 'Onde fica o Studio Amendola Noivas?',
              answer: 'Estamos localizados na Avenida Julio Buono, 2386 - Vila Nivi, São Paulo - SP.'
            },
            {
              question: 'Fazem atendimento a domicílio?',
              answer: 'Sim! Atendemos em domicílio em toda a região de São Paulo mediante agendamento prévio.'
            },
            {
              question: 'Quais serviços vocês oferecem?',
              answer: 'Oferecemos maquiagem e penteado profissional para noivas, madrinhas, debutantes e eventos em geral. Também temos spa day completo com massagem, escalda pés e banho de imersão.'
            },
            {
              question: 'Precisa agendar com antecedência?',
              answer: 'Sim, todos os nossos atendimentos são realizados mediante agendamento prévio para garantir exclusividade e qualidade.'
            }
          ]
        }} 
      />

      {/* ========================================
          CABEÇALHO
          ======================================== */}
      <Header />

      {/* ========================================
          CONTEÚDO PRINCIPAL
          ======================================== */}
      <main id="main-content">
        {/* Seção 1: Banner Principal */}
        <Hero />

        {/* Seção 2: Serviços */}
        <Services />

        {/* Seção 3: Depoimentos */}
        <Testimonials />

        {/* Seção 4: Call to Action (criar depois) */}
        {/* <CallToAction /> */}
      </main>

      {/* ========================================
          RODAPÉ
          ======================================== */}
      <Footer />
    </>
  );
}