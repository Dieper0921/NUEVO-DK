import React, { useState } from 'react';
import { Product, Currency } from '../types';
import { X, MessageCircle, ShieldCheck, Truck, Globe, CheckCircle2, Flame } from 'lucide-react';
import { createProductInquiryWhatsApp } from '../utils/whatsapp';
import { CountdownTimer } from './CountdownTimer';
import { BENEFITS_POSTER_IMAGE_PATH } from '../data/products';

interface ProductModalProps {
  product: Product | null;
  currency: Currency;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  currency,
  isOpen,
  onClose
}) => {
  if (!isOpen || !product) return null;

  const isPEN = currency === 'PEN';
  const [selectedPack, setSelectedPack] = useState<'single' | 'pack3'>('single');
  const formatPrice = (amount: number, symbol: string) => {
    return amount % 1 === 0 ? `${symbol}${amount}` : `${symbol}${amount.toFixed(2)}`;
  };
  const priceDisplay = isPEN ? formatPrice(product.pricePEN, 'S/') : `$${product.priceUSD.toFixed(2)} USD`;
  const originalDisplay = isPEN ? formatPrice(product.originalPricePEN, 'S/') : `$${product.originalPriceUSD.toFixed(2)} USD`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-neutral-950/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden z-10 my-8">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="text-blue-600 font-bold">{product.categoryLabel}</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="font-mono text-slate-700">SKU: {product.sku}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
            aria-label="Cerrar ventana"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Image Showcase */}
            <div className="space-y-3">
              <div className="relative aspect-[3/4] sm:aspect-square rounded-xl overflow-hidden bg-slate-950 border border-slate-200 flex items-center justify-center p-2">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 flex items-center gap-2 flex-wrap">
                  {product.badge && (
                    <span className="px-3 py-1 rounded-md bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md flex items-center gap-1 border border-amber-300">
                      <Flame className="w-3.5 h-3.5 fill-current text-slate-950" />
                      <span>{product.badge}</span>
                    </span>
                  )}
                  <span className="px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-sm text-xs font-semibold text-blue-700 border border-slate-200 shadow-xs">
                    {product.stockLabel}
                  </span>
                </div>
              </div>

              {/* Guarantees Box */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2 text-slate-600">
                <div className="flex items-center gap-2 text-emerald-700 font-medium">
                  <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>Garantía Oficial de {product.warrantyMonths} meses con DK Importaciones</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Envíos a Lima (24h) y Provincias únicamente vía Shalom</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-500 shrink-0" />
                  <span>Origen: {product.originCountry} (100% Original Sellado)</span>
                </div>
              </div>
            </div>

            {/* Product Details & Actions */}
            <div className="space-y-5">
              <div>
                {product.badge && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider mb-2.5 shadow-xs border border-amber-300">
                    <Flame className="w-3.5 h-3.5 fill-current text-slate-950" />
                    <span>{product.badge}</span>
                  </div>
                )}
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                  {product.name}
                </h2>
                {/* 15-Minute Countdown Timer */}
                <div className="my-3">
                  <CountdownTimer durationMinutes={15} />
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Precio especial de oferta:
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 font-extrabold text-[11px] border border-rose-200">
                    -33% DSCTO
                  </span>
                </div>

                {/* Opciones organizadas en Modal */}
                <div className="space-y-2 mb-3">
                  {/* Opción 1: 1 Unidad */}
                  <button
                    type="button"
                    onClick={() => setSelectedPack('single')}
                    className={`w-full text-left p-3 rounded-xl border-2 transition-all flex items-center justify-between gap-3 ${
                      selectedPack === 'single'
                        ? 'border-emerald-600 bg-white ring-2 ring-emerald-500/20 shadow-xs'
                        : 'border-slate-200 bg-slate-50/70 hover:border-slate-300'
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
                        <span className="text-lg font-black text-slate-900 font-mono tabular-nums whitespace-nowrap">
                          {priceDisplay}
                        </span>
                        <span className="text-xs text-slate-400 line-through font-mono tabular-nums whitespace-nowrap">
                          {originalDisplay}
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
                        : 'border-slate-200 bg-slate-50/70 hover:border-slate-300'
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
                        <span className="text-lg font-black text-emerald-700 font-mono tabular-nums whitespace-nowrap">
                          {isPEN ? '3 x S/99.90' : '3 x $28.50'}
                        </span>
                      </div>
                      <span className="text-[10px] text-emerald-800 font-bold block">
                        {isPEN ? '¡Ahorras S/19.80!' : 'Mayor ahorro'}
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-sm text-slate-700 leading-relaxed font-normal">
                  {product.shortDescription}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <a
                  href={createProductInquiryWhatsApp(product, currency, selectedPack)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition-colors"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>Pedir por WhatsApp</span>
                </a>
              </div>

              {/* Highlights */}
              <div className="pt-4 border-t border-slate-200 space-y-2.5">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center justify-between">
                  <span>Beneficios y Características</span>
                  <span className="text-blue-600 text-[11px] font-semibold">{product.features.length} puntos clave</span>
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200/80">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <span className="font-medium text-slate-800">{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Infografía de Beneficios Clave */}
                <div className="mt-3 rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-white">
                  <img
                    src={BENEFITS_POSTER_IMAGE_PATH}
                    alt="Infografía Beneficios Clave Magnesio"
                    className="w-full h-auto object-contain block"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Technical Specs Table */}
          <div className="pt-6 border-t border-slate-200 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Ficha Técnica y Especificaciones
            </h4>
            <div className="rounded-xl border border-slate-200 overflow-hidden">
              <table className="w-full text-xs text-left">
                <tbody>
                  {Object.entries(product.specs).map(([specKey, specVal], index) => (
                    <tr
                      key={specKey}
                      className={index % 2 === 0 ? 'bg-slate-50' : 'bg-white'}
                    >
                      <th className="py-2.5 px-4 font-semibold text-slate-500 w-1/3 border-b border-slate-200">
                        {specKey}
                      </th>
                      <td className="py-2.5 px-4 text-slate-800 border-b border-slate-200">
                        {specVal}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
