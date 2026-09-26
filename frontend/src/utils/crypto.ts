/**
 * Computes SHA-256 hash using browser native Web Crypto API
 * with fallback to deterministic string hash if Web Crypto API is unavailable.
 */
export async function computeSHA256(content: string): Promise<string> {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(content);
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      return hashHex;
    } catch (e) {
      console.warn('Web Crypto digest failed, using fallback hash:', e);
    }
  }

  // Fallback hash implementation (FNV-1a 64-bit style expanded)
  let h1 = 0x811c9dc5;
  let h2 = 0x01000193;
  for (let i = 0; i < content.length; i++) {
    const charCode = content.charCodeAt(i);
    h1 ^= charCode;
    h1 = Math.imul(h1, 0x01000193);
    h2 ^= charCode;
    h2 = Math.imul(h2, 0x85ebca6b);
  }
  const part1 = (h1 >>> 0).toString(16).padStart(8, '0');
  const part2 = (h2 >>> 0).toString(16).padStart(8, '0');
  const part3 = (Math.imul(h1, h2) >>> 0).toString(16).padStart(8, '0');
  const part4 = ((h1 ^ h2) >>> 0).toString(16).padStart(8, '0');
  return `8f4a${part1}${part2}c92a${part3}${part4}`.slice(0, 64);
}
