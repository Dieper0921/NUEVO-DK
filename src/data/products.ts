import { Product } from '../types';

export const LOGO_IMAGE_PATH = '/assets/aistudio/336183203_947131116702319_8533049248202798377_n__4__14dd0202.jpg';
export const HERO_IMAGE_PATH = '/assets/aistudio/image_7443d5c6_4a9065a8.jpg';
export const BENEFITS_POSTER_IMAGE_PATH = '/assets/aistudio/image_57bad3e8_c5c8a83b.jpg';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-magnesium-01',
    sku: 'DK-SUP-101',
    name: 'Toplux Magnesium Complex 1000mg (8 en 1)',
    category: 'salud',
    categoryLabel: 'Salud & Suplementos',
    pricePEN: 39.90,
    priceUSD: 10.90,
    originalPricePEN: 59.90,
    originalPriceUSD: 16.50,
    image: '/assets/aistudio/image_7443d5c6_4a9065a8.jpg',
    stockStatus: 'in_stock',
    stockLabel: 'En Stock',
    badge: 'MÁS VENDIDO',
    originCountry: 'USA / Importación Original',
    shortDescription: 'El Magnesium Complex de Toplux es un suplemento dietario formulado con 8 formas diferentes de magnesio elemental para una alta absorción.',
    description: `El Magnesium Complex de Toplux es un suplemento dietario formulado con 8 formas diferentes de magnesio elemental para una alta absorción.
• Apoyo al sistema nervioso
• Relajación muscular
• Reducción de fatiga y cansancio
• Mejora del descanso y del sueño profundo
• Fortalecimiento de huesos
• Soporte a la función cardiovascular
• Alivio de calambres musculares
• Mejora de la digestión`,
    features: [
      'Apoyo al sistema nervioso',
      'Relajación muscular',
      'Reducción de fatiga y cansancio',
      'Mejora del descanso y del sueño profundo',
      'Fortalecimiento de huesos',
      'Soporte a la función cardiovascular',
      'Alivio de calambres musculares',
      'Mejora de la digestión'
    ],
    specs: {
      'Contenido': '60 cápsulas (60 Capsules)',
      'Concentración': '1000 mg Complejo de Magnesio Elemental',
      'Formas de Magnesio': '8 formas elementales de máxima absorción',
      'Fórmula': 'Non-GMO, sin gluten, de grado dietario puro',
      'Fabricante': 'Toplux Nutrition (USA)',
      'Garantía': '100% Original Sellado'
    },
    warrantyMonths: 12,
    isFeatured: true,
    imageFit: 'contain'
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'Producto Destacado' },
  { id: 'salud', label: 'Salud & Suplementos' },
] as const;

export const MAGNESIUM_BENEFITS = [
  {
    title: 'Apoyo al Sistema Nervioso',
    desc: 'Equilibrio neurológico y respuesta óptima ante situaciones de estrés cotidiano.',
    iconName: 'brain'
  },
  {
    title: 'Relajación Muscular',
    desc: 'Reduce la contracción involuntaria y la rigidez de fibras musculares.',
    iconName: 'activity'
  },
  {
    title: 'Reducción de Fatiga',
    desc: 'Mayor producción celular de ATP para combatir el cansancio físico y mental.',
    iconName: 'zap'
  },
  {
    title: 'Mejor Descanso y Sueño',
    desc: 'Facilita conciliar el sueño profundo y reparador noche tras noche.',
    iconName: 'moon'
  },
  {
    title: 'Fortalecimiento de Huesos',
    desc: 'Favorece la fijación de calcio y la densidad mineral ósea.',
    iconName: 'shield'
  },
  {
    title: 'Función Cardiovascular',
    desc: 'Mantiene el ritmo cardíaco saludable y la elasticidad de los vasos sanguíneos.',
    iconName: 'heart'
  },
  {
    title: 'Alivio de Calambres',
    desc: 'Previene espasmos musculares nocturnos y post-entrenamiento.',
    iconName: 'check'
  },
  {
    title: 'Mejora de la Digestión',
    desc: '8 formas elementales de absorción ultra eficiente sin malestar estomacal.',
    iconName: 'sparkles'
  }
];
