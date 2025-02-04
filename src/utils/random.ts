/**
 * Generates a seeded random number between 0 and 1
 * Uses a variation of the Fisher-Yates algorithm
 */
export function seededRandom(seed: number): () => number {
  let state = seed;
  return () => {
    state = (state * 16807) % 2147483647;
    return state / 2147483647;
  };
}

/**
 * Shuffles an array using a seeded random number generator
 * @param array The array to shuffle
 * @param seed Optional seed for reproducible shuffling
 */
export function shuffleArray<T>(array: T[], seed?: number): T[] {
  const rng = seededRandom(seed || Date.now());
  const shuffled = [...array];
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled;
}

/**
 * Gets a random item from an array using seeded random
 * @param array The array to get an item from
 * @param seed Optional seed for reproducible selection
 */
export function getRandomItem<T>(array: T[], seed?: number): T {
  const rng = seededRandom(seed || Date.now());
  return array[Math.floor(rng() * array.length)];
}

/**
 * Gets multiple random items from an array using seeded random
 * @param array The array to get items from
 * @param count Number of items to get
 * @param seed Optional seed for reproducible selection
 */
export function getRandomItems<T>(array: T[], count: number, seed?: number): T[] {
  return shuffleArray(array, seed).slice(0, count);
}

/**
 * Generates a random integer between min and max (inclusive)
 * @param min Minimum value
 * @param max Maximum value
 * @param seed Optional seed for reproducible generation
 */
export function getRandomInt(min: number, max: number, seed?: number): number {
  const rng = seededRandom(seed || Date.now());
  return Math.floor(rng() * (max - min + 1)) + min;
} 