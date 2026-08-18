// B-100 · Editorial Quiet Luxury: autorização explícita para a área de operações.
import { supabase } from './supabase';

export async function getIsAdmin(): Promise<boolean> {
  if (!supabase) return false;
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) return false;

  const { data, error } = await supabase
    .from('admins')
    .select('user_id')
    .eq('user_id', session.user.id)
    .maybeSingle();

  if (error) {
    console.error('Erro ao verificar administrador:', error.message);
    return false;
  }
  return data !== null;
}
