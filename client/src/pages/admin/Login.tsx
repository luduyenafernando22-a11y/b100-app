// B-100 · Editorial Quiet Luxury: entrada administrativa discreta e clara.
import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Crown } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    if (!supabase) {
      setError('Configura VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY para ativar o acesso.');
      return;
    }
    setLoading(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (signInError) {
      setError('Não foi possível validar estas credenciais.');
      return;
    }
    navigate('/admin');
  }

  return (
    <main className="min-h-screen bg-[#2b211d] px-6 py-12 text-[#f7f2ea]">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-5xl items-center justify-center">
        <div className="grid w-full overflow-hidden border border-[#f7f2ea]/15 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="hidden border-r border-[#f7f2ea]/15 bg-[#30241f] p-10 text-[#f7f2ea] lg:block">
            <Crown size={40} strokeWidth={1.2} />
            <p className="mt-24 max-w-[14rem] font-serif text-4xl leading-[0.98]">Uma boa seleção começa nos bastidores.</p>
            <p className="mt-6 max-w-[16rem] font-sans text-sm leading-6 text-[#f7f2ea]/55">Importa, valida e publica apenas o que merece entrar na vitrine.</p>
          </div>
          <form onSubmit={handleSubmit} className="bg-[#382b25] p-8 sm:p-12">
            <Link to="/" className="mb-14 inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-[0.18em] text-[#f7f2ea]/60 transition hover:text-[#d4af37]"><ArrowLeft size={14} /> Voltar à vitrine</Link>
            <p className="font-sans text-[0.68rem] font-bold uppercase tracking-[0.26em] text-[#d4af37]">B-100 / operações</p>
            <h1 className="mt-4 font-serif text-4xl">Acesso de curadoria</h1>
            <p className="mt-3 max-w-sm font-sans text-sm leading-6 text-[#f7f2ea]/60">Área reservada para importar e rever produtos do programa de afiliados.</p>
            <div className="mt-10 space-y-5">
              <label className="block font-sans text-xs font-bold uppercase tracking-[0.14em] text-[#f7f2ea]/70">Email<input className="mt-2 w-full border border-[#f7f2ea]/20 bg-transparent px-4 py-3 font-sans text-sm outline-none transition placeholder:text-[#f7f2ea]/30 focus:border-[#d4af37]" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
              <label className="block font-sans text-xs font-bold uppercase tracking-[0.14em] text-[#f7f2ea]/70">Palavra-passe<input className="mt-2 w-full border border-[#f7f2ea]/20 bg-transparent px-4 py-3 font-sans text-sm outline-none transition placeholder:text-[#f7f2ea]/30 focus:border-[#d4af37]" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
            </div>
            {error && <p className="mt-5 border-l-2 border-red-400 pl-3 font-sans text-sm text-red-200">{error}</p>}
            <button type="submit" disabled={loading} className="mt-8 w-full bg-[#d4af37] px-5 py-3 font-sans text-xs font-bold uppercase tracking-[0.18em] text-[#2b211d] transition hover:bg-[#ecd788] disabled:cursor-wait disabled:opacity-50">{loading ? 'A validar…' : 'Entrar na área admin'}</button>
          </form>
        </div>
      </div>
    </main>
  );
}
