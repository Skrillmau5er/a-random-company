interface PendoVisitor {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  }

  interface PendoAccount {
    id: string;
    name: string;
    planLevel: string;
    industry: string;
  }

  interface PendoInitializeOptions {
    visitor: PendoVisitor;
    account?: PendoAccount;
  }
  
  interface Pendo {
    initialize: (options: PendoInitializeOptions) => void;
    identify: (options: PendoInitializeOptions) => void;
    updateOptions: (options: Partial<PendoInitializeOptions>) => void;
    pageLoad: () => void;
    track: (eventName: string, metadata?: Record<string, unknown>) => void;
    trackAgent: (eventType: string, props: Record<string, unknown>, eventProperties?: Record<string, unknown>) => void;
    _q: unknown[];
  }
  
  interface Window {
    pendo?: Pendo;
  }
  