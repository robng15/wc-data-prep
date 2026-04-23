// ─── Bullet fields for Short Description ─────────────────────────────────────

const BULLET_FIELDS = [
  'HAM_Bullet1', 'HAM_Bullet2', 'HAM_Bullet3', 'HAM_Bullet4', 'HAM_Bullet5',
  'HAM_Bullet6', 'HAM_Bullet7', 'HAM_Bullet8', 'HAM_Bullet9', 'HAM_Bullet10',
  'HAM_FamilyCode_Bullet1', 'HAM_FamilyCode_Bullet2', 'HAM_FamilyCode_Bullet3',
  'HAM_ProductCode_Bullet1', 'HAM_ProductCode_Bullet2',
  'HAM_TechnicalInsert_Bullet1', 'HAM_TechnicalInsert_Bullet2', 'HAM_TechnicalInsert_Bullet3',
  'HAM_PlateRange_Bullet1', 'HAM_PlateRange_Bullet2',
];

// ─── Image URL bases ──────────────────────────────────────────────────────────

const IMAGE_BASES = {
  Wiring_Image:    'https://hamiltonng15.s3.eu-west-2.amazonaws.com/wiring_images/',
  Item_Image:      'https://hamiltonng15.s3.eu-west-2.amazonaws.com/item_images/',
  Dimension_Image: 'https://hamiltonng15.s3.eu-west-2.amazonaws.com/dimension_images/',
};

// ─── Product attributes ───────────────────────────────────────────────────────
// Each entry maps the WooCommerce attribute name to the ERP source field.

const ATTRIBUTES = [
  { name: 'description',                    field: 'description' },
  { name: 'InsertColourTitle',              field: 'InsertColourTitle' },
  { name: 'Section-Name',                   field: 'Section_Name' },
  { name: 'Insert-Type',                    field: 'InsertType' },
  { name: 'Insert-Colour',                  field: 'Insert_Finish' },
  { name: 'Uf-ItmLabelTechInsert',          field: 'Uf_ItmLabelTechInsert' },
  { name: 'Uf-HAM-Plate-Range',             field: 'Uf_HAM_Plate_Range' },
  { name: 'Uf-HAMPlate-Generic-Size',       field: 'Uf_HAMPlate_Generic_Size' },
  { name: 'Range-Name',                     field: 'Range_Name' },
  { name: 'IP-Rating',                      field: 'IP_Rating' },
  { name: 'Patents-And-Trade-Marks',        field: 'Patents_And_Trade_Marks' },
  { name: 'Item-Long-Description',          field: 'Item_Long_Description' },
  { name: 'PlateFinish',                    field: 'PlateFinish' },
  { name: 'EAN13-Barcode',                  field: 'EAN_13_Barcode' },
  { name: 'Dimensions(Nominal)',            field: 'Dimensions_Nominal' },
  { name: 'Switched-Poles',                 field: 'Switched_Poles' },
  { name: 'Contact-Gap-Minimum',            field: 'Contact_Gap_Minimum' },
  { name: 'Earth-Terminal-Capacity-1',      field: 'Earth_Terminal_Capacity_1' },
  { name: 'Earth-Terminal-Capacity-2',      field: 'Earth_Terminal_Capacity_2' },
  { name: 'Earth-Terminal-Capacity-3',      field: 'Earth_Terminal_Capacity_3' },
  { name: 'Earth-Terminal-Capacity-4',      field: 'Earth_Terminal_Capacity_4' },
  { name: 'Earth-Terminal-Capacity-5',      field: 'Earth_Terminal_Capacity_5' },
  { name: 'Product-Class-1',               field: 'Product_Class1' },
  { name: 'Ambient-Operating-Temperature',  field: 'Ambient_Operating_Temperature' },
  { name: 'Recommended-Location',           field: 'Recommended_Location' },
  { name: 'Maximum-Installation-Altitude',  field: 'Maximum_Installation_Altitude' },
  { name: 'Standard-Approval',              field: 'Standard_Approval' },
  { name: 'Commodity-Code',                 field: 'Commodity_Code' },
  { name: 'Luckins-TSI',                    field: 'Luckins_TSI' },
  { name: 'product-code',                   field: 'product_code' },
  { name: 'family-code',                    field: 'family_code' },
  { name: 'unit-weight',                    field: 'unit_weight' },
  { name: 'Weight',                         field: 'Weight' },
  { name: 'Height',                         field: 'Height' },
  { name: 'Width',                          field: 'Width' },
  { name: 'Depth',                          field: 'Depth' },
  { name: 'weight-units',                   field: 'weight_units' },
  { name: 'Uf-LuckinsEDP',                  field: 'Uf_LuckinsEDP' },
  { name: 'Uf-HAMInnerBoxQty',              field: 'Uf_HAMInnerBoxQty' },
  { name: 'Uf-OuterBoxQty',                 field: 'Uf_OuterBoxQty' },
  { name: 'Uf-ITMTechDataType',             field: 'Uf_ITMTechDataType' },
  { name: 'Generic-Size',                   field: 'Generic_Size' },
  { name: 'Box-Fixing-Hole-Centres',        field: 'Box_Fixing_Hole_Centres' },
  { name: 'Grid-Fixing-Hole-Centres',       field: 'Grid_Fixing_Hole_Centres' },
  { name: 'Fixing-Hole-Centres',            field: 'Fixing_Hole_Centres' },
  { name: 'Minimum-Wall-Box-Depth',         field: 'Minimum_Wall_Box_Depth' },
  { name: 'Uf-HAMPlateFinish',              field: 'Uf_HAMPlateFinish' },
  { name: 'Plate-Finish',                   field: 'Plate_Finish' },
  { name: 'Uf-HAMFrameFinish',              field: 'Uf_HAMFrameFinish' },
  { name: 'WEB-InsertType',                 field: 'WEB_InsertType' },
  { name: 'WEB-NumberofGangs',              field: 'WEB_NumberofGangs' },
  { name: 'MainInsertColour',               field: 'MainInsertColour' },
  { name: 'TrimColour',                     field: 'TrimColour' },
  { name: 'Last-Updated-At-Hamilton',       field: 'LastUpdated' },
  { name: 'Current-Rating',                 field: 'Current_Rating' },
  { name: 'QR-Instruction',                 field: 'QR_Instruction' },
];

