// src/paystack.d.ts
interface Paystack {
  setup(options: {
    key: string;
    email: string;
    amount: number;
    currency?: string;
    callback: () => void;
    onClose?: () => void;
  }): {
    openIframe(): void;
  };
}

interface Window {
  PaystackPop: Paystack;
}
