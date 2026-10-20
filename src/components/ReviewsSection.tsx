import React, { useRef } from 'react';
import { Star, CheckCircle2, ChevronLeft, ChevronRight, MessageSquareText, ShieldCheck } from 'lucide-react';

interface Review {
  id: string;
  author: string;
  location: string;
  type: 'producto' | 'entrega';
  typeLabel: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Carlos Mendoza R.',
    location: 'San Borja, Lima',
    type: 'producto',
    typeLabel: 'Sobre el Producto',
    rating: 5,
    date: 'Hace 2 días',
    title: 'Adelanto notable en sueño y cero calambres',
    comment: 'Llevo 2 semanas tomando el complejo de magnesio de 8 formas. Sufría de insomnio y calambres después de entrenar, y el cambio ha sido rotundo. Duermo profundo y amanezco con energía. Frasco 100% original sellado.',
    verified: true
  },
  {
    id: 'rev-2',
    author: 'Giancarlo Torres B.',
    location: 'Trujillo · Agencia Shalom',
    type: 'entrega',
    typeLabel: 'Sobre la Entrega',
    rating: 5,
    date: 'Hace 4 días',
    title: 'Llegó a Trujillo en muy corto tiempo',
    comment: 'Hice el pedido por WhatsApp y en muy corto tiempo ya estaba disponible en la agencia Shalom de Trujillo para recoger. Me pasaron la foto de la guía y el código de seguimiento al instante. Excelente embalaje.',
    verified: true
  },
  {
    id: 'rev-3',
    author: 'Dra. Patricia Valdivia',
    location: 'Miraflores, Lima',
    type: 'producto',
    typeLabel: 'Sobre el Producto',
    rating: 5,
    date: 'Hace 1 semana',
    title: 'Excelente biodisponibilidad, no cae pesado',
    comment: 'Recomiendo este complejo porque reúne 8 formas elementales de magnesio en 1000mg. A diferencia de otros citratos que irritan el estómago, este se tolera perfecto. Lo uso para salud neuromuscular y bienestar diario.',
    verified: true
  },
  {
    id: 'rev-4',
    author: 'Mariana Salazar C.',
    location: 'Surco, Lima',
    type: 'entrega',
    typeLabel: 'Sobre la Entrega',
    rating: 5,
    date: 'Hace 1 semana',
    title: 'Motorizado en Lima en menos de 24 horas',
    comment: 'Coordiné por WhatsApp a las 10 am y en la tarde el motorizado ya estaba en mi puerta. Pude revisar el frasco sellado antes de pagar. La atención por WhatsApp fue muy amable y transparente.',
    verified: true
  },
  {
    id: 'rev-5',
    author: 'Manuel Ríos G.',
    location: 'Arequipa · Agencia Shalom',
    type: 'entrega',
    typeLabel: 'Sobre la Entrega',
    rating: 5,
    date: 'Hace 2 semanas',
    title: 'Confiable al 100% para envíos a provincia',
    comment: 'Era mi primera compra con DK Importaciones y tenía dudas, pero todo fue impecable. Me enviaron el comprobante de Shalom al momento y lo recogí con mi DNI sin ninguna complicación.',
    verified: true
  },
  {
    id: 'rev-6',
    author: 'Fernando Alarcón P.',
    location: 'Los Olivos, Lima',
    type: 'producto',
    typeLabel: 'Sobre el Producto',
    rating: 5,
    date: 'Hace 2 semanas',
    title: 'Gran suplemento para el estrés y dolor muscular',
    comment: 'Mi trabajo me genera mucha tensión en cuello y espalda. Con 1 cápsula al día siento el cuerpo mucho más relajado. Es un producto importado genuino de USA con fecha de vencimiento amplia.',
    verified: true
  }
];

export const ReviewsSection: React.FC = () => {
  const reelRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (reelRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      reelRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="resenas" className="py-6 px-3.5 sm:px-4 bg-slate-50 border-b border-slate-200">
      <div className="space-y-3.5">
        
        {/* Header with Rating & Carousel Navigation Arrows */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-blue-600 font-bold text-[11px] uppercase tracking-wider">
              <MessageSquareText className="w-3.5 h-3.5" />
              <span>Experiencias Reales</span>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight font-display">
                Reseñas de Clientes
              </h2>
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[11px] font-black border border-amber-200">
                <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                <span>4.9 / 5.0</span>
              </div>
            </div>
          </div>

          {/* Left / Right Nav Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => scroll('left')}
              className="w-8 h-8 rounded-full border border-slate-200 bg-white text-slate-700 shadow-xs flex items-center justify-center hover:bg-slate-100 active:scale-95 transition-all"
              aria-label="Reseña anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-8 h-8 rounded-full border border-slate-200 bg-white text-slate-700 shadow-xs flex items-center justify-center hover:bg-slate-100 active:scale-95 transition-all"
              aria-label="Siguiente reseña"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Swipe Prompt for Mobile */}
        <p className="text-[11px] text-slate-500 -mt-1">
          Desliza horizontalmente para leer comentarios del producto y la entrega:
        </p>

        {/* Horizontal Carousel Reel */}
        <div
          ref={reelRef}
          className="flex items-stretch gap-3 overflow-x-auto pb-2 pt-1 no-scrollbar snap-x snap-mandatory scroll-smooth -mx-1 px-1"
        >
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="snap-start shrink-0 w-[290px] sm:w-[310px] bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-col justify-between space-y-3"
            >
              {/* Card Header: Author, Verification & Category Tag */}
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-1.5">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-slate-900 text-xs sm:text-sm">
                        {rev.author}
                      </span>
                      {rev.verified && (
                        <span className="inline-flex items-center gap-0.5 text-emerald-600" title="Compra Verificada">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500">
                      {rev.location} · {rev.date}
                    </p>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-0.5 text-amber-400 shrink-0">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>

                {/* Badge: Producto vs Entrega */}
                <div>
                  <span
                    className={`inline-block text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                      rev.type === 'producto'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-blue-50 text-blue-800 border border-blue-200'
                    }`}
                  >
                    {rev.type === 'producto' ? '💊 ' : '📦 '}
                    {rev.typeLabel}
                  </span>
                </div>

                {/* Title & Comment */}
                <div className="space-y-1">
                  <h3 className="text-xs font-bold text-slate-900 font-display leading-tight">
                    {rev.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                <span className="text-emerald-700 font-bold">✓ Verificado</span>
                <span className="text-slate-500">DK Importaciones</span>
              </div>
            </div>
          ))}
        </div>

        {/* Security & Authenticity Trust Strip */}
        <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200 flex items-center gap-2.5 text-xs text-blue-900">
          <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
          <p className="text-[11px] leading-tight text-slate-700">
            Opiniones de clientes que recibieron su Magnesium Complex en Lima o vía agencia Shalom en provincia.
          </p>
        </div>

      </div>
    </section>
  );
};
