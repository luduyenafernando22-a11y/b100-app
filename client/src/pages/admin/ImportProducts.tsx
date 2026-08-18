// B-100 · Editorial Quiet Luxury: operação densa, legível e sem surpresas.
import { useMemo, useState } from 'react';
import { ArrowLeft, Check, FileSpreadsheet, LogOut, Upload, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { parseAliExpressRows, readAliExpressFile, summarize, type ParsedProduct } from '../../lib/aliexpressImport';

const CATEGORIES = ['Skincare', 'Cabelo', 'Maquiagem', 'Unhas', 'Ferramentas', 'Perfumaria', 'Corpo & Banho', 'Geral'];

export default function ImportProducts() {
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [file, setFile] = useState<File | null>(null);
  const [products, setProducts] = useState<ParsedProduct[]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const summary = useMemo(() => summarize(products), [products]);

  async function handleAnalyze() {
    if (!file) return;
    setAnalyzing(true); setError(null); setResult(null);
    try {
      setProducts(parseAliExpressRows(await readAliExpressFile(file), category));
    } catch (cause) {
      console.error(cause);
      setError('Não foi possível ler o ficheiro. Confirma que é um .xls ou .xlsx exportado pelo Portal de Afiliados.');
    } finally { setAnalyzing(false); }
  }

  async function handleImport() {
    const client = supabase;
    const toUpsert = products.filter((product) => product.status !== 'invalid').map((product) => ({
      aliexpress_id: product.aliexpress_id, name: product.name, title: product.name, image_url: product.image_url,
      price: product.price, original_price: product.original_price, discount: product.discount, currency: product.currency,
      affiliate_link: product.affiliate_link, affiliate_url: product.affiliate_link, positive_feedback: product.positive_feedback,
      sales_180_days: product.sales_180_days, commission_rate: product.commission_rate, estimated_commission: product.estimated_commission,
      coupon_name: product.coupon_name, coupon_value: product.coupon_value, coupon_quantity: product.coupon_quantity,
      coupon_minimum_spend: product.coupon_minimum_spend, coupon_start_time: product.coupon_start_time, coupon_end_time: product.coupon_end_time,
      category: product.category, status: product.status, updated_at: new Date().toISOString(),
    }));
    if (!client) { setError('Configura o Supabase antes de importar produtos.'); return; }
    if (!toUpsert.length) { setError('Não existem linhas válidas para importar.'); return; }
    setImporting(true); setError(null); setResult(null);
    const { data, error: upsertError } = await client.from('products').upsert(toUpsert, { onConflict: 'aliexpress_id' }).select('id');
    setImporting(false);
    if (upsertError) { setError(`Erro ao importar: ${upsertError.message}`); return; }
    setResult(`${data?.length ?? 0} registos gravados. ${summary.published} publicados e ${summary.overLimit} acima do limite.`);
  }

  async function signOut() { if (supabase) await supabase.auth.signOut(); navigate('/'); }

  return (
    <main className="min-h-screen bg-[#f7f2ea] text-[#2b211d]">
      <header className="border-b border-[#2b211d]/10 bg-[#f7f2ea]/95 px-6 py-5 backdrop-blur sm:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4"><Link to="/" className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl bg-[#2b211d] text-[#d4af37]"><span className="font-serif text-lg">♛</span></span><span className="font-sans text-xs font-bold uppercase tracking-[0.2em]">B-100 / operações</span></Link><button onClick={signOut} className="inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-[0.16em] text-[#77675d] transition hover:text-[#2b211d]"><LogOut size={15} /> Sair</button></div>
      </header>
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-10"><div className="mb-10 flex flex-wrap items-end justify-between gap-6"><div><Link to="/" className="mb-5 inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-[0.16em] text-[#8f7a38]"><ArrowLeft size={14} /> Ver vitrine</Link><p className="font-sans text-[0.68rem] font-bold uppercase tracking-[0.26em] text-[#8f7a38]">Importador AliExpress</p><h1 className="mt-3 font-serif text-5xl leading-none sm:text-6xl">Escolher melhor.</h1></div><p className="max-w-xs font-sans text-sm leading-6 text-[#77675d]">Analisa o ficheiro exportado, revê os estados e publica apenas produtos elegíveis para a promessa B-100.</p></div>
        <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]"><section className="border border-[#2b211d]/10 bg-[#fffdf9] p-6 sm:p-8"><div className="mb-8 flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-[#f1e6cf] text-[#8f7a38]"><FileSpreadsheet size={18} /></span><div><h2 className="font-serif text-2xl">Novo lote</h2><p className="font-sans text-xs text-[#77675d]">XLS ou XLSX do Portal</p></div></div><label className="block font-sans text-xs font-bold uppercase tracking-[0.14em] text-[#77675d]">Categoria<select value={category} onChange={(event) => setCategory(event.target.value)} className="mt-2 w-full border border-[#2b211d]/15 bg-transparent px-3 py-3 font-sans text-sm outline-none focus:border-[#d4af37]">{CATEGORIES.map((item) => <option key={item}>{item}</option>)}</select></label><label className="mt-6 block border border-dashed border-[#2b211d]/20 bg-[#f7f2ea] p-5 text-center transition hover:border-[#d4af37]"><Upload className="mx-auto mb-3 text-[#8f7a38]" size={22} /><span className="block font-sans text-sm font-medium">{file ? file.name : 'Selecionar ficheiro'}</span><span className="mt-1 block font-sans text-xs text-[#77675d]">As colunas originais são preservadas</span><input type="file" accept=".xls,.xlsx" className="sr-only" onChange={(event) => setFile(event.target.files?.[0] ?? null)} /></label><button onClick={handleAnalyze} disabled={!file || analyzing} className="mt-6 w-full bg-[#2b211d] px-5 py-3 font-sans text-xs font-bold uppercase tracking-[0.18em] text-[#f7f2ea] transition hover:bg-[#4a3930] disabled:cursor-not-allowed disabled:opacity-40">{analyzing ? 'A analisar…' : 'Analisar ficheiro'}</button>{error && <p className="mt-5 border-l-2 border-red-500 pl-3 font-sans text-sm text-red-700">{error}</p>}{result && <p className="mt-5 border-l-2 border-emerald-600 pl-3 font-sans text-sm text-emerald-800">{result}</p>}</section>
          <section className="min-w-0"><div className="grid grid-cols-2 gap-px border border-[#2b211d]/10 bg-[#2b211d]/10 sm:grid-cols-4"><Stat label="Linhas" value={summary.total} /><Stat label="Publicar" value={summary.published} tone="green" /><Stat label="Acima de R$100" value={summary.overLimit} tone="gold" /><Stat label="Inválidos" value={summary.invalid} tone="red" /></div><div className="mt-6 overflow-hidden border border-[#2b211d]/10 bg-[#fffdf9]"><div className="overflow-x-auto"><table className="w-full min-w-[620px] text-left"><thead className="bg-[#2b211d] font-sans text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[#f7f2ea]"><tr><th className="px-4 py-4">Produto</th><th className="px-4 py-4">Preço</th><th className="px-4 py-4">Categoria</th><th className="px-4 py-4">Estado</th></tr></thead><tbody className="font-sans text-sm">{products.length ? products.map((product, index) => <tr key={`${product.aliexpress_id}-${index}`} className="border-t border-[#2b211d]/10"><td className="max-w-[280px] truncate px-4 py-4 font-medium">{product.name}</td><td className="px-4 py-4">{product.price !== null ? `R$ ${product.price.toFixed(2)}` : '—'}</td><td className="px-4 py-4 text-[#77675d]">{product.category}</td><td className="px-4 py-4"><Status status={product.status} /></td></tr>) : <tr><td colSpan={4} className="px-4 py-16 text-center font-sans text-sm text-[#77675d]">A análise do primeiro lote aparecerá aqui.</td></tr>}</tbody></table></div></div><button onClick={handleImport} disabled={!products.length || importing || summary.published + summary.overLimit === 0} className="mt-5 inline-flex items-center gap-2 bg-[#d4af37] px-5 py-3 font-sans text-xs font-bold uppercase tracking-[0.18em] text-[#2b211d] transition hover:bg-[#ecd788] disabled:cursor-not-allowed disabled:opacity-40">{importing ? 'A importar…' : 'Importar produtos válidos'} <Check size={15} /></button></section></div>
      </div>
    </main>
  );
}

function Stat({ label, value, tone = 'default' }: { label: string; value: number; tone?: 'default' | 'green' | 'gold' | 'red' }) { const colors = { default: 'text-[#2b211d]', green: 'text-emerald-700', gold: 'text-[#8f7a38]', red: 'text-red-700' }; return <div className="bg-[#fffdf9] p-4 sm:p-5"><p className="font-sans text-[0.62rem] font-bold uppercase tracking-[0.12em] text-[#77675d]">{label}</p><p className={`mt-2 font-serif text-3xl ${colors[tone]}`}>{value}</p></div>; }
function Status({ status }: { status: ParsedProduct['status'] }) { const map = { published: { label: 'Publicar', className: 'text-emerald-700', icon: <Check size={13} /> }, over_limit: { label: 'Acima do limite', className: 'text-[#8f7a38]', icon: <span className="text-[0.7rem]">R$</span> }, invalid: { label: 'Inválido', className: 'text-red-700', icon: <X size={13} /> } }; const item = map[status]; return <span className={`inline-flex items-center gap-1.5 font-sans text-xs font-bold ${item.className}`}>{item.icon}{item.label}</span>; }
