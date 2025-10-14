import Image from "next/image";
import AutomaticSEO, {
  generateServiceBreadcrumbs,
} from "@/components/SEO/AutomaticSEO";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Maquiagem de Noivas | Studio Amendola Zona Norte",
  description:
    "Maquiagem de noiva com luxo e durabilidade. Atendimento exclusivo em São Paulo, zona norte. Studio Amendola: destaque no dia mais importante da sua vida.",
  keywords: [
    "maquiagem de noiva",
    "maquiadora zona norte",
    "studio amendola",
    "penteado de noiva",
    "dia da noiva completo",
  ],
  alternates: {
    canonical: "https://dia-de-noiva-zona-norte.vercel.app/servicos/maquiagem-noivas",
  },
  openGraph: {
    title: "Maquiagem de Noivas | Studio Amendola",
    description:
      "Maquiagem e penteado de noivas em São Paulo com o Studio Amendola. Beleza, durabilidade e elegância no seu grande dia.",
    url: "https://dia-de-noiva-zona-norte.vercel.app/servicos/maquiagem-noivas",
    siteName: "Studio Amendola",
    type: "article",
    images: [
      {
        url: "/images/servicos/maquiagem-noiva.webp",
        width: 1200,
        height: 800,
        alt: "Maquiagem de noiva no Studio Amendola",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maquiagem de Noivas | Studio Amendola",
    description:
      "Beleza e elegância para noivas — Maquiagem profissional com o Studio Amendola.",
    images: ["/images/servicos/maquiagem-noiva.webp"],
  },
};

export default function MaquiagemNoivasPage() {
  // ==========================================
  // 🔗 BREADCRUMBS
  // ==========================================
  const breadcrumbs = generateServiceBreadcrumbs(
    "Maquiagem de Noivas",
    "maquiagem-noivas"
  );

  // ==========================================
  // 🧠 SCHEMA AUTOMÁTICO
  // ==========================================
  const seoData = {
    serviceName: "Maquiagem de Noivas",
    serviceDescription:
      "Maquiagem profissional de noivas realizada no Studio Amendola, zona norte de São Paulo. Peles impecáveis, longa duração e conforto durante todo o evento.",
    servicePrice: "750.00",
    serviceUrl:
      "https://dia-de-noiva-zona-norte.vercel.app/servicos/maquiagem-noivas",
    image: "/images/servicos/maquiagem-noiva.webp",
    breadcrumbs,
    faqs: [
      {
        question: "A maquiagem de noiva dura o casamento inteiro?",
        answer:
          "Sim, utilizamos técnicas e produtos de alta durabilidade, resistentes ao calor, lágrimas e abraços.",
      },
      {
        question: "O atendimento é feito no salão ou em domicílio?",
        answer:
          "Oferecemos ambas opções: atendimento no Studio Amendola (zona norte de São Paulo) e também pacotes de atendimento a domicílio.",
      },
      {
        question: "Posso fazer um teste de maquiagem antes do casamento?",
        answer:
          "Sim, recomendamos fortemente o teste de maquiagem para alinhar o estilo desejado e garantir o resultado perfeito.",
      },
    ],
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-16" id="main-content">
      {/* ✅ SCHEMAS AUTOMÁTICOS */}
      <AutomaticSEO type="service" data={seoData} debug={false} />

      {/* ✅ HEADER SEO */}
      <section className="text-center mb-10">
        <h1 className="text-4xl font-bold text-pink-600 mb-4">
          Maquiagem de Noivas em São Paulo
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          No Studio Amendola, a maquiagem da noiva é feita com cuidado e técnica
          profissional para garantir um visual impecável do início ao fim do
          grande dia.
        </p>
      </section>

      {/* ✅ IMAGEM OTIMIZADA */}
      <div className="rounded-2xl overflow-hidden shadow-xl mb-8">
        <Image
          src="/images/servicos/maquiagem-noiva.webp"
          alt="Maquiagem de noiva Studio Amendola Zona Norte"
          width={1200}
          height={800}
          priority
          className="object-cover w-full h-auto transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* ✅ CONTEÚDO RICO (SEO SEMÂNTICO) */}
      <article className="prose prose-lg mx-auto">
        <h2>Maquiagem de Noiva com Assinatura Studio Amendola</h2>
        <p>
          Cada noiva é única — e sua maquiagem também deve ser. No Studio
          Amendola, trabalhamos com análise facial, tipos de pele e preferências
          individuais para entregar um resultado natural, elegante e duradouro.
        </p>

        <h3>Nosso Processo Exclusivo</h3>
        <ul>
          <li>Consultoria personalizada para definir o estilo ideal</li>
          <li>Prévia de maquiagem e penteado</li>
          <li>Produtos profissionais de alta performance</li>
          <li>Finalização com técnicas de longa duração</li>
        </ul>

        <h3>Por que escolher o Studio Amendola?</h3>
        <p>
          Com mais de 10 anos de experiência, nossa equipe é especializada em
          realçar a beleza natural da noiva, valorizando cada traço com
          harmonia. Atendimento acolhedor, pontual e exclusivo.
        </p>
      </article>

      {/* ✅ FAQ OTIMIZADO (já incluso no AutomaticSEO, mas visível na página) */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold mb-6">Perguntas Frequentes</h2>
        <div className="space-y-4">
          {seoData.faqs.map((faq, index) => (
            <details
              key={index}
              className="bg-gray-50 rounded-lg shadow-sm p-4 border border-gray-200"
            >
              <summary className="font-medium cursor-pointer text-pink-600">
                {faq.question}
              </summary>
              <p className="mt-2 text-gray-700">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
