import React, { useState } from 'react';
import { CartItem, Currency } from '../types';
import { X, Trash2, Plus, Minus, MessageCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import { createCartOrderWhatsApp, WHATSAPP_DISPLAY } from '../utils/whatsapp';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: Currency;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [customerName, setCustomerName] = useState('');
  const [city, setCity] = useState('Lima');

  if (!isOpen) return null;

  const isPEN = currency === 'PEN';
  const totalAmount = items.reduce((acc, item) => {
    const price = isPEN ? item.product.pricePEN : item.product.priceUSD;
    return acc + price * item.quantity;
  }, 0);

  const formattedTotal = isPEN
    ? `S/ ${totalAmount.toFixed(2)}`
    : `$ ${totalAmount.toFixed(2)} USD`;

  const handleWhatsAppOrder = () => {
    if (items.length === 0) return;
    const link = createCartOrderWhatsApp(items, customerName, city, currency);
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-slate-200 text-slate-900 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-blue-600" />
              <h2 className="text-base font-bold text-slate-900 font-display">
                Carrito de Compras ({items.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 text-slate-500">
                <div className="w-16 h-16 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
                  <ShoppingBag className="w-8 h-8 text-blue-500/50" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Tu carrito está vacío</h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs">
                    Explora nuestros productos importados de USA y Asia y agrégalos con un solo click.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-xs"
                >
                  Ver Catálogo
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((item) => {
                  const unitPrice = isPEN ? item.product.pricePEN : item.product.priceUSD;
                  const itemSubtotal = unitPrice * item.quantity;
                  const unitDisplay = isPEN ? `S/ ${unitPrice}` : `$ ${unitPrice}`;
                  const subDisplay = isPEN ? `S/ ${itemSubtotal.toFixed(2)}` : `$ ${itemSubtotal.toFixed(2)}`;

                  return (
                    <div
                      key={item.product.id}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex gap-3.5 items-center"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 rounded-lg object-cover bg-white border border-slate-200 shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-slate-900 truncate">
                          {item.product.name}
                        </h4>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {unitDisplay} c/u
                        </div>

                        {/* Quantity Stepper */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 rounded bg-slate-200 hover:bg-slate-300 text-slate-700"
                            title="Disminuir"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-mono font-bold px-1 tabular-nums text-slate-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 rounded bg-slate-200 hover:bg-slate-300 text-slate-700"
                            title="Aumentar"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col items-end justify-between h-16 py-0.5 shrink-0">
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                          title="Eliminar del carrito"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold font-mono text-slate-900 tabular-nums">
                          {subDisplay}
                        </span>
                      </div>
                    </div>
                  );
                })}

                <button
                  onClick={onClearCart}
                  className="text-[11px] text-slate-500 hover:text-rose-600 transition-colors underline pt-1 block ml-auto"
                >
                  Vaciar carrito
                </button>
              </div>
            )}
          </div>

          {/* Checkout Area with WhatsApp Action */}
          {items.length > 0 && (
            <div className="p-6 border-t border-slate-200 bg-slate-50 space-y-4">
              {/* Optional Client Details for WhatsApp message */}
              <div className="space-y-2">
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  Tus Datos para el Envío (Opcional):
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Tu Nombre"
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600"
                  />
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Ciudad (Ej. Lima, Arequipa)"
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              {/* Total Summary */}
              <div className="pt-2 border-t border-slate-200 flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-slate-500">Total a pagar:</span>
                  <div className="text-xl font-bold font-mono text-slate-900 tabular-nums">
                    {formattedTotal}
                  </div>
                </div>
                <div className="text-right text-[11px] text-emerald-600 font-semibold">
                  Envíos a todo el Perú
                </div>
              </div>

              {/* Primary WhatsApp Order CTA */}
              <button
                onClick={handleWhatsAppOrder}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition-colors"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Completar Pedido por WhatsApp</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <p className="text-[11px] text-slate-500 text-center leading-relaxed">
                Al hacer click se abrirá WhatsApp con el número oficial <strong className="text-slate-800">{WHATSAPP_DISPLAY}</strong> y la lista de tus productos lista para confirmar con un asesor.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
