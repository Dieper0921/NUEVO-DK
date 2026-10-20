import { CartItem, Currency, Product } from '../types';

export const WHATSAPP_PHONE = '51975190577';
export const WHATSAPP_DISPLAY = '+51 975 190 577';

export function getWhatsAppBaseUrl(): string {
  return `https://wa.me/${WHATSAPP_PHONE}`;
}

export function createGeneralWhatsAppLink(text?: string): string {
  const defaultText = 'Hola DK Importaciones, deseo comprar el MAGNESIUM COMPLEX 1000 MG TOPLUX';
  const message = text || defaultText;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

export function createProductInquiryWhatsApp(
  _product?: Product,
  _currency?: Currency,
  pack: 'single' | 'pack3' = 'single'
): string {
  const baseText = 'Hola DK Importaciones, deseo comprar el MAGNESIUM COMPLEX 1000 MG TOPLUX';
  const text = pack === 'pack3' ? `${baseText} (Promo 3 x S/99.90)` : baseText;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
}

export function createCartOrderWhatsApp(
  items: CartItem[],
  customerName: string,
  city: string,
  currency: Currency
): string {
  const isPEN = currency === 'PEN';
  let total = 0;

  const itemsList = items
    .map((item, idx) => {
      const unitPrice = isPEN ? item.product.pricePEN : item.product.priceUSD;
      const sub = unitPrice * item.quantity;
      total += sub;
      const currencySymbol = isPEN ? 'S/' : '$';
      return `${idx + 1}. *${item.product.name}* (x${item.quantity}) - ${currencySymbol} ${sub.toFixed(2)}`;
    })
    .join('\n');

  const totalDisplay = isPEN ? `S/ ${total.toFixed(2)}` : `$ ${total.toFixed(2)} USD`;
  const nameDisplay = customerName.trim() || 'Cliente';
  const cityDisplay = city.trim() || 'Por coordinar (Lima / Provincia)';

  const text = `¡Hola DK Importaciones! Quiero coordinar el pedido de mi carrito de compras:

👤 *Cliente:* ${nameDisplay}
📍 *Destino de envío:* ${cityDisplay}

📋 *Detalle del Pedido:*
${itemsList}

💵 *Total estimado:* ${totalDisplay}
🚚 *Envío:* Por coordinar según destino (Envíos a provincia únicamente vía Shalom / Motorizado en Lima)

Por favor, confírmenme la disponibilidad y los métodos de pago (Yape, Plin, Transferencia o Contraentrega). ¡Gracias!`;

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
}

export function createCustomImportWhatsApp(
  productName: string,
  urlOrRef: string,
  budgetEstimate: string,
  notes: string
): string {
  const text = `¡Hola DK Importaciones! Deseo cotizar un servicio de importación a pedido desde el extranjero:

🔎 *Artículo o Modelo:* ${productName}
🔗 *Enlace de referencia:* ${urlOrRef || 'No especificado (apoyar con búsqueda)'}
💵 *Presupuesto estimado:* ${budgetEstimate || 'A cotizar'}
📝 *Detalles adicionales:* ${notes || 'Sin observaciones'}

¿Podrían indicarme el costo total puesto en Perú y el tiempo estimado de entrega? ¡Gracias!`;

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
}
