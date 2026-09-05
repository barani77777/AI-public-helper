// CivicAI — SEO & Head Metadata Manager

export interface PageMetadata {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogType?: string;
  ogImage?: string;
}

export function updatePageSEO({
  title,
  description,
  canonicalUrl = 'https://civicai.org',
  ogType = 'website',
  ogImage = 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=1200&q=80',
}: PageMetadata) {
  // Update document title
  document.title = `${title} | CivicAI Public Grievance Classifier`;

  // Helper to set or create meta tag
  const setMetaTag = (attribute: 'name' | 'property', key: string, content: string) => {
    let element = document.querySelector(`meta[${attribute}="${key}"]`);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attribute, key);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };

  setMetaTag('name', 'description', description);
  setMetaTag('property', 'og:title', `${title} | CivicAI`);
  setMetaTag('property', 'og:description', description);
  setMetaTag('property', 'og:type', ogType);
  setMetaTag('property', 'og:image', ogImage);
  setMetaTag('property', 'og:url', canonicalUrl);
  setMetaTag('name', 'twitter:card', 'summary_large_image');
  setMetaTag('name', 'twitter:title', `${title} | CivicAI`);
  setMetaTag('name', 'twitter:description', description);

  // Update or set canonical
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', canonicalUrl);
}

// Inject JSON-LD Schema
export function injectStructuredData(schemaData: object) {
  const scriptId = 'civicai-schema-jsonld';
  let script = document.getElementById(scriptId) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.text = JSON.stringify(schemaData);
}
