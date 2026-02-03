interface PendoVisitor {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  }
  
  interface PendoInitializeOptions {
    visitor: PendoVisitor;
  }
  
  interface Pendo {
    initialize: (options: PendoInitializeOptions) => void;
    identify: (options: PendoInitializeOptions) => void;
    updateOptions: (options: Partial<PendoInitializeOptions>) => void;
    pageLoad: () => void;
    track: (eventName: string, metadata?: Record<string, unknown>) => void;
    trackAgent: (eventName: string, metadata?: Record<string, unknown>) => void;
    _q: unknown[];
  }
  
  interface Window {
    pendo?: Pendo;
  }
  