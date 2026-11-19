// Google Analytics 4 (GA4) Integration

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

export const DEFAULT_GA_ID = import.meta.env.VITE_GA_ID || 'G-XXXXXXXXXX';

export function initGA(measurementId: string = DEFAULT_GA_ID) {
  if (typeof window === 'undefined') return;
  if (!measurementId || measurementId === 'G-XXXXXXXXXX') {
    // Modo de desenvolvimento sem ID configurado
    return;
  }

  // Verifica se o script já foi adicionado
  const existingScript = document.getElementById('ga-gtag');
  if (!existingScript) {
    const script = document.createElement('script');
    script.id = 'ga-gtag';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', measurementId, {
      send_page_view: true
    });
  }
}

export function trackPageView(title: string, path: string) {
  if (typeof window === 'undefined') return;
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: title,
      page_path: path
    });
  } else if (window.dataLayer) {
    window.dataLayer.push({
      event: 'page_view',
      page_title: title,
      page_path: path
    });
  }
}

export function trackEvent(action: string, category: string, label?: string, value?: number) {
  if (typeof window === 'undefined') return;
  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    });
  } else if (window.dataLayer) {
    window.dataLayer.push({
      event: action,
      event_category: category,
      event_label: label,
      value: value
    });
  }
}
