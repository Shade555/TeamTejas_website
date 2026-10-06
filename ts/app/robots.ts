import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  // Replace with your actual domain when deployed to production
  const baseUrl = 'https://teamtejas.vercel.app';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
