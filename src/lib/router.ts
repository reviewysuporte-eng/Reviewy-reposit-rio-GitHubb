import { useState, useEffect } from 'react';

// ROTA PERMANENTE — NÃO ALTERAR. QR Codes e NFC já impressos dependem dela.
export const CARD_BASE_URL = 'https://reviewy.com.br/c/';

export type RouteType = 
  | { type: 'home' }
  | { type: 'card'; code: string }
  | { type: 'card-stats'; code: string }
  | { type: 'admin' }
  | { type: 'not-found' };

export function parseCurrentPath(): RouteType {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';

  // ROTA PERMANENTE — NÃO ALTERAR. QR Codes e NFC já impressos dependem dela.
  // 1. Estatísticas do cartão: /c/:codigo/stats
  const statsMatch = path.match(/^\/c\/([a-zA-Z0-9_-]+)\/stats$/i);
  if (statsMatch) {
    return { type: 'card-stats', code: statsMatch[1] };
  }

  // 2. Redirecionamento e configuração do cartão: /c/:codigo
  const cardMatch = path.match(/^\/c\/([a-zA-Z0-9_-]+)$/i);
  if (cardMatch) {
    return { type: 'card', code: cardMatch[1] };
  }

  // Rota do painel administrativo restrito
  if (path === '/painel-reviewy-adm' || path === '/admin' || path === '/painel') {
    return { type: 'admin' };
  }

  // Rota raiz da landing page
  if (path === '/' || path === '') {
    return { type: 'home' };
  }

  return { type: 'not-found' };
}

export function useRouter() {
  const [route, setRoute] = useState<RouteType>(parseCurrentPath);

  useEffect(() => {
    const handlePopState = () => {
      setRoute(parseCurrentPath());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (to: string) => {
    window.history.pushState({}, '', to);
    setRoute(parseCurrentPath());
    window.scrollTo(0, 0);
  };

  return { route, navigate };
}
