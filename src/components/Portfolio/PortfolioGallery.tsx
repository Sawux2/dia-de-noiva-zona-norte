'use client';

import { useState } from 'react';

// Dados do portfolio (substitua com suas fotos reais)
const portfolioItems = [
  { id: 1, category: 'noivas', title: 'Casamento Clássico', image: '👰', description: 'Maquiagem natural e penteado sofisticado' },
  { id: 2, category: 'noivas', title: 'Noiva Romântica', image: '💐', description: 'Look delicado com tons rosé' },
  { id: 3, category: 'noivas', title: 'Estilo Moderno', image: '💄', description: 'Maquiagem contemporânea e elegante' },
  { id: 4, category: 'madrinhas', title: 'Madrinhas Elegantes', image: '👗', description: 'Maquiagem social sofisticada' },
  { id: 5, category: 'social', title: 'Festa de Gala', image: '✨', description: 'Look glamouroso para eventos' },
  { id: 6, category: 'noivas', title: 'Penteado Preso', image: '🌸', description: 'Coque baixo com flores naturais' },
  { id: 7, category: 'formatura', title: 'Formatura Chic', image: '🎓', description: 'Maquiagem marcante e duradoura' },
  { id: 8, category: 'social', title: 'Evento Corporativo', image: '💼', description: 'Elegância e profissionalismo' },
  { id: 9, category: 'noivas', title: 'Noiva Boho', image: '🌿', description: 'Estilo natural e despojado' },
];

const categories = [
  { id: 'todos', name: 'Todos os Trabalhos', icon: '✨' },
  { id: 'noivas', name: 'Noivas', icon: '👰' },
  { id: 'madrinhas', name: 'Madrinhas', icon: '👗' },
  { id: 'social', name: 'Social', icon: '💃' },
  { id: 'formatura', name: 'Formatura', icon: '🎓' },
];

export default function PortfolioGallery() {
  const [activeCategory, setActiveCategory] = useState('todos');
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const filteredItems = activeCategory === 'todos' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-stone-50/30">
      <div className="container mx-auto px-4">
        
        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`group px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-amber-600 via-rose-500 to-amber-700 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-stone-50 border border-stone-200/50 hover:border-amber-200/50 hover:shadow-md'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className={activeCategory === category.id ? '' : 'grayscale'}>{category.icon}</span>
                <span>{category.name}</span>
              </span>
            </button>
          ))}
        </div>

        {/* Gallery Grid - Masonry Style */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-stone-100 to-amber-50/50 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
              style={{ 
                animationDelay: `${index * 100}ms`,
                height: index % 3 === 0 ? '400px' : index % 2 === 0 ? '350px' : '450px' 
              }}
            >
              {/* Imagem Placeholder - substitua com <Image> do Next.js */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-100/40 via-rose-100/30 to-stone-100/40 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-7xl mb-4 transform group-hover:scale-110 transition-transform duration-500">
                    {item.image}
                  </div>
                  <div className="text-sm text-gray-400 px-4">
                    Adicione foto aqui<br />
                    <span className="text-xs">(800x1000px)</span>
                  </div>
                </div>
              </div>

              {/* Overlay com informações */}
              <div className={`absolute inset-0 bg-gradient-to-t from-stone-900/95 via-stone-900/60 to-transparent transition-all duration-500 ${
                hoveredItem === item.id ? 'opacity-100' : 'opacity-0'
              }`}>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform transition-transform duration-500" style={{
                  transform: hoveredItem === item.id ? 'translateY(0)' : 'translateY(20px)'
                }}>
                  {/* Categoria Badge */}
                  <div className="inline-block mb-3">
                    <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium border border-white/30">
                      {categories.find(c => c.id === item.category)?.name}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  <p className="text-white/80 text-sm mb-4">{item.description}</p>
                  
                  <button className="flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all">
                    <span>Ver detalhes</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Corner decoration */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-400/20 to-transparent rounded-bl-full transform translate-x-12 -translate-y-12 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500"></div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="group bg-white text-gray-700 px-8 py-4 rounded-full font-semibold hover:bg-stone-50 transition-all border border-stone-200 hover:border-amber-200 hover:shadow-lg">
            <span className="flex items-center gap-2">
              <span>Carregar mais trabalhos</span>
              <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}