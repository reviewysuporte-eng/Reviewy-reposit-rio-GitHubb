export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductItem {
  id: string;
  badge: string;
  name: string;
  description: string;
  dimensions: string;
  technology: string;
  specs: ProductSpec[];
  price: string;
  priceValue: number;
  paymentNotice: string;
  formatType: 'adhesive' | 'counter_display';
}

export interface ProductKit {
  id: string;
  name: string;
  description?: string;
  itemsSummary: string;
  price: string;
  priceValue: number;
  savings: string;
  savingsValue: number;
  isPopular?: boolean;
  badge?: string;
  paymentNotice: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface MetricItem {
  value: string;
  label: string;
  source: string;
  description: string;
}
