import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-rose-50 to-amber-50 py-20 md:py-32">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-200 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Texto */}
          <div className="space-y-6">
            <div className="inline-block">
              <span className="bg-gradient-to-r from-pink-600 to-rose-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                ✨ Especialistas em Noivas
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Seu dia perfeito começa com a 
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500">
                maquiagem ideal
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Transformamos noivas em versões ainda mais radiantes de si mesmas. 
              Maquiagem e penteados que valorizam sua beleza natural e duram o dia todo.
            </p>
            
            {/* Benefícios */}
            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center">
                  <span className="text-pink-600 text-sm">✓</span>
                </div>
                <span className="text-gray-700">Teste de maquiagem incluso</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center">
                  <span className="text-pink-600 text-sm">✓</span>
                </div>
                <span className="text-gray-700">Produtos premium de longa duração</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center">
                  <span className="text-pink-600 text-sm">✓</span>
                </div>
                <span className="text-gray-700">Atendimento exclusivo e personalizado</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                href="/contato" 
                className="group bg-gradient-to-r from-pink-600 to-rose-600 text-white px-8 py-4 rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 font-medium text-center inline-flex items-center justify-center gap-2"
              >
                <span>Agendar Teste de Maquiagem</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <Link 
                href="/portfolio" 
                className="border-2 border-pink-600 text-pink-600 px-8 py-4 rounded-full hover:bg-pink-50 hover:scale-105 transition-all duration-300 font-medium text-center inline-block"
              >
                Ver Trabalhos
              </Link>
            </div>

            {/* Social Proof */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t">
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 text-transparent bg-clip-text">500+</div>
                <div className="text-sm text-gray-600 mt-1">Noivas Felizes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 text-transparent bg-clip-text">10+</div>
                <div className="text-sm text-gray-600 mt-1">Anos Experiência</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 text-transparent bg-clip-text">4.9⭐</div>
                <div className="text-sm text-gray-600 mt-1">Avaliação</div>
              </div>
            </div>
          </div>

          {/* Imagem */}
          <div className="relative">
            <div className="relative aspect-[3/4] bg-gradient-to-br from-pink-200 via-rose-200 to-amber-200 rounded-3xl overflow-hidden shadow-2xl">
              {/* Placeholder - substitua por imagem real */}
              <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-white/50 backdrop-blur-sm">
                <div className="text-7xl mb-4">💄</div>
                <p className="text-sm text-center px-4">
                  Adicione foto de noiva maquiada<br/>
                  <span className="text-xs">(900x1200px recomendado)</span>
                </p>
              </div>
            </div>
            
            {/* Badge Flutuante */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-2xl p-4 animate-bounce" style={{ animationDuration: '3s' }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-600 to-rose-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  💍
                </div>
                <div>
                  <div className="font-bold text-gray-900">Especialistas</div>
                  <div className="text-sm text-gray-600">em Noivas</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}