// ─── Field config ────────────────────────────────────────────────────────────

const BULLET_FIELDS = [
  'HAM_Bullet1', 'HAM_Bullet2', 'HAM_Bullet3', 'HAM_Bullet4', 'HAM_Bullet5',
  'HAM_Bullet6', 'HAM_Bullet7', 'HAM_Bullet8', 'HAM_Bullet9', 'HAM_Bullet10',
  'HAM_FamilyCode_Bullet1', 'HAM_FamilyCode_Bullet2', 'HAM_FamilyCode_Bullet3',
  'HAM_ProductCode_Bullet1', 'HAM_ProductCode_Bullet2',
  'HAM_TechnicalInsert_Bullet1', 'HAM_TechnicalInsert_Bullet2', 'HAM_TechnicalInsert_Bullet3',
  'HAM_PlateRange_Bullet1', 'HAM_PlateRange_Bullet2',
];

const IMAGE_BASES = {
  Wiring_Image:    'https://hamiltonng15.s3.eu-west-2.amazonaws.com/wiring_images/',
  Item_Image:      'https://hamiltonng15.s3.eu-west-2.amazonaws.com/item_images/',
  Dimension_Image: 'https://hamiltonng15.s3.eu-west-2.amazonaws.com/dimension_images/',
};

// WooCommerce output columns (in order)
export const WC_COLUMNS = [
  'ID', 'Type', 'SKU', 'GTIN, UPC, EAN, or ISBN', 'Name', 'Published',
  'Is featured?', 'Visibility in catalogue', 'Short description', 'Description',
  'Date sale price starts', 'Date sale price ends', 'Tax status', 'Tax class',
  'In stock?', 'Stock', 'Low stock amount', 'Backorders allowed?', 'Sold individually?',
  'Weight (kg)', 'Length (cm)', 'Width (cm)', 'Height (cm)',
  'Allow customer reviews?', 'Purchase note', 'Sale price', 'Regular price',
  'Categories', 'Tags', 'Shipping class', 'Images',
  'Download limit', 'Download expiry days', 'Parent',
  'Grouped products', 'Upsells', 'Cross-sells',
  'External URL', 'Button text', 'Position',
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function get(row, field) {
  return (row[field] ?? '').trim();
}

function buildShortDescription(row) {
  const bullets = BULLET_FIELDS
    .map(f => get(row, f))
    .filter(Boolean);

  let html = '';

  if (bullets.length > 0) {
    html += `<ul>${bullets.map(b => `<li>${b}</li>`).join('')}</ul>`;
  }

  const notes = get(row, 'Additional_Notes');
  if (notes) html += `<p>${notes}</p>`;

  const qr = get(row, 'QR_Instruction');
  if (qr) {
    html += `<a href="${qr}" class="button" target="_blank" rel="noopener noreferrer">View Instructions</a>`;
  }

  return html;
}

function buildImages(row) {
  return ['Wiring_Image', 'Item_Image', 'Dimension_Image']
    .map(field => {
      const filename = get(row, field);
      return filename ? IMAGE_BASES[field] + filename : '';
    })
    .filter(Boolean)
    .join(',');
}

function buildWeight(row) {
  const grams = parseFloat(get(row, 'unit_weight'));
  return isNaN(grams) ? '' : (grams / 1000).toFixed(4);
}

// ─── Row converter ────────────────────────────────────────────────────────────

export function convertRow(row) {
  const sub1 = get(row, 'Subheader1');
  const sub2 = get(row, 'Subheader2');

  return {
    'ID':                       '',
    'Type':                     'simple',
    'SKU':                      get(row, 'Part_No').replace(/-/g, ''),
    'GTIN, UPC, EAN, or ISBN':  '',
    'Name':                     get(row, 'InsertType'),
    'Published':                '1',
    'Is featured?':             '0',
    'Visibility in catalogue':  'visible',
    'Short description':        buildShortDescription(row),
    'Description':              get(row, 'Item_Long_Description'),
    'Date sale price starts':   '',
    'Date sale price ends':     '',
    'Tax status':               'taxable',
    'Tax class':                '',
    'In stock?':                '1',
    'Stock':                    '',
    'Low stock amount':         '',
    'Backorders allowed?':      '0',
    'Sold individually?':       '0',
    'Weight (kg)':              buildWeight(row),
    'Length (cm)':              '',
    'Width (cm)':               '',
    'Height (cm)':              '',
    'Allow customer reviews?':  '1',
    'Purchase note':            '',
    'Sale price':               '',
    'Regular price':            get(row, 'Trade_Price'),
    'Categories':               sub1 && sub2 ? `${sub1} > ${sub2}` : sub1,
    'Tags':                     '',
    'Shipping class':           '',
    'Images':                   buildImages(row),
    'Download limit':           '',
    'Download expiry days':     '',
    'Parent':                   '',
    'Grouped products':         '',
    'Upsells':                  '',
    'Cross-sells':              '',
    'External URL':             '',
    'Button text':              '',
    'Position':                 '',
  };
}

// ─── Batch converter ──────────────────────────────────────────────────────────

export function convertAll(rows) {
  const results  = [];
  const warnings = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const partNo = get(row, 'Part_No');

    if (!partNo) {
      warnings.push({ row: i + 2, message: 'No Part_No — row skipped' });
      continue;
    }

    const out = convertRow(row);

    if (!out['Regular price']) {
      warnings.push({ row: i + 2, sku: out.SKU, message: 'No Trade_Price' });
    }
    if (!out['Images']) {
      warnings.push({ row: i + 2, sku: out.SKU, message: 'No images' });
    }

    results.push(out);
  }

  return { results, warnings };
}
