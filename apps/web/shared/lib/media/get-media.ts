export function getMediaUrl(path?: string | null): string | undefined {
  if (!path) return undefined;

  const baseUrl = process.env.NEXT_PUBLIC_API_URL_MEDIA;

  return baseUrl + path;
}
