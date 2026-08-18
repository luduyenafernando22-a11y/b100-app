// B-100 · Editorial Quiet Luxury: saída transparente para parceiros afiliados.
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';

type RedirectProduct = { id: string | number; affiliate_url?: string | null; affiliate_link?: string | null; title?: string | null; name?: string | null };

export default function Redirect() {
  const { id } = useParams<{ id: string }>();
  const [message, setMessage] = useState('A preparar a recomendação…');

  useEffect(() => {
    let active = true;
    async function go() {
      const client = supabase;
      if (!id || !client) {
        setMessage('Este destino ainda não está configurado.');
        return;
      }
      const { data: product } = await client
        .from('products')
        .select('id, affiliate_url, affiliate_link, title, name')
        .or(`id.eq.${id},aliexpress_id.eq.${id}`)
        .maybeSingle<RedirectProduct>();

      if (!product) {
        if (active) setMessage('Não encontrámos este produto.');
        return;
      }

      await client.from('b100_clicks').insert({ product_id: product.id }).then(async ({ error }) => {
        if (error) await client.from('clicks').insert({ product_id: product.id });
      });

      const destination = product.affiliate_url ?? product.affiliate_link;
      if (destination) window.location.replace(destination);
      else if (active) setMessage('Este produto ainda não tem um destino afiliado.');
    }
    void go();
    return () => {
      active = false;
    };
  }, [id]);

  return (
    <main className="min-h-screen bg-[#f7f2ea] px-6 py-20 text-[#2b211d]">
      <div className="mx-auto max-w-xl text-center">
        <div className="mx-auto mb-8 h-12 w-12 rounded-[1.25rem] border border-[#d4af37] p-2.5">
          <div className="h-full w-full rounded-full bg-[#d4af37]" />
        </div>
        <p className="mb-3 font-sans text-[0.68rem] font-bold uppercase tracking-[0.28em] text-[#8f7a38]">B-100 / curadoria</p>
        <h1 className="font-serif text-4xl">{message}</h1>
        <Link className="mt-8 inline-block font-sans text-sm font-bold uppercase tracking-[0.16em] text-[#6c584f] underline decoration-[#d4af37] underline-offset-8" to="/">
          Voltar à seleção
        </Link>
      </div>
    </main>
  );
}
