import React, { useEffect, useState } from 'react';
import { supabase, CardRedirectResponse, ConfigureCardResponse } from '../lib/supabase';
import { ReviewyLogo } from './ReviewyLogo';
import { ReviewyNfcGlyph, ReviewyStarMarker } from './ReviewyBrandElements';
import { 
  AlertCircle, 
  CheckCircle2, 
  ExternalLink, 
  ArrowRight, 
  Sparkles, 
  Loader2, 
  Link as LinkIcon,
  HelpCircle
} from 'lucide-react';

interface CardRedirectPageProps {
  code: string;
}

export const CardRedirectPage: React.FC<CardRedirectPageProps> = ({ code }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [errorState, setErrorState] = useState<string | null>(null);
  const [cardData, setCardData] = useState<CardRedirectResponse | null>(null);

  // Estados do formulário de configuração inicial
  const [reviewUrl, setReviewUrl] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [setupSuccess, setSetupSuccess] = useState<boolean>(false);
  const [savedRedirectUrl, setSavedRedirectUrl] = useState<string | null>(null);

  // SEO & Proteção: Garante que rotas de cartões individuais não sejam indexadas
  useEffect(() => {
    let metaRobots = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    let created = false;
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.name = 'robots';
      metaRobots.content = 'noindex, nofollow';
      document.head.appendChild(metaRobots);
      created = true;
    } else {
      metaRobots.content = 'noindex, nofollow';
    }

    return () => {
      if (created && metaRobots) {
        metaRobots.remove();
      }
    };
  }, []);

  // 1. Ao carregar a rota /c/:codigo, consulta a função RPC get_card_redirect
  useEffect(() => {
    let isMounted = true;

    async function checkCard() {
      try {
        setLoading(true);
        setErrorState(null);

        const { data, error } = await supabase.rpc('get_card_redirect', {
          p_code: code,
        });

        if (error) {
          console.error('Erro ao buscar redirecionamento do cartão:', error);
          if (isMounted) {
            setErrorState('Não foi possível verificar os dados da placa no momento.');
            setLoading(false);
          }
          return;
        }

        const res = data as CardRedirectResponse;

        if (!isMounted) return;

        setCardData(res);

        // Se o cartão não existe
        if (!res || !res.exists) {
          setLoading(false);
          return;
        }

        // Se já está configurado, redireciona IMEDIATAMENTE sem cliques nem telas intermediárias
        if (res.status === 'configured' && res.redirect_url) {
          // Normaliza URL se necessário
          let target = res.redirect_url.trim();
          if (!/^https?:\/\//i.test(target)) {
            target = 'https://' + target;
          }
          window.location.replace(target);
          return;
        }

        // Se está pendente, exibe a tela de configuração inicial
        setLoading(false);
      } catch (err) {
        console.error('Exceção ao verificar cartão:', err);
        if (isMounted) {
          setErrorState('Erro de conexão ao verificar a placa. Verifique sua internet.');
          setLoading(false);
        }
      }
    }

    if (code) {
      checkCard();
    } else {
      setErrorState('Código de placa inválido.');
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [code]);

  // Função para salvar a configuração inicial do cartão
  const handleSaveConfiguration = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const cleanUrl = reviewUrl.trim();

    if (!cleanUrl) {
      setFormError('Por favor, cole o link da sua página de avaliação do Google.');
      return;
    }

    // Validação básica de URL
    let normalized = cleanUrl;
    if (!/^https?:\/\//i.test(normalized)) {
      normalized = 'https://' + normalized;
    }

    try {
      const parsed = new URL(normalized);
      if (!parsed.hostname || !parsed.hostname.includes('.')) {
        setFormError('Por favor, insira um link web válido (ex: https://g.page/r/... ou https://maps.app.goo.gl/...).');
        return;
      }
    } catch {
      setFormError('Formato de link inválido. Por favor, confira o endereço copiado do Google.');
      return;
    }

    try {
      setIsSubmitting(true);

      const { data, error } = await supabase.rpc('configure_card', {
        p_code: code,
        p_redirect_url: normalized,
      });

      if (error) {
        console.error('Erro na RPC configure_card:', error);
        setFormError('Erro ao comunicar com o servidor. Tente novamente.');
        setIsSubmitting(false);
        return;
      }

      const res = data as ConfigureCardResponse;

      if (!res.success) {
        if (res.error === 'already_configured') {
          setFormError('Esta placa já foi configurada anteriormente e não pode ser alterada por aqui.');
        } else if (res.error === 'invalid_url') {
          setFormError('Link considerado inválido. Por favor, revise o endereço do Google Meu Negócio.');
        } else if (res.error === 'not_found') {
          setFormError('Placa não localizada no banco de dados.');
        } else {
          setFormError('Não foi possível salvar a configuração da placa.');
        }
        setIsSubmitting(false);
        return;
      }

      // Sucesso na primeira configuração
      setSetupSuccess(true);
      setSavedRedirectUrl(normalized);
      setIsSubmitting(false);

      // Redireciona em 3 segundos para que o dono veja funcionando na prática
      setTimeout(() => {
        window.location.replace(normalized);
      }, 3000);
    } catch (err) {
      console.error('Exceção ao configurar cartão:', err);
      setFormError('Ocorreu um erro ao salvar o link. Verifique sua conexão.');
      setIsSubmitting(false);
    }
  };

  // 1. Estado de Carregamento (Loading)
  if (loading) {
    return (
      <div className="min-h-screen bg-[#071530] text-white flex flex-col items-center justify-center p-4">
        <div className="relative flex flex-col items-center max-w-sm text-center">
          <ReviewyLogo size="md" showStars={true} />
          
          <div className="mt-8 flex items-center justify-center relative">
            <div className="w-14 h-14 rounded-full bg-[#0E2756] border border-[#29D6F0]/40 flex items-center justify-center text-[#29D6F0]">
              <ReviewyNfcGlyph className="w-7 h-7 animate-pulse" />
            </div>
            <span className="absolute inset-0 rounded-full border border-[#29D6F0] animate-ping opacity-40" />
          </div>

          <p className="mt-5 text-sm text-slate-300 font-medium">
            Localizando placa <span className="font-mono text-[#29D6F0] font-bold">{code}</span>...
          </p>
        </div>
      </div>
    );
  }

  // 2. Erro genérico ou falha de conexão
  if (errorState) {
    return (
      <div className="min-h-screen bg-[#071530] text-white flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full bg-[#0B1F45] border border-[#1E4080] rounded-3xl p-8 text-center shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto mb-4">
            <AlertCircle className="w-6 h-6" />
          </div>

          <h1 className="text-xl font-bold font-['Poppins'] text-white">
            Aviso de Conexão
          </h1>

          <p className="mt-3 text-sm text-slate-300 leading-relaxed">
            {errorState}
          </p>

          <div className="mt-6 flex flex-col gap-3">
            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 px-4 rounded-xl bg-[#29D6F0] text-[#071530] font-bold text-sm hover:bg-[#4fe1f7] transition-colors"
            >
              Tentar novamente
            </button>

            <a
              href="/"
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              Ir para a página inicial
            </a>
          </div>
        </div>
      </div>
    );
  }

  // 3. Cartão não encontrado (exists: false)
  if (!cardData || !cardData.exists) {
    return (
      <div className="min-h-screen bg-[#071530] text-white flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full bg-[#0B1F45] border border-[#1E4080] rounded-3xl p-8 text-center shadow-2xl relative overflow-hidden">
          {/* Subtle glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-2xl pointer-events-none" />

          <div className="mb-6">
            <ReviewyLogo size="sm" showStars={true} />
          </div>

          <div className="w-14 h-14 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 mx-auto mb-5">
            <AlertCircle className="w-7 h-7" />
          </div>

          <h1 className="text-2xl font-black font-['Poppins'] text-white tracking-tight">
            Placa não encontrada
          </h1>

          <p className="mt-3 text-sm text-slate-300 leading-relaxed">
            O código <span className="font-mono text-[#29D6F0] font-bold">{code}</span> não existe ou ainda não foi ativado no sistema Reviewy.
          </p>

          <p className="mt-2 text-xs text-slate-400">
            Se você acabou de receber sua placa física, verifique se o link foi gravado corretamente ou entre em contato com nosso suporte.
          </p>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col gap-3">
            <a
              href="/"
              className="w-full py-3 px-4 rounded-xl bg-[#112A5C] hover:bg-[#18397a] border border-[#1E4080] text-white font-bold text-sm transition-colors"
            >
              Conhecer a Reviewy
            </a>
          </div>
        </div>
      </div>
    );
  }

  // 4. Cartão já configurado (Redirecionando de imediato ou fallback caso popup tenha bloqueado)
  if (cardData.status === 'configured') {
    return (
      <div className="min-h-screen bg-[#071530] text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md w-full bg-[#0B1F45] border border-[#29D6F0]/40 rounded-3xl p-8 shadow-2xl relative">
          <ReviewyLogo size="md" showStars={true} />

          <div className="my-8 flex justify-center">
            <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#0E2756] border border-[#29D6F0]/50 text-[#29D6F0]">
              <Loader2 className="w-7 h-7 animate-spin text-[#29D6F0]" />
            </div>
          </div>

          <h2 className="text-xl font-bold font-['Poppins'] text-white">
            Abrindo avaliação no Google...
          </h2>

          <p className="mt-2 text-xs text-slate-300">
            Você está sendo redirecionado automaticamente para a página de 5 estrelas.
          </p>

          {cardData.redirect_url && (
            <div className="mt-6 pt-5 border-t border-white/10">
              <a
                href={cardData.redirect_url}
                className="inline-flex items-center gap-2 text-xs text-[#29D6F0] hover:underline font-semibold"
              >
                <span>Clique aqui se não for redirecionado</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 5. Sucesso imediato após configuração
  if (setupSuccess && savedRedirectUrl) {
    return (
      <div className="min-h-screen bg-[#071530] text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md w-full bg-gradient-to-b from-[#0B1F45] to-[#071530] border-2 border-[#29D6F0] rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-36 h-36 bg-[#29D6F0]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="mb-4">
            <ReviewyLogo size="sm" showStars={true} />
          </div>

          <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto my-4 shadow-lg shadow-emerald-500/20">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h2 className="text-2xl font-black font-['Poppins'] text-white">
            Placa Ativada com Sucesso!
          </h2>

          <p className="mt-3 text-sm text-slate-200 leading-relaxed">
            Sua placa Reviewy agora está 100% pronta para coletar avaliações 5 estrelas no Google.
          </p>

          <div className="my-6 p-4 rounded-xl bg-[#071530] border border-[#1E4080] text-left">
            <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
              Link de avaliação vinculado:
            </span>
            <span className="text-xs font-mono text-[#29D6F0] break-all">
              {savedRedirectUrl}
            </span>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-[#F4C430] font-semibold animate-pulse">
            <Sparkles className="w-4 h-4" />
            <span>Redirecionando em instantes para você testar...</span>
          </div>

          <div className="mt-6">
            <a
              href={savedRedirectUrl}
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-[#29D6F0] text-[#071530] font-extrabold text-sm hover:bg-[#4fe1f7] transition-all shadow-lg"
            >
              <span>Abrir página de avaliação agora</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  // 6. Página de Configuração Inicial do Cartão (status: 'pending')
  return (
    <div className="min-h-screen bg-[#071530] text-white flex flex-col items-center justify-center p-4 sm:p-6">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#29D6F0]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-lg w-full bg-[#0B1F45] border-2 border-[#29D6F0]/40 rounded-3xl p-6 sm:p-10 shadow-2xl relative z-10">
        
        {/* Top Header */}
        <div className="flex flex-col items-center text-center pb-6 border-b border-white/10">
          <ReviewyLogo size="md" showStars={true} />

          <div className="mt-5 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#112A5C] border border-[#29D6F0]/40 text-[#29D6F0] text-xs font-semibold">
            <ReviewyNfcGlyph className="w-3.5 h-3.5" />
            <span>Código da Placa: <strong className="font-mono text-white">{code}</strong></span>
          </div>

          <h1 className="mt-4 text-2xl sm:text-3xl font-black font-['Poppins'] text-white tracking-tight">
            Configure sua placa Reviewy
          </h1>

          <p className="mt-2 text-sm text-slate-300">
            Cole abaixo o link da página de avaliação do seu negócio no Google.
          </p>
        </div>

        {/* Informative Tip Box */}
        <div className="my-6 p-4 rounded-2xl bg-[#071530] border border-[#1E4080] text-xs text-slate-300 flex items-start gap-3">
          <HelpCircle className="w-5 h-5 text-[#29D6F0] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-white block">Como pegar seu link no Google Meu Negócio:</strong>
            <p>
              Abra o seu perfil no Google Maps, clique em <strong>"Solicitar avaliações"</strong> e copie o link curto gerado (geralmente começa com <em>g.page/r/...</em> ou <em>maps.app.goo.gl/...</em>).
            </p>
          </div>
        </div>

        {/* Configuration Form */}
        <form onSubmit={handleSaveConfiguration} className="space-y-5">
          <div>
            <label htmlFor="review-url-input" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Link de Avaliação do Google
            </label>
            
            <div className="relative flex items-center">
              <div className="absolute left-3.5 text-slate-400 pointer-events-none">
                <LinkIcon className="w-4 h-4 text-[#29D6F0]" />
              </div>
              <input
                id="review-url-input"
                type="text"
                value={reviewUrl}
                onChange={(e) => {
                  setReviewUrl(e.target.value);
                  if (formError) setFormError(null);
                }}
                placeholder="https://g.page/r/.../review ou https://maps.app.goo.gl/..."
                disabled={isSubmitting}
                className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-[#071530] border border-[#1E4080] focus:border-[#29D6F0] focus:ring-2 focus:ring-[#29D6F0]/20 text-white text-sm placeholder:text-slate-500 outline-none transition-all"
                autoFocus
              />
            </div>

            {formError && (
              <div className="mt-2 text-xs font-semibold text-rose-400 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{formError}</span>
              </div>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              id="save-card-button"
              disabled={isSubmitting || !reviewUrl.trim()}
              className="w-full py-4 px-6 rounded-xl bg-[#29D6F0] hover:bg-[#4fe1f7] disabled:opacity-50 disabled:cursor-not-allowed text-[#071530] font-extrabold text-sm sm:text-base transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#29D6F0]/20 hover:scale-[1.01] active:scale-100"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Gravando configuração...</span>
                </>
              ) : (
                <>
                  <span>Salvar e Ativar Placa</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>

          <div className="text-center pt-2">
            <span className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
              <ReviewyStarMarker size="sm" />
              <span>Configuração única · Para alterar depois, contate o suporte</span>
            </span>
          </div>
        </form>

      </div>
    </div>
  );
};
