/**
 * Typed environment configuration
 * Centralizes all environment variables with type safety
 */

const env = {
  // API Configuration
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  
  // Environment
  isProd: process.env.NODE_ENV === 'production',
  isDev: process.env.NODE_ENV === 'development',
  
  // Site Configuration
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  siteName: 'Mind Mesh',
  
  // Analytics (if needed)
  analyticsId: process.env.NEXT_PUBLIC_ANALYTICS_ID,
} as const;

export default env;

// Type guard for required env vars
export function validateEnv() {
  const requiredVars: (keyof typeof env)[] = [];
  
  for (const key of requiredVars) {
    if (!env[key]) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  }
}
