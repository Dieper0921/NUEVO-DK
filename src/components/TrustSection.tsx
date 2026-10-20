import React from 'react';
import { Truck, ShieldCheck, CreditCard, MessageCircle, Package } from 'lucide-react';
import { WHATSAPP_DISPLAY, createGeneralWhatsAppLink } from '../utils/whatsapp';

export const TrustSection: React.FC = () => {
  return (
    <section id="garantia" className="py-6 px-3.5 sm:px-4 border-b border-slate-200 bg-white">
      {/* Section Header */}
      <div className="text-center space-y-1 mb-6">
        <div className="text-[10px] font-bold tracking-wider text-blue-600 uppercase">
          Compromiso & Seguridad
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight font-display">
          ¿Cómo comprar en DK Importaciones?
        </h2>
        <p className="text-xs text-slate-500">
          Atención directa y envíos rápidos a todo el Perú
        </p>
      </div>

      {/* 4 Steps Mobile Cards */}
      <div className="space-y-3 mb-6">
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3 relative">
          <div className="w-8 h-8 rounded-lg bg-blue-100/80 text-blue-700 flex items-center justify-center shrink-0">
            <Package className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900 font-display">
              1. Elige tu Producto
            </h3>
            <p className="text-[11px] text-slate-600 mt-0.5">
              Toplux Magnesium Complex en stock sellado listo para despacho.
            </p>
          </div>
          <span className="text-xl font-black text-slate-200 absolute top-2 right-3 font-mono">01</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3 relative">
          <div className="w-8 h-8 rounded-lg bg-emerald-100/80 text-emerald-700 flex items-center justify-center shrink-0">
            <MessageCircle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900 font-display">
              2. Coordina por WhatsApp
            </h3>
            <p className="text-[11px] text-slate-600 mt-0.5">
              Escríbenos al {WHATSAPP_DISPLAY} para confirmar tus datos de entrega.
            </p>
          </div>
          <span className="text-xl font-black text-slate-200 absolute top-2 right-3 font-mono">02</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3 relative">
          <div className="w-8 h-8 rounded-lg bg-blue-100/80 text-blue-700 flex items-center justify-center shrink-0">
            <CreditCard className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900 font-display">
              3. Pago Cómodo y Seguro
            </h3>
            <p className="text-[11px] text-slate-600 mt-0.5">
              Yape, Plin, transferencia BCP/BBVA o contraentrega en Lima.
            </p>
          </div>
          <span className="text-xl font-black text-slate-200 absolute top-2 right-3 font-mono">03</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3 relative">
          <div className="w-8 h-8 rounded-lg bg-blue-100/80 text-blue-700 flex items-center justify-center shrink-0">
            <Truck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900 font-display">
              4. Envío Únicamente por Shalom
            </h3>
            <p className="text-[11px] text-slate-600 mt-0.5">
              Provincias solo vía Shalom con clave y seguimiento. No enviamos por Olva.
            </p>
          </div>
          <span className="text-xl font-black text-slate-200 absolute top-2 right-3 font-mono">04</span>
        </div>
      </div>

      {/* WhatsApp Support Banner */}
      <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
        <h4 className="text-xs font-bold text-emerald-950">
          ¿Tienes consultas antes de ordenar?
        </h4>
        <p className="text-[11px] text-emerald-800">
          Atención inmediata y personalizada por nuestro equipo.
        </p>
        <a
          href={createGeneralWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg shadow-xs"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>Consultar por WhatsApp</span>
        </a>
      </div>
    </section>
  );
};
