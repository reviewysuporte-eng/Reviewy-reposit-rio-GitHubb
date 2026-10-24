import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://cznpemgmueycyayfcfgy.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable__-e5TTyHe3mf_C0hStNCZg_C_v2zdNy';

if (!supabaseUrl || !supabaseKey) {
  console.warn('Configurações do Supabase ausentes ou incompletas no ambiente.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// ROTA PERMANENTE — NÃO ALTERAR. QR Codes e NFC já impressos dependem dela.
export const CARD_BASE_URL = 'https://reviewy.com.br/c/';

export interface CardRecord {
  id?: string;
  seq?: number | null;
  code: string;
  product_type: 'cartao' | 'placa' | string;
  status: 'pending' | 'configured' | string;
  redirect_url: string | null;
  tap_count?: number;
  archived_at?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface CardRedirectResponse {
  exists: boolean;
  status?: 'pending' | 'configured';
  redirect_url?: string | null;
}

export interface CardStatsResponse {
  exists: boolean;
  seq?: number | null;
  code?: string;
  product_type?: string;
  status?: 'pending' | 'configured' | string;
  redirect_url?: string | null;
  tap_count?: number;
  created_at?: string;
  archived_at?: string | null;
}

export interface ConfigureCardResponse {
  success: boolean;
  error?: 'not_found' | 'already_configured' | 'invalid_url' | string;
}
