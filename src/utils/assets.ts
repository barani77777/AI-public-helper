/**
 * Utility to resolve public asset URLs reliably across local development,
 * custom domains, and subpath deployments like GitHub Pages (/AI-public-helper/).
 */
export function getAssetUrl(path: string | null | undefined): string {
  if (!path) return '';

  // Return unchanged if it's already an absolute external URL or data/blob URI
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }

  // Strip leading slash so we can cleanly join with base URL
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const rawBase = (import.meta as any).env?.BASE_URL || '/';
  const base = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;

  return `${base}${cleanPath}`;
}
