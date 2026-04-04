import { notFound } from 'next/navigation';
import TemplateMinimal from '@/components/templates/TemplateMinimal';
import TemplateCyber from '@/components/templates/TemplateCyber';
import TemplateCorporate from '@/components/templates/TemplateCorporate';
import TemplateGlass from '@/components/templates/TemplateGlass';

async function getPortfolioData(slug: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/portfolios/slug/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    return null;
  }
}

export default async function PortfolioPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const data = await getPortfolioData(params.slug);
  
  if (!data) {
    notFound();
  }

  const { portfolio, sections } = data;

  const templateMap: any = {
    1: TemplateMinimal,
    2: TemplateCyber,
    3: TemplateCorporate,
    4: TemplateGlass
  };

  const SelectedTemplate = templateMap[portfolio.templateId] || TemplateMinimal;

  return (
    <SelectedTemplate portfolio={portfolio} sections={sections} />
  );
}
