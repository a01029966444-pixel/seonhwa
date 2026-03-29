export interface SiteConfig {
  title: string;
  description: string;
  hero: {
    title: string;
    subtitle: string;
    ctaText: string;
  };
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Logo' | 'Website' | 'Branding';
  imageUrl: string;
  description: string;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  imageUrl: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
}
