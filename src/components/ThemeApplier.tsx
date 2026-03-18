import { useEffect } from 'react';
import { useSiteSettings } from '../contexts/SiteSettingsContext';

export function ThemeApplier() {
  const { settings } = useSiteSettings();

  useEffect(() => {
    const root = document.documentElement;

    if (settings.primary_color) {
      root.style.setProperty('--color-maroon', settings.primary_color);
    }
    if (settings.bg_color) {
      root.style.setProperty('--color-ivory', settings.bg_color);
    }
    if (settings.font_family) {
      root.style.setProperty('--font-sans', `"${settings.font_family}", sans-serif`);
      root.style.setProperty('--font-serif', `"${settings.font_family}", serif`);
    }
    
    // We can handle button styles by adding a class to body
    if (settings.button_style) {
      root.setAttribute('data-button-style', settings.button_style);
    }

  }, [settings]);

  return null;
}
