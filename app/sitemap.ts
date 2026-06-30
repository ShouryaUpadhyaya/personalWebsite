import { MetadataRoute } from 'next'
import { portfolio } from "@/data/portfolio"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.shouryaupadhyaya.com'

  const projectRoutes = portfolio.projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...projectRoutes,
  ]
}
