// src/components/Home/Testimonials.tsx - Seção de Depoimentos

const testimonials = [
  { 
    name: 'Julia Santos', 
    role: 'Noiva',
    comment: 'A maquiagem ficou impecável! Durou o dia todo e estava perfeita em todas as fotos. O teste prévio me deixou super segura. Recomendo de olhos fechados!',
    image: '👰',
    rating: 5,
    date: 'Janeiro 2024'
  },
  { 
    name: 'Mariana Costa', 
    role: 'Formatura',
    comment: 'Profissionalismo incomparável! A equipe entendeu exatamente o que eu queria e me deixou ainda mais linda. Recebi milhões de elogios!',
    image: '💃',
    rating: 5,
    date: 'Fevereiro 2024'
  },
  { 
    name: 'Ana Paula Lima', 
    role: 'Mãe da Noiva',
    comment: 'Atendimento excepcional! Fizeram minha maquiagem e da minha filha. Ficamos lindas e emocionadas. Superou todas as expectativas!',
    image: '👩',
    rating: 5,
    date: 'Março 2024'
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-gradient-to-br from-pink-50 via-rose-50 to-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-200 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-200 rounded-full blur-3xl opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block mb-4">
            <span className="bg-amber-100 text-amber-600 px-4 py-2 rounded-full text-sm font-medium">
              ⭐ Depoimentos
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Histórias de
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600"> noivas felizes</span>
          </h2>
          <p className="text-xl text-gray-600">
            Veja o que nossas clientes têm a dizer sobre a experiência com o Studio Amendola
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-pink-200 relative overflow-hidden"
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* Stars */}
                <div className="flex mb-6 gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>

                {/* Quote Icon */}
                <div className="text-pink-200 text-5xl mb-4 leading-none"></div>

                {/* Comment */}
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  {testimonial.comment}
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                  <div className="w-14 h-14 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center text-2xl shadow-lg">
                    {testimonial.image}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    <div className="text-xs text-gray-400 mt-1">{testimonial.date}</div>
                  </div>
                </div>
              </div>

              {/* Corner Decoration */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-pink-500/10 to-rose-500/10 rounded-bl-full transform translate-x-12 -translate-y-12 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500"></div>
            </div>
          ))}
        </div>

        {/* Stats Row */}
        <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600 mb-2">500+</div>
            <div className="text-sm text-gray-600">Noivas Atendidas</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600 mb-2">4.9⭐</div>
            <div className="text-sm text-gray-600">Avaliação Média</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600 mb-2">98%</div>
            <div className="text-sm text-gray-600">Recomendação</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600 mb-2">10+</div>
            <div className="text-sm text-gray-600">Anos Experiência</div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="/depoimentos"
            className="inline-flex items-center gap-2 text-pink-600 font-semibold hover:text-pink-700 transition-colors group"
          >
            <span>Ver todos os depoimentos</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}