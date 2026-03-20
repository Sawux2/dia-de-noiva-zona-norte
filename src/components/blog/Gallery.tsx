'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IMAGES = [
  '/images/maquiagem-noiva-zona-norte.webp',
  '/images/maquiadora-profissional-noivas-santana.webp',
  '/images/penteado-noiva-tendencias-2026.webp',
  '/images/dia-de-noiva-zona-norte-sp.webp',
];

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  function next() {
    setCurrentIndex(i => (i + 1) % IMAGES.length);
  }

  function prev() {
    setCurrentIndex(i => (i - 1 + IMAGES.length) % IMAGES.length);
  }

  return (
    <div className="my-16">
      <h3 className="text-2xl font-bold text-center mb-8" style={{ color: '#1a1a1a' }}>Nossas Produções ✨</h3>
      
      <div className="relative w-full overflow-hidden rounded-2xl aspect-[4/3] sm:aspect-[21/9] bg-gray-900 group">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={IMAGES[currentIndex]}
            alt="Produção Studio Amendola"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-cover opacity-90"
          />
        </AnimatePresence>

        {/* Controls */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          ←
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          →
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2 h-2 rounded-full transition-all ${i === currentIndex ? 'bg-white w-4' : 'bg-white/50'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
