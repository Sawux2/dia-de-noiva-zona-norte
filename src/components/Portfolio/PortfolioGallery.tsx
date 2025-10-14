// pages/portfolio/design-sobrancelhas-natural.tsx
import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import AutomaticSEO, { generatePortfolioBreadcrumbs } from '@/components/SEO/AutomaticSEO';

// =====================================================
// DADOS DO PROJETO - STUDIO AMENDOLA
// =====================================================

const portfolioData = {
  title: 'Design de Sobrancelhas Natural - Transformação Completa | Studio Amendola',
  slug: 'design-sobrancelhas-natural',
  description: 'Veja o incrível antes e depois do design de sobrancelhas natural realizado pela Studio Amendola. Técnicas avançadas para valorizar seu olhar e formato facial.',
  client: 'Cliente Ana Silva',
  date: '2024-01-15',
  category: 'Design de Sobrancelhas',
  duration: '45 minutos',
  technique: 'Design com henna e micropigmentação natural',
  
  // IMAGENS ANTES/DEPOIS
  images: [
    {
      url: '/images/sobrancelhas-1.jpg',
      alt: 'Sobrancelha antes do design - formato irregular e falhas',
      type: 'before'
    },
    {
      url: '/images/sobrancelhas-2.jpg',
      alt: 'Sobrancelha depois do design - formato perfeito e natural',
      type: 'after'
    },
    {
      url: '/images/sobrancelhas-1.jpg',
      alt: 'Vista lateral da sobrancelha designada - harmonização facial',
      type: 'side'
    }
  ],

  // VÍDEO DO PROCESSO
  video: {
    thumbnail: '/images/sobrancelhas-1.jpg',
    youtubeId: 'abcd1234',
    description: 'Processo completo do design de sobrancelhas natural'
  },

  // DETALHES DO SERVIÇO
  serviceDetails: {
    price: 'R$ 120,00',
    duration: '45-60 minutos',
    maintenance: '4-6 semanas',
    painLevel: 'Leve desconforto',
    results: 'Imediatos'
  },

  // DEPOIMENTO DO CLIENTE
  testimonial: {
    text: 'Incrível como o design natural valorizou meu rosto! A Ana é extremamente cuidadosa e atenta aos detalhes. Super indico!',
    author: 'Ana Silva',
    age: '28 anos',
    profession: 'Arquiteta'
  },

  // PERGUNTAS FREQUENTES ESPECÍFICAS
  faqs: [
    {
      question: 'Quanto tempo dura o design de sobrancelhas natural?',
      answer: 'O design natural dura entre 4 a 6 semanas, dependendo do tipo de pele e velocidade de crescimento dos fios.'
    },
    {
      question: 'É dolorido?',
      answer: 'A maioria das clientes relata apenas um leve desconforto. Utilizamos técnicas suaves e produtos anestésicos para maior conforto.'
    },
    {
      question: 'Posso fazer design de sobrancelhas grávida?',
      answer: 'Sim, o design natural é seguro durante a gravidez. Utilizamos apenas produtos hipoalergênicos e técnicas não-invasivas.'
    },
    {
      question: 'Precisa deixar crescer antes da primeira sessão?',
      answer: 'Não é necessário. Na primeira sessão avaliamos o formato natural e trabalhamos com o que você tem.'
    }
  ],

  // TÉCNICAS UTILIZADAS
  techniques: [
    {
      name: 'Análise Facial',
      description: 'Estudo das proporções do rosto para determinar o formato ideal'
    },
    {
      name: 'Design com Henna',
      description: 'Pigmentação temporária para preencher falhas e definir formato'
    },
    {
      name: 'Técnica Fio a Fio',
      description: 'Criação de fios naturais para um efeito realista'
    },
    {
      name: 'Finalização com Gel',
      description: 'Fixação perfeita que dura o dia todo'
    }
  ]
};

// =====================================================
// COMPONENTE DA PÁGINA
// =====================================================

