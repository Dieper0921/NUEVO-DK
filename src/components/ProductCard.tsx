import React from 'react';
import { Product, Currency } from '../types';
import { MessageCircle, Plus, Eye, Check, Flame } from 'lucide-react';
import { createProductInquiryWhatsApp } from '../utils/whatsapp';

interface ProductCardProps {
  product: Product;
  currency: Currency;
  onAddToCart: (product: Product) => void;
  onOpenDetails: (product: Product) => void;
  isAdded?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  onAddToCart,
  onOpenDetails,
  isAdded
}) => {
  const isPEN = currency === 'PEN';
  const formatPrice = (amount: number, symbol: string) => {
    return amount % 1 === 0 ? `${symbol} ${amount}` : `${symbol} ${amount.toFixed(2)}`;
  };

  const currentPrice = isPEN ? formatPrice(product.pricePEN, 'S/') : formatPrice(product.priceUSD, '$');
  const originalPrice = isPEN ? formatPrice(product.originalPricePEN, 'S/') : formatPrice(product.originalPriceUSD, '$');
  const discountPercent = Math.round(
    ((product.originalPricePEN - product.pricePEN) / product.originalPricePEN) * 100
  );

  return (
    <article className="group flex flex-col bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-blue-400 hover:shadow-lg transition-all duration-200">
      {/* Product Image Slot */}
      <div 
        onClick={() => onOpenDetails(product)}
        className={`relative aspect-[4/3] overflow-hidden cursor-pointer flex items-center justify-center ${
          product.imageFit === 'contain' ? 'bg-slate-950 p-1.5' : 'bg-slate-100'
        }`}
      >
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full transition-transform duration-300 group-hover:scale-105 ${
            product.imageFit === 'contain' ? 'object-contain' : 'object-cover'
          }`}
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.target as HTMLElement;
            target.style.display = 'none';
          }}
        />

        {/* Fallback pattern if image is hidden */}
        <div className="absolute inset-0 bg-slate-100 flex flex-col items-center justify-center p-4 text-center -z-10 pointer-events-none">
          <span className="text-blue-600 font-bold text-lg mb-1">DK Importaciones</span>
          <span className="text-slate-500 text-xs">{product.name}</span>
        </div>

        {/* Status & discount tag */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[11px] pointer-events-none gap-1.5 z-10">
          <div className="flex items-center gap-1.5 flex-wrap">
            {product.badge ? (
              <span className="px-2.5 py-1 rounded-md bg-amber-400 text-slate-950 font-black uppercase tracking-wide shadow-md flex items-center gap-1 border border-amber-300">
                <Flame className="w-3.5 h-3.5 fill-current text-slate-950" />
                <span>{product.badge}</span>
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-sm text-blue-700 font-semibold border border-slate-200 shadow-xs">
                {product.stockLabel}
              </span>
            )}
          </div>
          {discountPercent > 0 && (
            <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 font-bold border border-rose-200">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Hover Quick View Trigger */}
        <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-slate-900 text-xs font-bold shadow-md">
            <Eye className="w-3.5 h-3.5 text-blue-600" />
            <span>Ver Especificaciones</span>
          </span>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="flex-1 p-5 flex flex-col justify-between space-y-4">
        <div>
          {/* Metadata Row: Category & Origin */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5">
            <span className="text-blue-600 font-bold">{product.categoryLabel}</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>{product.originCountry}</span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onOpenDetails(product)}
            className="text-base font-bold text-slate-900 hover:text-blue-600 cursor-pointer transition-colors leading-snug line-clamp-2"
          >
            {product.name}
          </h3>

          <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Key Bullet Features Preview */}
          {product.features && product.features.length > 0 && (
            <ul className="mt-3 space-y-1 pt-2 border-t border-slate-100">
              {product.features.slice(0, 3).map((feat, idx) => (
                <li key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                  <span className="truncate">{feat}</span>
                </li>
              ))}
              {product.features.length > 3 && (
                <li className="text-[10px] text-blue-600 font-semibold pl-3">
                  +{product.features.length - 3} beneficios más...
                </li>
              )}
            </ul>
          )}
        </div>

        {/* Price & Action Area */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-baseline justify-between mb-3.5">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-slate-900 font-mono tabular-nums">
                {currentPrice}
              </span>
              <span className="text-xs text-slate-400 line-through font-mono tabular-nums">
                {originalPrice}
              </span>
            </div>
            <span className="text-[11px] text-blue-600 font-semibold">Garantía 12m</span>
          </div>

          {/* Action Buttons: WhatsApp Inquiry + Add to Cart */}
          <div className="grid grid-cols-2 gap-2">
            <a
              href={createProductInquiryWhatsApp(product, currency)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg transition-colors whitespace-nowrap shrink-0"
              title="Consultar disponibilidad por WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={() => onAddToCart(product)}
              className={`inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                isAdded
                  ? 'bg-slate-900 text-white font-bold'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Añadido</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Añadir</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
