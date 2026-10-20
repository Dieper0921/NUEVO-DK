import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductModal } from './components/ProductModal';
import { TrustSection } from './components/TrustSection';
import { ReviewsSection } from './components/ReviewsSection';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';
import { PRODUCTS } from './data/products';
import { Product, Currency } from './types';
import { Sparkles, MessageCircle } from 'lucide-react';
import { createProductInquiryWhatsApp } from './utils/whatsapp';

export default function App() {
  const [currency, setCurrency] = useState<Currency>('PEN');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const product = PRODUCTS[0];

  const handleToggleCurrency = () => {
    setCurrency((prev) => (prev === 'PEN' ? 'USD' : 'PEN'));
  };

  return (
    <div className="min-h-screen bg-slate-200/70 sm:py-6 flex justify-center text-slate-900 selection:bg-blue-600/15 selection:text-blue-900">
      
      {/* Mobile Smartphone Frame Container */}
      <div className="w-full max-w-md bg-white min-h-screen sm:rounded-3xl sm:shadow-2xl sm:border sm:border-slate-300/80 flex flex-col relative pb-20 overflow-hidden">
        
        {/* Top Slim Mobile Announcement Bar */}
        <div className="bg-slate-900 text-slate-200 text-[10px] sm:text-[11px] py-1.5 px-3 text-center flex items-center justify-center gap-1.5">
          <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
          <span className="font-medium">
            Envios a Lima en 24 horas - provincia via Shalom
          </span>
        </div>

        {/* Mobile Header Bar */}
        <Header />

        {/* Main Content Area */}
        <main className="flex-1">
          {/* Flagship Mobile Hero Showcase with Magnesium image, countdown timer & special price */}
          <Hero 
            onSelectProduct={(p) => setSelectedProduct(p)}
            currency={currency}
          />

          {/* Trust, Shipping & Guarantee Section (Mobile Format) */}
          <TrustSection />

          {/* Customer Reviews Reel (Product & Delivery) */}
          <ReviewsSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Sticky Mobile Bottom Quick Purchase Bar */}
        <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center pointer-events-none">
          <div className="w-full max-w-md bg-white/95 backdrop-blur-md border-t border-slate-200 px-3.5 py-2.5 shadow-[0_-4px_25px_rgba(0,0,0,0.12)] flex items-center justify-between gap-3 pointer-events-auto sm:rounded-b-3xl">
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold block leading-none">
                Precio Especial:
              </span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-lg font-black text-slate-900 font-mono tabular-nums leading-none whitespace-nowrap">
                  {currency === 'PEN' ? `S/${product.pricePEN.toFixed(2)}` : `$${product.priceUSD.toFixed(2)} USD`}
                </span>
                <span className="text-xs text-slate-400 line-through font-mono tabular-nums leading-none whitespace-nowrap">
                  {currency === 'PEN' ? `S/${product.originalPricePEN.toFixed(2)}` : `$${product.originalPriceUSD.toFixed(2)}`}
                </span>
              </div>
              <span className="text-[10px] text-emerald-700 font-bold block leading-none mt-1">
                {currency === 'PEN' ? 'Promo: 3 x S/99.90' : 'Promo: 3 x $28.50'}
              </span>
            </div>

            <a
              href={createProductInquiryWhatsApp(product, currency)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs rounded-xl shadow-md transition-all whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 fill-current shrink-0" />
              <span>Pedir por WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Floating WhatsApp Widget */}
        <FloatingWhatsApp />

        {/* Product Detail Modal */}
        <ProductModal
          product={selectedProduct}
          currency={currency}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      </div>
    </div>
  );
}