// ─── WooCommerce output columns ───────────────────────────────────────────────

const BASE_COLUMNS = [
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
  'meta:part-code',
];

const ATTR_COLUMNS = ATTRIBUTES.flatMap((_, i) => [
  `Attribute ${i + 1} name`,
  `Attribute ${i + 1} value(s)`,
  `Attribute ${i + 1} visible`,
  `Attribute ${i + 1} global`,
]);

export const WC_COLUMNS = [...BASE_COLUMNS, ...ATTR_COLUMNS];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function get(row, field) {
  return (row[field] ?? '').trim();
}

function buildShortDescription(row) {
  const bullets = BULLET_FIELDS.map(f => get(row, f)).filter(Boolean);

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
  const itemUrl      = get(row, 'Item_Image')      ? IMAGE_BASES.Item_Image      + get(row, 'Item_Image')      : '';
  const lifestyleUrl = get(row, 'Lifestyle_Image');
  const dimUrl       = get(row, 'Dimension_Image') ? IMAGE_BASES.Dimension_Image + get(row, 'Dimension_Image') : '';
  const wiringUrl    = get(row, 'Wiring_Image')    ? IMAGE_BASES.Wiring_Image    + get(row, 'Wiring_Image')    : '';

  return [itemUrl, lifestyleUrl, dimUrl, wiringUrl].filter(Boolean).join(',');
}

function buildWeight(row) {
  const grams = parseFloat(get(row, 'unit_weight'));
  return isNaN(grams) ? '' : (grams / 1000).toFixed(4);
}

function buildAttributes(row) {
  const out = {};
  ATTRIBUTES.forEach(({ name, field }, i) => {
    const n = i + 1;
    out[`Attribute ${n} name`]     = name.slice(0, 28);
    out[`Attribute ${n} value(s)`] = get(row, field);
    out[`Attribute ${n} visible`]  = '1';
    out[`Attribute ${n} global`]   = '1';
  });
  return out;
}

// ─── Row converter ────────────────────────────────────────────────────────────

export function convertRow(row) {
  const sub1 = get(row, 'Subheader1');
  const sub2 = get(row, 'Subheader2');
  const sub3 = get(row, 'Subheader3');

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
    'Categories':               [sub1, sub2, sub3].filter(Boolean).join(' > '),
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
    'meta:part-code':           get(row, 'Part_No'),
    ...buildAttributes(row),
  };
}

// ─── Batch converter ──────────────────────────────────────────────────────────

export function convertAll(rows) {
  const results  = [];
  const warnings = [];

  for (let i = 0; i < rows.length; i++) {
    const row    = rows[i];
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
