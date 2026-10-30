export interface ServiceItem {
  id: 'deck-dropping' | 'roof-traces' | 'painting' | 'wall-skimming';
  name: string;
  ratePerM2: number;
  tagline: string;
  description: string;
}

export const VERIFIED_SERVICES: ServiceItem[] = [
  {
    id: 'deck-dropping',
    name: 'Deck Dropping',
    ratePerM2: 8,
    tagline: 'Concrete deck drops & bulkheads',
    description: 'Suspended drop ceilings beneath concrete slabs, stepped bulkheads & ambient LED light troughs.',
  },
  {
    id: 'roof-traces',
    name: 'Roof Traces',
    ratePerM2: 5,
    tagline: 'Trusses brandering & framework',
    description: 'Timber trusses / brandering framing, laser-leveled grid hanging & RhinoBoard drywall installation.',
  },
  {
    id: 'wall-skimming',
    name: 'Wall Skimming',
    ratePerM2: 4,
    tagline: 'Level 5 Gyproc RhinoSet',
    description: 'Monolithic skim plastering over drywall & plastered walls for zero joint flashing under raking sunlight.',
  },
  {
    id: 'painting',
    name: 'Painting',
    ratePerM2: 5,
    tagline: 'Primer & washable emulsion',
    description: 'Full architectural painting: plaster primer mist coat, premium acrylic emulsion & sharp cut lines.',
  },
];

export const SHADOWLINE_RATE_PER_METER = 6;
export const SEAN_OFFICIAL_EMAIL = 'seanceillings@gmail.com';
export const SEAN_OFFICIAL_PHONE = '+263 77 706 3455';

export interface CalculationParams {
  areaM2: number;
  selectedServiceIds: Array<'deck-dropping' | 'roof-traces' | 'painting' | 'wall-skimming'>;
  includeShadowline?: boolean;
  shadowlineMeters?: number;
}

export interface CalculationResult {
  ratePerM2: number;
  baseServiceCost: number;
  shadowlineCost: number;
  totalCostUSD: number;
  estimatedBagsRhinoSet: number;
  estimatedDays: number;
  selectedServices: Array<{ id: string; name: string; ratePerM2: number; subtotal: number }>;
}

export function calculateQuotation(params: CalculationParams): CalculationResult {
  const area = Math.max(0, params.areaM2);
  const selectedServices = VERIFIED_SERVICES.filter((s) =>
    params.selectedServiceIds.includes(s.id)
  ).map((s) => ({
    id: s.id,
    name: s.name,
    ratePerM2: s.ratePerM2,
    subtotal: area * s.ratePerM2,
  }));

  const ratePerM2 = selectedServices.reduce((sum, s) => sum + s.ratePerM2, 0);
  const baseServiceCost = area * ratePerM2;
  const shadowlineCost = params.includeShadowline ? (params.shadowlineMeters || 0) * SHADOWLINE_RATE_PER_METER : 0;
  const totalCostUSD = baseServiceCost + shadowlineCost;

  const hasWallSkimming = params.selectedServiceIds.includes('wall-skimming');
  const estimatedBagsRhinoSet = Math.ceil(area * (hasWallSkimming ? 0.28 : 0.12));

  const hasDeckDropping = params.selectedServiceIds.includes('deck-dropping');
  const estimatedDays = Math.max(
    2,
    Math.ceil(area / 35) + (hasDeckDropping ? 1 : 0) + (params.includeShadowline ? 1 : 0)
  );

  return {
    ratePerM2,
    baseServiceCost,
    shadowlineCost,
    totalCostUSD,
    estimatedBagsRhinoSet,
    estimatedDays,
    selectedServices,
  };
}
