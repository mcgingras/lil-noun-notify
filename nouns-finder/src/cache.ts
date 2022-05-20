import { redis } from './clients';

/**
 * Key mapped to the current auction
 */
export const getNounCacheKey = 'NOUN_CACHE';


/**
 * Update the auction cache with `id`
 * @param id
 */
export async function updateNounCache(id: number) {
  await redis.set(getNounCacheKey, id);
}


/**
 * Get the current cache contents or 0 if empty
 * @returns The current cache contents as number or 0 if null
 */
export async function getNounCache(): Promise<number> {
  const nounId = await redis.get(getNounCacheKey);
  if (nounId) {
    return Number(nounId);
  }
  return 0;
}
