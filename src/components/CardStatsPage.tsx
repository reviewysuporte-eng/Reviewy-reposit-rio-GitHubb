import React, { useEffect, useState } from 'react';
import { supabase, CardStatsResponse, CARD_BASE_URL } from '../lib/supabase';
import { ReviewyLogo } from './ReviewyLogo';
import { ReviewyStarMarker, ReviewyNfcGlyph } from './ReviewyBrandElements';
import {
  ExternalLink,
  CheckCircle2,
  Clock,
  Radio,
  Layers,
  ArrowRight,
  ShieldCheck,
  RotateCw,
  AlertCircle,
  HelpCircle,
  Sparkles
} from 'lucide-react';

interface CardStatsPageProps {
  code: string;
}

export const CardStatsPage: React.FC<CardStatsPageProps> = ({ code }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [stats, setStats] = useState<CardStatsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);

      // Chamada RPC oficial permanente no Supabase: get_card_stats com p_code
      const { data, error: rpcError } = await supabase.rpc('get_card_stats', {
        p_code: code,
      });

      if (rpcError) {
        console.error('Erro na RPC get_card_stats:', rpcError);
        setError('Não foi possível carregar as informações desta placa.');
      } else {
        setStats(data as CardStatsResponse);
      }
    } catch (err) {
      console.error('Exceção ao buscar estatísticas do cartão:', err);
      setError('Erro de conexão ao carregar os dados.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [code]);

  const isConfigured = stats?.status === 'configured';
  const tapCount = stats?.tap_count ?? 0;
  const isDisplay = stats?.product_type === 'placa';
  const productName = isDisplay ? 'Placa de Balcão Reviewy' : 'Placa Adesiva Reviewy';

  return (
    <div className="min-h-screen bg-[#071530] text-white flex flex-col selection:bg-[#29D6F0]/30 selection:text-white">
      {/* Top Header */}
      <header className="border-b border-[#1E4080] bg-[#0B1F45]/80 backdrop-blur-md sticky top-0 z-20 px-4 py-3.5 sm:px-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <a href="/" className="inline-block transition-opacity hover:opacity-90">
            <ReviewyLogo size="sm" showStars={true} withBackground={false} />
          </a>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#112A5C] text-[#29D6F0] border border-[#29D6F0]/30">
            <Radio className="w-3.5 h-3.5 animate-pulse text-[#29D6F0]" />
            <span>Painel do Estabelecimento</span>
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-4 sm:p-8">
        <div className="max-w-2xl w-full">
          {loading ? (
            <div className="bg-[#0B1F45] border-2 border-[#1E4080] rounded-3xl p-10 text-center shadow-2xl">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#112A5C] border border-[#29D6F0]/40 flex items-center justify-center mb-4">
                <RotateCw className="w-6 h-6 animate-spin text-[#29D6F0]" />
              </div>
              <h2 className="text-lg font-bold text-white">Consultando placa no banco...</h2>
              <p className="text-xs text-slate-400 mt-1">Carregando dados de acesso e redirecionamento</p>
            </div>
          ) : error || !stats || !stats.exists ? (
            <div className="bg-[#0B1F45] border-2 border-[#1E4080] rounded-3xl p-8 sm:p-10 text-center shadow-2xl">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mb-5 text-rose-400">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h1 className="text-2xl font-black font-['Poppins'] text-white">Placa Não Encontrada</h1>
              <p className="text-sm text-slate-300 mt-2 max-w-md mx-auto leading-relaxed">
                O código <span className="font-mono font-bold text-[#29D6F0] bg-[#071530] px-2 py-0.5 rounded border border-[#1E4080]">{code}</span> não foi localizado ou ainda não foi registrado no sistema.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={fetchStats}
                  className="px-5 py-2.5 rounded-xl bg-[#112A5C] hover:bg-[#1A3D7C] text-sm font-bold text-white transition-all flex items-center gap-2 border border-[#1E4080]"
                >
                  <RotateCw className="w-4 h-4" />
                  <span>Tentar novamente</span>
                </button>
                <a
                  href="/"
                  className="px-5 py-2.5 rounded-xl bg-[#29D6F0] hover:bg-[#4fe1f7] text-sm font-extrabold text-[#071530] transition-all"
                >
                  Ir para página inicial
                </a>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Card Principal de Estatísticas */}
              <div className="bg-[#0B1F45] border-2 border-[#1E4080] rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#29D6F0]/10 rounded-full blur-3xl pointer-events-none" />

                {/* Header do Card */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-400">CÓDIGO OFICIAL</span>
                      <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-[#071530] border border-[#1E4080] text-[#29D6F0]">
                        {stats.code || code}
                      </span>
                    </div>
                    <h1 className="text-2xl font-black font-['Poppins'] text-white mt-1.5 flex items-center gap-2">
                      <span>{productName}</span>
                    </h1>
                  </div>

                  {isConfigured ? (
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 self-start sm:self-auto">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Ativa & Redirecionando</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-amber-500/15 text-amber-300 border border-amber-500/30 self-start sm:self-auto">
                      <Clock className="w-4 h-4 text-amber-400" />
                      <span>Aguardando Ativação</span>
                    </span>
                  )}
                </div>

                {/* Métricas Principais */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                  {/* Contador de Toques */}
                  <div className="bg-[#071530] border border-[#1E4080] rounded-2xl p-5 relative overflow-hidden">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                      <span>TOTAL DE AVALIAÇÕES INICIADAS</span>
                      <ReviewyNfcGlyph className="w-4 h-4 text-[#29D6F0]" />
                    </div>
                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="text-4xl sm:text-5xl font-black text-white font-['Poppins'] tracking-tight">
                        {tapCount}
                      </span>
                      <span className="text-xs font-semibold text-[#29D6F0]">toques / leituras</span>
                    </div>
                    <p className="mt-2 text-[11px] text-slate-400">
                      Contabilizado a cada aproximação NFC ou escaneamento do QR Code.
                    </p>
                  </div>

                  {/* Informações da Placa */}
                  <div className="bg-[#071530] border border-[#1E4080] rounded-2xl p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                        <span>DETALHES DO PRODUTO</span>
                        <ReviewyStarMarker size="sm" color="#F4C430" />
                      </div>
                      <div className="mt-3 space-y-1.5 text-xs text-slate-300">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Tecnologia:</span>
                          <span className="font-semibold text-white">NFC Chip + QR Code HD</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Formato:</span>
                          <span className="font-semibold text-white">{isDisplay ? '10 × 15cm (A6)' : '9 × 12cm'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Mensalidade:</span>
                          <span className="font-semibold text-emerald-400">Isento (Vitalício)</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-white/10 text-[11px] text-slate-400">
                      Sem necessidade de bateria ou recarga.
                    </div>
                  </div>
                </div>

                {/* Destino do Google */}
                <div className="bg-[#112A5C]/40 border border-[#1E4080] rounded-2xl p-4 sm:p-5">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-2">
                    <span className="uppercase tracking-wider">Perfil no Google Vinculado</span>
                    <span className="text-[11px] text-[#29D6F0] font-normal">Destino permanente</span>
                  </div>

                  {stats.redirect_url ? (
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#071530] border border-[#1E4080] rounded-xl p-3">
                      <div className="truncate text-xs font-mono text-slate-200">
                        {stats.redirect_url}
                      </div>
                      <a
                        href={stats.redirect_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#29D6F0] hover:bg-[#4fe1f7] text-[#071530] text-xs font-bold transition-all shrink-0 shadow-sm"
                      >
                        <span>Testar no Google</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  ) : (
                    <div className="bg-[#071530] border border-amber-500/30 rounded-xl p-4 text-xs text-amber-200 flex items-center justify-between">
                      <span>Esta placa ainda não possui um link do Google configurado.</span>
                      <a
                        href={`${CARD_BASE_URL}${stats.code || code}`}
                        className="underline font-bold text-[#29D6F0]"
                      >
                        Ativar agora
                      </a>
                    </div>
                  )}
                </div>

                {/* Link Permanente da Placa */}
                <div className="mt-5 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Link permanente gravado no hardware:</span>
                    <span className="font-mono text-slate-200">{CARD_BASE_URL}{stats.code || code}</span>
                  </div>
                  <button
                    type="button"
                    onClick={fetchStats}
                    className="hover:text-[#29D6F0] transition-colors inline-flex items-center gap-1 font-semibold"
                  >
                    <RotateCw className="w-3 h-3" />
                    <span>Atualizar dados</span>
                  </button>
                </div>
              </div>

              {/* Informações adicionais */}
              <div className="p-5 rounded-2xl bg-[#0B1F45]/50 border border-[#1E4080] text-xs text-slate-300 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[#29D6F0] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-semibold text-white">Dica para coletar mais avaliações 5 estrelas</p>
                  <p className="text-slate-400 leading-relaxed">
                    Posicione a placa em local de fácil alcance no balcão ou caixa. Quando o cliente elogiar seu atendimento, peça gentilmente: <span className="text-white italic">"Poderia deixar essa mesma opinião no nosso Google? É só encostar o celular aqui."</span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1E4080] py-4 px-4 text-center text-xs text-slate-500">
        Reviewy © {new Date().getFullYear()} · Tecnologia NFC Inteligente para Google Meu Negócio
      </footer>
    </div>
  );
};
