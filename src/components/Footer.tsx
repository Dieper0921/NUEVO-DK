import React from 'react';
import { LOGO_IMAGE_PATH } from '../data/products';
import { MessageCircle, Phone, MapPin, Truck, ShieldCheck } from 'lucide-react';
import { WHATSAPP_DISPLAY, createGeneralWhatsAppLink } from '../utils/whatsapp';

export const Footer: React.FC = () => {
  return (
    <footer id="contacto" className="bg-white border-t border-slate-200 text-slate-600 text-xs py-6 px-4">
      <div className="space-y-4 text-center">
        {/* Brand info */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-xl overflow-hidden bg-white p-1 flex items-center justify-center shadow-xs border border-slate-200">
            <img
              src={LOGO_IMAGE_PATH}
              alt="DK Importaciones"
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="text-base font-bold text-slate-900 font-display">
            <span className="text-blue-600">DK</span>{' '}
            <span className="text-slate-900">Importaciones</span>
          </span>
          <p className="text-[11px] text-slate-500 max-w-xs">
            Importación directa de productos exclusivos y suplementación premium en Perú.
          </p>
        </div>

        {/* Contact links */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-[11px] text-left">
          <a
            href={createGeneralWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-emerald-700 font-bold"
          >
            <MessageCircle className="w-4 h-4 fill-current shrink-0" />
            <span>WhatsApp: {WHATSAPP_DISPLAY}</span>
          </a>

          <div className="flex items-center gap-2 text-slate-600">
            <Phone className="w-4 h-4 text-slate-400 shrink-0" />
            <span>Atención: +51 975 190 577</span>
          </div>

          <div className="flex items-center gap-2 text-slate-600">
            <Truck className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Envíos Provincias: únicamente vía Shalom</span>
          </div>

          <div className="flex items-center gap-2 text-slate-600">
            <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
            <span>Lima Metropolitana & Provincias del Perú</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-400">
          <p>© {new Date().getFullYear()} DK Importaciones. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
