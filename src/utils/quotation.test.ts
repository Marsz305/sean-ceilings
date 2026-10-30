import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateQuotation, VERIFIED_SERVICES, SHADOWLINE_RATE_PER_METER, SEAN_OFFICIAL_EMAIL } from './quotation';

test('verified rates match exact specifications', () => {
  const rates = Object.fromEntries(VERIFIED_SERVICES.map((s) => [s.id, s.ratePerM2]));
  assert.equal(rates['deck-dropping'], 8, 'Deck dropping must be $8/m²');
  assert.equal(rates['roof-traces'], 5, 'Roof traces must be $5/m²');
  assert.equal(rates['painting'], 5, 'Painting must be $5/m²');
  assert.equal(rates['wall-skimming'], 4, 'Wall skimming must be $4/m²');
  assert.equal(SHADOWLINE_RATE_PER_METER, 6, 'Shadowline must be $6/m');
  assert.equal(SEAN_OFFICIAL_EMAIL, 'seanceillings@gmail.com');
});

test('calculateQuotation calculates standard 120m2 deck package correctly', () => {
  // Deck dropping ($8) + Wall skimming ($4) + Painting ($5) = $17/m2
  // 120m2 * $17 = $2,040
  // Shadowline 40m @ $6 = $240
  // Total = $2,280
  const result = calculateQuotation({
    areaM2: 120,
    selectedServiceIds: ['deck-dropping', 'wall-skimming', 'painting'],
    includeShadowline: true,
    shadowlineMeters: 40,
  });

  assert.equal(result.ratePerM2, 17);
  assert.equal(result.baseServiceCost, 2040);
  assert.equal(result.shadowlineCost, 240);
  assert.equal(result.totalCostUSD, 2280);
});

test('calculateQuotation calculates all 4 services correctly', () => {
  // $8 + $5 + $4 + $5 = $22/m2
  // 100m2 * $22 = $2,200
  const result = calculateQuotation({
    areaM2: 100,
    selectedServiceIds: ['deck-dropping', 'roof-traces', 'wall-skimming', 'painting'],
    includeShadowline: false,
  });

  assert.equal(result.ratePerM2, 22);
  assert.equal(result.totalCostUSD, 2200);
  assert.equal(result.shadowlineCost, 0);
});