const PortfolioDesignSobrancelhas: NextPage = () => {
  const breadcrumbs = generatePortfolioBreadcrumbs(
    'Design de Sobrancelhas Natural',
    'design-sobrancelhas-natural'
  );

  return (
    <>
      {/* ===================================================== */}
      {/* 🔥 SEO AUTOMÁTICO - TODOS OS SCHEMAS */}
      {/* ===================================================== */}
      <AutomaticSEO 
        type="portfolio"
        data={{
          title: portfolioData.title,
          description: portfolioData.description,
          author: 'Studio Amendola',
          datePublished: portfolioData.date,
          dateModified: new Date().toISOString(),
          image: portfolioData.images[0].url,
          url: `https://studioamendola.com/portfolio/${portfolioData.slug}`,
          keywords: [
            'design sobrancelhas natural',
            'antes e depois sobrancelhas',
            'studio amendola sobrancelhas',
            'design sobrancelhas sp',
            'micropigmentação natural',
            'henna sobrancelhas',
            'sobrancelha perfeita'
          ],
          breadcrumbs: breadcrumbs
        }}
        debug={true}
      />

      {/* ===================================================== */}
      {/* 🎯 META TAGS ADICIONAIS */}
      {/* ===================================================== */}
      <Head>
        <title>{portfolioData.title}</title>
        <meta name="description" content={portfolioData.description} />
        <meta name="keywords" content="design sobrancelhas, antes depois, studio amendola, sobrancelha natural" />
        
        {/* Open Graph */}
        <meta property="og:title" content={portfolioData.title} />
        <meta property="og:description" content={portfolioData.description} />
        <meta property="og:image" content={portfolioData.images[0].url} />
        <meta property="og:url" content={`https://studioamendola.com/portfolio/${portfolioData.slug}`} />
        <meta property="og:type" content="article" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={portfolioData.title} />
        <meta name="twitter:description" content={portfolioData.description} />
        <meta name="twitter:image" content={portfolioData.images[0].url} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={`https://studioamendola.com/portfolio/${portfolioData.slug}`} />
      </Head>

      {/* ===================================================== */}
      {/* 🎨 CONTEÚDO PRINCIPAL */}
      {/* ===================================================== */}
      <main className="min-h-screen bg-white">
        
        {/* HEADER DO PROJETO */}
        <section className="bg-gradient-to-r from-pink-50 to-purple-50 py-16">
          <div className="container mx-auto px-4">
            <nav className="mb-8">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Link href="/" className="hover:text-pink-600">Início</Link>
                <span>›</span>
                <Link href="/portfolio" className="hover:text-pink-600">Portfólio</Link>
                <span>›</span>
                <span className="text-gray-900">Design Natural</span>
              </div>
            </nav>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Design de Sobrancelhas <span className="text-pink-600">Natural</span>
                </h1>
                <p className="text-xl text-gray-700 mb-6">
                  Transformação completa que valoriza seu olhar e harmoniza suas features naturais
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <h3 className="font-semibold text-gray-900">Cliente</h3>
                    <p className="text-gray-600">{portfolioData.client}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Duração</h3>
                    <p className="text-gray-600">{portfolioData.duration}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Técnica</h3>
                    <p className="text-gray-600">{portfolioData.technique}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Data</h3>
                    <p className="text-gray-600">{new Date(portfolioData.date).toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button className="bg-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-pink-700 transition duration-300">
                    Agendar Avaliação
                  </button>
                  <button className="border border-pink-600 text-pink-600 px-8 py-3 rounded-lg font-semibold hover:bg-pink-50 transition duration-300">
                    Ver Mais Trabalhos
                  </button>
                </div>
              </div>

              <div className="relative">
                <div className="relative h-80 w-full rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={portfolioData.images[1].url}
                    alt={portfolioData.images[1].alt}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white p-2 rounded-lg shadow-lg">
                  <span className="text-sm font-semibold text-green-600">🌟 Resultado Final</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================== */}
        {/* 📸 GALERIA ANTES/DEPOIS */}
        {/* ===================================================== */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              <span className="text-red-500">Antes</span> e <span className="text-green-500">Depois</span> 
              <br className="md:hidden" /> da Transformação
            </h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* FOTO ANTES */}
              <div className="text-center">
                <div className="relative h-96 rounded-2xl overflow-hidden shadow-lg mb-4">
                  <Image
                    src={portfolioData.images[0].url}
                    alt={portfolioData.images[0].alt}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    ANTES
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  Sobrancelha com formato irregular e falhas naturais
                </p>
              </div>

              {/* FOTO DEPOIS */}
              <div className="text-center">
                <div className="relative h-96 rounded-2xl overflow-hidden shadow-lg mb-4">
                  <Image
                    src={portfolioData.images[1].url}
                    alt={portfolioData.images[1].alt}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    DEPOIS
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  Design natural perfeito, valorizando o formato facial
                </p>
              </div>
            </div>

            {/* VISTA LATERAL */}
            <div className="text-center mt-12">
              <div className="relative h-64 w-64 mx-auto rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={portfolioData.images[2].url}
                  alt={portfolioData.images[2].alt}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-gray-600 mt-4">Vista lateral - harmonização perfeita</p>
            </div>
          </div>
        </section>

        {/* ===================================================== */}
        {/* 🎥 VÍDEO DO PROCESSO */}
        {/* ===================================================== */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Veja Como Foi Feito
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Assista ao processo completo do design de sobrancelhas natural, 
              desde a análise facial até a finalização perfeita.
            </p>

            <div className="max-w-4xl mx-auto">
              <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
                {/* Placeholder para o vídeo - substitua pelo seu player */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-20 h-20 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-pink-700 transition duration-300">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-lg font-semibold">Assistir Vídeo do Processo</p>
                    <p className="text-sm text-gray-300 mt-2">Duração: 2:30 minutos</p>
                  </div>
                </div>
                
                {/* Thumbnail do vídeo */}
                <Image
                  src={portfolioData.video.thumbnail}
                  alt="Thumbnail do vídeo do processo"
                  fill
                  className="object-cover opacity-70"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================== */}
        {/* 💬 DEPOIMENTO DO CLIENTE */}
        {/* ===================================================== */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8 shadow-lg">
              <div className="text-center">
                <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <blockquote className="text-2xl italic text-gray-800 mb-6">
                  {portfolioData.testimonial.text}
                </blockquote>
                <div>
                  <p className="font-semibold text-gray-900">{portfolioData.testimonial.author}</p>
                  <p className="text-gray-600 text-sm">
                    {portfolioData.testimonial.age} • {portfolioData.testimonial.profession}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================== */}
        {/* 🔧 TÉCNICAS UTILIZADAS */}
        {/* ===================================================== */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Técnicas <span className="text-pink-600">Avançadas</span> Utilizadas
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {portfolioData.techniques.map((technique, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300">
                  <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-pink-600 font-bold text-lg">{index + 1}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{technique.name}</h3>
                  <p className="text-gray-600 text-sm">{technique.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================== */}
        {/* ❓ PERGUNTAS FREQUENTES */}
        {/* ===================================================== */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Perguntas <span className="text-pink-600">Frequentes</span>
            </h2>

            <div className="max-w-4xl mx-auto space-y-6">
              {portfolioData.faqs.map((faq, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition duration-300">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-start">
                    <span className="text-pink-600 mr-3">Q:</span>
                    {faq.question}
                  </h3>
                  <p className="text-gray-700 ml-7">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================== */}
        {/* 📞 CTA FINAL */}
        {/* ===================================================== */}
        <section className="py-16 bg-gradient-to-r from-pink-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Pronta para Sua Transformação?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Agende sua avaliação gratuita e descubre como o design de sobrancelhas 
              natural pode valorizar sua beleza única.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-pink-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 text-lg">
                📞 Agendar por WhatsApp
              </button>
              <button className="border border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-pink-600 transition duration-300 text-lg">
                📧 Enviar E-mail
              </button>
            </div>
            <p className="mt-4 text-pink-200">
              Resposta em até 2 horas • Horários flexíveis
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default PortfolioDesignSobrancelhas;