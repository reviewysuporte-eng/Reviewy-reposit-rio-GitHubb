import { ProductItem, ProductKit } from '../types';

/**
 * ============================================================================
 * PRODUTOS REVIEWY & KITS — PREÇOS DE LANÇAMENTO
 * ============================================================================
 * NOTA PARA DESENVOLVEDORES / MANUTENÇÃO:
 * Os preços abaixo são VALORES DE LANÇAMENTO e foram centralizados neste arquivo
 * para que possam ser facilmente consultados e editados a qualquer momento.
 * 
 * Para alterar qualquer preço ou valor de economia, basta atualizar os campos
 * `price`, `priceValue`, `savings` e `savingsValue` correspondentes.
 * ============================================================================
 */

export const PRODUCTS_DATA: ProductItem[] = [
  {
    id: 'placa-adesiva-nfc',
    badge: 'PLACA ADESIVA NFC',
    name: 'Placa Adesiva Reviewy',
    description:
      'Placa compacta com adesivo removível atrás — cole no balcão, na vitrine, na mesa ou onde quiser, sem estragar a superfície.',
    dimensions: '9 × 12cm',
    technology: 'NFC + QR Code de fallback',
    formatType: 'adhesive',
    // Preço de lançamento: R$ 99 (unidade, pagamento único)
    price: '99',
    priceValue: 99,
    paymentNotice: 'unidade · pagamento único · sem mensalidade',
    specs: [
      {
        label: 'Dimensões',
        value: '9 × 12cm',
      },
      {
        label: 'Fixação',
        value: 'Adesivo removível/reposicionável, sem resíduo',
      },
      {
        label: 'Tecnologia',
        value: 'NFC + QR Code de fallback',
      },
      {
        label: 'Sem app',
        value: 'O cliente não instala nada nem se cadastra',
      },
    ],
  },
  {
    id: 'placa-balcao-nfc',
    badge: 'PLACA DE BALCÃO',
    name: 'Placa de Balcão Reviewy',
    description:
      'Fica em pé sozinha, com suporte próprio — ideal para caixa, recepção ou entrada, sem precisar colar em nada.',
    dimensions: '10 × 15cm (formato A6)',
    technology: 'NFC + QR Code de fallback',
    formatType: 'counter_display',
    // Preço de lançamento: R$ 149 (unidade, pagamento único)
    price: '149',
    priceValue: 149,
    paymentNotice: 'unidade · pagamento único · sem mensalidade',
    specs: [
      {
        label: 'Dimensões',
        value: '10 × 15cm (formato A6)',
      },
      {
        label: 'Suporte',
        value: 'Base em acrílico transparente, não precisa de fixação',
      },
      {
        label: 'Tecnologia',
        value: 'NFC + QR Code de fallback',
      },
      {
        label: 'Sem app',
        value: 'O cliente não instala nada nem se cadastra',
      },
    ],
  },
];

/**
 * ============================================================================
 * KITS ECONÔMICOS REVIEWY — PREÇOS DE LANÇAMENTO
 * ============================================================================
 * Opções de kits para múltiplos pontos de contato, caixas ou filiais.
 * Apresentados como opção dentro ou abaixo dos cards de produtos.
 * ============================================================================
 */
export const PRODUCT_KITS_DATA: ProductKit[] = [
  {
    id: 'kit-2-adesivas',
    name: 'Kit 2 Placas Adesivas',
    itemsSummary: '2 Placas Adesivas NFC (9 × 12cm)',
    description: 'Ideal para fixar em 2 mesas estratégicas, vitrines ou balcões diferentes.',
    // Preço de lançamento: R$ 160 (Economia de R$ 38 em relação a 2 avulsas de R$ 99)
    price: '160',
    priceValue: 160,
    savings: '38',
    savingsValue: 38,
    isPopular: false,
    paymentNotice: 'pagamento único · sem mensalidade',
  },
  {
    id: 'kit-combo',
    name: 'Kit Combo Reviewy',
    itemsSummary: '1 Placa Adesiva + 1 Placa de Balcão',
    description: 'A opção mais versátil: cole onde preferir e coloque a outra em pé no caixa.',
    // Preço de lançamento: R$ 199 (Economia de R$ 49 em relação a R$ 99 + R$ 149)
    price: '199',
    priceValue: 199,
    savings: '49',
    savingsValue: 49,
    isPopular: true,
    badge: 'Mais popular',
    paymentNotice: 'pagamento único · sem mensalidade',
  },
  {
    id: 'kit-2-balcao',
    name: 'Kit 2 Placas de Balcão',
    itemsSummary: '2 Placas de Balcão com Suporte Acrílico (10 × 15cm)',
    description: 'Perfeito para comércio com dois caixas, recepção e ponto de atendimento.',
    // Preço de lançamento: R$ 239 (Economia de R$ 59 em relação a 2 avulsas de R$ 149)
    price: '239',
    priceValue: 239,
    savings: '59',
    savingsValue: 59,
    isPopular: false,
    paymentNotice: 'pagamento único · sem mensalidade',
  },
];

export const INSTAGRAM_HANDLE = '@reviewy.com.br';
export const INSTAGRAM_URL = 'https://instagram.com/reviewy.com.br';
