// src/components/Home/Services.tsx
import Link from 'next/link';

const services = [
  {
    title: 'Maquiagem de Noivas',
    description: 'Maquiagem perfeita e duradoura para o dia mais importante.',
    icon: '👰',
    href: '/servicos/maquiagem-noivas',
  },
  {
    title: 'Penteados para Noivas',
    description: 'Penteados elegantes que complementam seu estilo.',
    icon: '💐',
    href: '/servicos/penteados-noivas',
  },
  {
    title: 'Maquiagem Social',
    description: 'Make profissional para eventos e ocasiões especiais.',
    icon: '✨',
    href: '/servicos/maquiagem-social',
  },
  {
    title: 'Penteados',
    description: 'Penteados modernos para qualquer ocasião.',
    icon: '💇',
    href: '/servicos/penteados',
  },
];

export default function Services() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nossos Serviços
          </h2>
          <p className="text-lg text-gray-600">
            Transformamos sua beleza com técnicas profissionais
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className="group bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-pink-200 hover:shadow-xl transition-all"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-pink-600 transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                {service.description}
              </p>
              <div className="text-pink-600 font-medium text-sm">
                Saiba mais →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}