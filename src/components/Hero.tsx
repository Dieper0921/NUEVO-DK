import React, { useState } from 'react';
import { PRODUCTS, BENEFITS_POSTER_IMAGE_PATH } from '../data/products';
import { Product, Currency } from '../types';
import { CountdownTimer } from './CountdownTimer';
import { 
  MessageCircle, 
  Truck, 
  Sparkles, 
  Flame, 
  CheckCircle2,
  PackageCheck
} from 'lucide-react';
import { createProductInquiryWhatsApp } from '../utils/whatsapp';

interface HeroProps {
  onSelectProduct: (product: Product) => void;
  currency: Currency;
}

export const Hero: React.FC<HeroProps> = ({
  onSelectProduct,
  currency
}) => {
  const product = PRODUCTS[0];
  const isPEN = currency === 'PEN';
  const [selectedPack, setSelectedPack] = useState<'single' | 'pack3'>('single');

  const formatPrice = (amount: number, symbol: string) => {
    return amount % 1 === 0 ? `${symbol}${amount}` : `${symbol}${amount.toFixed(2)}`;
  };

  return (
    <section id="catalogo" className="relative overflow-hidden pt-4 pb-8 px-3.5 sm:px-4 bg-white border-b border-slate-200">
      <div className="space-y-4">
        
        {/* 1. Header Badges & Product Title */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-bold text-blue-600 uppercase tracking-tight">
            <span>🇺🇸 Importación USA</span>
            <span>·</span>
            <span>100% Original Sellado</span>
            <span>·</span>
            <span>Lima Stock</span>
          </div>

          <div className="flex items-start justify-between gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug font-display">
              {product.name}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-amber-400 text-slate-950 font-black text-[11px] uppercase tracking-wider shadow-xs border border-amber-300">
              <Flame className="w-3 h-3 fill-current text-slate-950" />
              <span>{product.badge}</span>
            </span>
            <span className="text-xs text-slate-500 font-medium">
              60 Cápsulas · 8 Formas de Magnesio
            </span>
          </div>
        </div>

        {/* 2. IMAGEN DEL MAGNESIUM COMPLEX (Sin formato exterior, limpia arriba de Precio Especial) */}
        <div 
          onClick={() => onSelectProduct(product)}
          className="w-full cursor-pointer flex justify-center"
          title="Toca para ver la ficha técnica completa"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto object-contain block"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* 3. CONTADOR REGRESIVO DE 15 MINUTOS */}
        <CountdownTimer durationMinutes={15} />

        {/* 4. PRECIO ESPECIAL DE OFERTA */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border-2 border-slate-300 shadow-sm space-y-3">
          {/* Header del recuadro */}
          <div className="flex items-center justify-between gap-2 border-b border-slate-200/80 pb-2.5">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                Precio especial de oferta:
              </span>
              <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-700 font-extrabold text-[10px] border border-rose-200">
                -33% DSCTO
              </span>
            </div>

            <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-300 shrink-0">
              {product.stockLabel}
            </span>
          </div>

          {/* Opciones organizadas: 1 Unidad y Promo 3 Unidades */}
          <div className="space-y-2">
            {/* Opción 1: 1 Unidad */}
            <button
              type="button"
              onClick={() => setSelectedPack('single')}
              className={`w-full text-left p-3 rounded-xl border-2 transition-all flex items-center justify-between gap-3 ${
                selectedPack === 'single'
                  ? 'border-emerald-600 bg-white ring-2 ring-emerald-500/20 shadow-xs'
                  : 'border-slate-200 bg-white/70 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                    selectedPack === 'single'
                      ? 'border-emerald-600 bg-emerald-600'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  {selectedPack === 'single' && (
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </div>
                <div className="truncate">
                  <span className="text-xs font-bold text-slate-900 block leading-tight">
                    1 Unidad (1 Frasco)
                  </span>
                  <span className="text-[11px] text-slate-500 block">
                    100 cápsulas de 500mg
                  </span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="flex items-baseline justify-end gap-1.5">
                  <span className="text-xl font-black text-slate-900 font-mono tabular-nums whitespace-nowrap">
                    {isPEN ? formatPrice(product.pricePEN, 'S/') : `$${product.priceUSD.toFixed(2)}`}
                  </span>
                  <span className="text-xs text-slate-400 line-through font-mono tabular-nums whitespace-nowrap">
                    {isPEN ? formatPrice(product.originalPricePEN, 'S/') : `$${product.originalPriceUSD.toFixed(2)}`}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-medium block">
                  Precio individual
                </span>
              </div>
            </button>

            {/* Opción 2: Promo 3 x S/99.90 */}
            <button
              type="button"
              onClick={() => setSelectedPack('pack3')}
              className={`w-full text-left p-3 rounded-xl border-2 transition-all flex items-center justify-between gap-3 relative ${
                selectedPack === 'pack3'
                  ? 'border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-500/20 shadow-xs'
                  : 'border-slate-200 bg-white/70 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                    selectedPack === 'pack3'
                      ? 'border-emerald-600 bg-emerald-600'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  {selectedPack === 'pack3' && (
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </div>
                <div className="truncate">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900 block leading-tight">
                      Promo Pack 3 Unidades
                    </span>
                    <span className="px-1.5 py-0.2 rounded bg-amber-500 text-white text-[9px] font-extrabold uppercase shrink-0">
                      Ahorro
                    </span>
                  </div>
                  <span className="text-[11px] text-emerald-700 font-semibold block">
                    {isPEN ? 'S/33.30 c/u (3 frascos)' : '3 frascos importados'}
                  </span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="flex items-baseline justify-end gap-1.5">
                  <span className="text-xl font-black text-emerald-700 font-mono tabular-nums whitespace-nowrap">
                    {isPEN ? '3 x S/99.90' : '3 x $28.50'}
                  </span>
                </div>
                <span className="text-[10px] text-emerald-800 font-bold block">
                  {isPEN ? '¡Ahorras S/19.80!' : 'Mayor ahorro'}
                </span>
              </div>
            </button>
          </div>

          {/* Full-width Mobile Touch Buttons without 'En Stock' in WhatsApp button */}
          <div className="pt-1">
            <a
              href={createProductInquiryWhatsApp(product, currency, selectedPack)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[50px] inline-flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] rounded-xl shadow-md transition-all"
            >
              <MessageCircle className="w-5 h-5 fill-current shrink-0" />
              <span>Pedir por WhatsApp</span>
            </a>
          </div>

          {/* Shalom Shipping Exclusive Notice */}
          <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-600">
            <div className="flex items-center gap-1.5 font-medium">
              <Truck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>Envíos a provincias únicamente vía <strong>Shalom</strong></span>
            </div>
            <button
              onClick={() => onSelectProduct(product)}
              className="text-blue-600 font-bold hover:underline"
            >
              Ficha
            </button>
          </div>
        </div>

        {/* 5. 8 Beneficios Comprobados (Mobile Cards) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
            <h2 className="text-sm font-bold text-slate-900 font-display">
              8 Beneficios Comprobados:
            </h2>
          </div>

          <div className="space-y-1.5">
            {product.features.map((feat, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200/70 text-xs"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="font-semibold text-slate-800 leading-tight">
                  {feat}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Imagen Infográfica de Beneficios Clave del Magnesio */}
        <div className="rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm bg-white">
          <img
            src={BENEFITS_POSTER_IMAGE_PATH}
            alt="Beneficios Clave - Complejo de Magnesio Premium Toplux"
            className="w-full h-auto object-contain block"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* 6. Ficha Técnica Table */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-2.5">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <PackageCheck className="w-4 h-4 text-blue-600 shrink-0" />
            <h2 className="text-sm font-bold text-slate-900 font-display">
              Ficha Técnica:
            </h2>
          </div>

          <div className="rounded-xl border border-slate-200 overflow-hidden text-xs">
            <table className="w-full text-left">
              <tbody>
                {Object.entries(product.specs).map(([key, val], idx) => (
                  <tr key={key} className={idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                    <th className="py-2 px-3 text-slate-500 font-medium border-b border-slate-200 w-2/5">
                      {key}
                    </th>
                    <td className="py-2 px-3 text-slate-900 font-bold border-b border-slate-200">
                      {val}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
