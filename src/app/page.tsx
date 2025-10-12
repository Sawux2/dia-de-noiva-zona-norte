// src/app/page.tsx - Homepage (monta todas as seções)

import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import Testimonials from '@/components/home/Testimonials';

export default function HomePage() {
  return (
    <>
      {/* Cabeçalho */}
      <Header />

      {/* Conteúdo Principal */}
      <main id="main-content">
        {/* Seção 1: Banner Principal */}
        <Hero />

        {/* Seção 2: Serviços */}
        <Services />

        {/* Seção 3: Depoimentos */}
        <Testimonials />

        {/* Seção 4: Call to Action (vamos criar depois) */}
        {/* <CallToAction /> */}
      </main>

      {/* Rodapé */}
      <Footer />
    </>
  );
}