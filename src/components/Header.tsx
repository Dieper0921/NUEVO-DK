import React from 'react';
import { MessageCircle } from 'lucide-react';
import { LOGO_IMAGE_PATH } from '../data/products';
import { WHATSAPP_DISPLAY, createGeneralWhatsAppLink } from '../utils/whatsapp';
import { Currency } from '../types';

interface HeaderProps {
  currency?: Currency;
  onToggleCurrency?: () => void;
}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="px-3 sm:px-4">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo & Brand Name */}
          <a href="#" className="flex items-center gap-2.5 shrink-0 group">
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-lg overflow-hidden bg-white p-0.5 flex items-center justify-center shadow-xs border border-slate-200">
              <img
                src={LOGO_IMAGE_PATH}
                alt="Logo DK Importaciones"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 font-display leading-tight">
                <span className="text-blue-600">DK</span>{' '}
                <span className="text-slate-900">Importaciones</span>
              </span>
              <span className="text-[10px] text-slate-500 font-medium">
                Perú · Envíos Shalom
              </span>
            </div>
          </a>

          {/* Mobile Actions: Direct WhatsApp Action */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={createGeneralWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center p-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors"
              title={`WhatsApp: ${WHATSAPP_DISPLAY}`}
            >
              <MessageCircle className="w-5 h-5 fill-current" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
