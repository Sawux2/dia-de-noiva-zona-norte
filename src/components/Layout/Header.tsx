// src/components/Layout/Header.tsx - Header modular

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

const navigationItems: NavItem[] = [
  { label: 'Início', href: '/' },
  { 
    label: 'Serviços', 
    href: '/servicos',
    children: [
      { label: 'Maquiagem de Noivas', href: '/servicos/maquiagem-noivas' },
      { label: 'Maquiagem Social', href: '/servicos/maquiagem-social' },
      { label: 'Penteados', href: '/servicos/penteados' },
      { label: 'Penteados para Noivas', href: '/servicos/penteados-noivas' },
    ]
  },
  { label: 'Portfólio', href: '/portfolio' },
  { label: 'Blog', href: '/blog' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Contato', href: '/contato' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4" aria-label="Navegação principal">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-pink-600 font-playfair">
              Studio Amendola
            </div>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex space-x-8 items-center">
            {navigationItems.map((item) => (
              <li key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className={`text-sm font-medium hover:text-pink-600 transition-colors ${
                    pathname === item.href ? 'text-pink-600' : 'text-gray-700'
                  }`}
                >
                  {item.label}
                </Link>
                
                {/* Dropdown Menu */}
                {item.children && (
                  <ul className="absolute left-0 mt-2 w-56 bg-white shadow-xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-100">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="block px-4 py-3 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors first:rounded-t-lg last:rounded-b-lg"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          {/* CTA Button Desktop */}
          <Link
            href="/contato"
            className="hidden lg:block bg-pink-600 text-white px-6 py-2.5 rounded-full hover:bg-pink-700 transition-colors font-medium text-sm"
          >
            Agendar Horário
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-gray-700 p-2"
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t pt-4">
            <ul className="space-y-3">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block py-2 font-medium ${
                      pathname === item.href ? 'text-pink-600' : 'text-gray-700'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <ul className="ml-4 mt-2 space-y-2">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="block py-1.5 text-sm text-gray-600 hover:text-pink-600"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/contato"
                  className="block bg-pink-600 text-white px-6 py-3 rounded-full text-center hover:bg-pink-700 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Agendar Horário
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}