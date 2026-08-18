// B-100 · Editorial Quiet Luxury: importação auditável e explícita, sem dados fictícios.
import * as XLSX from 'xlsx';

export type ImportStatus = 'published' | 'over_limit' | 'invalid';

export interface ParsedProduct {
  aliexpress_id: string;
  name: string;
  image_url: string;
  price: number | null;
  original_price: number | null;
  discount: string | null;
  currency: string | null;
  affiliate_link: string;
  positive_feedback: number | null;
  sales_180_days: number | null;
  commission_rate: number | null;
  estimated_commission: number | null;
  coupon_name: string | null;
  coupon_value: number | null;
  coupon_quantity: number | null;
  coupon_minimum_spend: number | null;
  coupon_start_time: string | null;
  coupon_end_time: string | null;
  category: string;
  status: ImportStatus;
  errors: string[];
}

export interface RawRow {
  [key: string]: unknown;
}

function toText(value: unknown): string | null {
  if (value === undefined || value === null) return null;
  const text = String(value).trim();
  return text.length > 0 ? text : null;
}

function toNumber(value: unknown): number | null {
  if (value === undefined || value === null || value === '') return null;
  const raw = String(value).trim().replace(/[^\d.,-]/g, '');
  const cleaned = raw.includes(',')
    ? raw.replace(/\./g, '').replace(',', '.')
    : raw;
  const number = Number.parseFloat(cleaned);
  return Number.isFinite(number) ? number : null;
}

function toInt(value: unknown): number | null {
  const number = toNumber(value);
  return number === null ? null : Math.round(number);
}

function toISODate(value: unknown): string | null {
  if (value === undefined || value === null || value === '') return null;
  const date = value instanceof Date ? value : new Date(String(value));
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

export async function readAliExpressFile(file: File): Promise<RawRow[]> {
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: 'array', cellDates: true });
  const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
  return XLSX.utils.sheet_to_json<RawRow>(firstSheet, { defval: null });
}

export function mapRowToProduct(row: RawRow, category: string): ParsedProduct {
  const errors: string[] = [];
  const aliexpress_id = toText(row.ProductId);
  const name = toText(row['Product Desc']);
  const image_url = toText(row['Image Url']);
  const affiliate_link = toText(row['Promotion Url']);
  const price = toNumber(row['Discount Price']);
  const original_price = toNumber(row['Origin Price']);
  const currency = toText(row.Currency)?.toUpperCase() ?? null;

  if (!aliexpress_id) errors.push('ProductId em falta');
  if (!affiliate_link) errors.push('Promotion Url em falta');
  if (!image_url) errors.push('Image Url em falta');
  if (price === null) errors.push('Discount Price inválido');

  let status: ImportStatus;
  if (errors.length > 0) status = 'invalid';
  else if (currency === 'BRL' && (price as number) <= 100) status = 'published';
  else if (currency === 'BRL') status = 'over_limit';
  else {
    status = 'invalid';
    errors.push(`Currency "${currency ?? '—'}" ≠ BRL`);
  }

  return {
    aliexpress_id: aliexpress_id ?? '',
    name: name ?? 'Produto sem título',
    image_url: image_url ?? '',
    price,
    original_price,
    discount: toText(row.Discount),
    currency,
    affiliate_link: affiliate_link ?? '',
    positive_feedback: toNumber(row['Positive Feedback']),
    sales_180_days: toInt(row.Sales180Day),
    commission_rate: toNumber(row['Direct linking commission rate (%)']),
    estimated_commission: toNumber(row['Estimated direct linking commission']),
    coupon_name: toText(row['Code Name']),
    coupon_value: toNumber(row['Code Value']),
    coupon_quantity: toInt(row['Code Quantity']),
    coupon_minimum_spend: toNumber(row['Code Minimum Spend']),
    coupon_start_time: toISODate(row['Code Start Time']),
    coupon_end_time: toISODate(row['Code End Time']),
    category,
    status,
    errors,
  };
}

export function parseAliExpressRows(rows: RawRow[], category: string): ParsedProduct[] {
  return rows.map((row) => mapRowToProduct(row, category));
}

export interface ImportSummary {
  total: number;
  published: number;
  overLimit: number;
  invalid: number;
}

export function summarize(products: ParsedProduct[]): ImportSummary {
  return {
    total: products.length,
    published: products.filter((product) => product.status === 'published').length,
    overLimit: products.filter((product) => product.status === 'over_limit').length,
    invalid: products.filter((product) => product.status === 'invalid').length,
  };
}
