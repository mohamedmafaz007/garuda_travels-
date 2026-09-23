import { useEffect } from 'react';

interface SEOOptions {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  keywords?: string;
}

const BASE_URL = 'https://www.garudatravelsmadurai.com';
const DEFAULT_IMAGE = `${BASE_URL}/images/logo.png`;

function setMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export function useSEO({ title, description, canonical, ogImage, ogType = 'website', keywords }: SEOOptions) {
  useEffect(() => {
    // Title
    document.title = title;

    // Meta description
    setMeta('description', description);

    // Keywords (still used by some crawlers)
    if (keywords) setMeta('keywords', keywords);

    // Robots
    setMeta('robots', 'index, follow');

    // Canonical
    const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : `${BASE_URL}${window.location.pathname}`;
    setLink('canonical', canonicalUrl);

    // Open Graph
    setMeta('og:title', title, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:image', ogImage || DEFAULT_IMAGE, 'property');
    setMeta('og:url', canonicalUrl, 'property');
    setMeta('og:type', ogType, 'property');
    setMeta('og:site_name', 'Garuda Travels Madurai', 'property');
    setMeta('og:locale', 'en_IN', 'property');

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', ogImage || DEFAULT_IMAGE);

    // Geo tags for local SEO
    setMeta('geo.region', 'IN-TN');
    setMeta('geo.placename', 'Madurai, Tamil Nadu, India');
    setMeta('geo.position', '9.9252;78.1198');
    setMeta('ICBM', '9.9252, 78.1198');
  }, [title, description, canonical, ogImage, ogType, keywords]);
}
