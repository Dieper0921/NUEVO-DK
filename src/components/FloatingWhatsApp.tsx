import React from 'react';
import { MessageCircle } from 'lucide-react';
import { createGeneralWhatsAppLink } from '../utils/whatsapp';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <aside aria-label="Contacto directo por WhatsApp" className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-40">
      {/* Floating Circular Action Button without tooltip text popup */}
      <a
        href={createGeneralWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-full shadow-2xl hover:scale-105 transition-all duration-200 border-2 border-white"
        aria-label="Abrir chat de WhatsApp"
        title="Contactar por WhatsApp"
      >
        <span className="sr-only">Contactar por WhatsApp</span>
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-current" />
        
        {/* Subtle Online Green Beacon */}
        <span className="absolute top-0.5 right-0.5 w-3 h-3 bg-emerald-300 border-2 border-white rounded-full shadow-xs" />
      </a>
    </aside>
  );
};
