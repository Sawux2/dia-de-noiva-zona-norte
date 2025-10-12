import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Sobre */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Studio Amendola</h3>
            <p className="text-sm">
              Especialistas em maquiagem e penteados para noivas e eventos especiais.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-pink-400">Início</Link></li>
              <li><Link href="/servicos" className="hover:text-pink-400">Serviços</Link></li>
              <li><Link href="/portfolio" className="hover:text-pink-400">Portfólio</Link></li>
              <li><Link href="/contato" className="hover:text-pink-400">Contato</Link></li>
            </ul>
          </div>

          {/* Serviços */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Serviços</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/servicos/maquiagem-noivas" className="hover:text-pink-400">Maquiagem de Noivas</Link></li>
              <li><Link href="/servicos/penteados" className="hover:text-pink-400">Penteados</Link></li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Contato</h3>
            <ul className="space-y-2 text-sm">
              <li>📞 (11) 99999-9999</li>
              <li>✉️ contato@studioamendola.com.br</li>
              <li>📍 São Paulo, SP</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2024 Studio Amendola. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}