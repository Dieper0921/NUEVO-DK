import React, { useState } from 'react';
import { Plane, Calculator, CheckCircle2 } from 'lucide-react';
import { createCustomImportWhatsApp, WHATSAPP_DISPLAY } from '../utils/whatsapp';

export const ImportRequestSection: React.FC = () => {
  const [productName, setProductName] = useState('');
  const [urlOrRef, setUrlOrRef] = useState('');
  const [budget, setBudget] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName.trim()) return;

    const link = createCustomImportWhatsApp(productName, urlOrRef, budget, notes);
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="a-pedido" className="py-6 px-3.5 sm:px-4 border-b border-slate-200 bg-slate-50">
      <div className="space-y-4">
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-blue-600 uppercase mb-1">
            <Plane className="w-3.5 h-3.5 text-blue-600" />
            <span>Importación a Pedido USA a Perú</span>
          </div>

          <h2 className="text-lg font-bold text-slate-900 tracking-tight font-display">
            ¿Buscas otro producto de USA?
          </h2>

          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            Te lo cotizamos y traemos desde Amazon, Best Buy o tiendas oficiales de Estados Unidos directo a tu casa en Perú.
          </p>
        </div>

        {/* Mobile Quotation Form */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 mb-3.5">
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 font-display">
                Cotización Rápida
              </h3>
              <p className="text-[10px] text-slate-500">
                Se enviará directamente al WhatsApp {WHATSAPP_DISPLAY}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                ¿Qué producto buscas? *
              </label>
              <input
                type="text"
                required
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Ej. Suplementos, Electrónicos, Accesorios..."
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-600 transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Enlace o Referencia (Opcional)
              </label>
              <input
                type="url"
                value={urlOrRef}
                onChange={(e) => setUrlOrRef(e.target.value)}
                placeholder="https://amazon.com/... o enlace"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-600 transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Presupuesto Estimado (Opcional)
              </label>
              <input
                type="text"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="Ej. $100 USD o S/ 400"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-600 transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full min-h-[44px] inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs rounded-xl shadow-xs transition-all"
            >
              <span>Solicitar Cotización por WhatsApp</span>
            </button>
          </form>
        </div>

        {/* Benefits list */}
        <div className="space-y-1.5 text-[11px] text-slate-600">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>Entrega en 7 a 12 días hábiles en Lima y Provincias.</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>Incluye flete e impuestos de aduana sin sorpresas.</span>
          </div>
        </div>
      </div>
    </section>
  );
};
