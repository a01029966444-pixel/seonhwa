import { SiteConfig, PortfolioItem, BlogPost } from './types';

export const INITIAL_SITE_CONFIG: SiteConfig = {
  title: "봉숭아 점포",
  description: "감성적인 소품 및 디자인 전문",
  hero: {
    title: "당신의 일상에\n봉숭아 물을 들이다",
    subtitle: "따뜻한 감성을 담은 소품과 디자인으로 당신의 공간에 작은 행복을 더해드립니다.",
    ctaText: "스토어 둘러보기",
  },
  colors: {
    primary: "#FF6B6B", // Balsam Pink
    secondary: "#FF8E99", // Lighter Pink
    background: "#000000",
    text: "#FFFFFF",
  },
};

export const INITIAL_PORTFOLIO: PortfolioItem[] = [
  {
    id: '1',
    title: '미니멀리스트 코스메틱 로고',
    category: 'Logo',
    imageUrl: 'https://picsum.photos/seed/logo1/800/600',
    description: '순수함과 우아함을 강조한 화장품 브랜드 로고 디자인입니다.',
  },
  {
    id: '2',
    title: '테크 스타트업 웹사이트',
    category: 'Website',
    imageUrl: 'https://picsum.photos/seed/web1/800/600',
    description: '혁신적인 기술력을 보여주는 반응형 웹사이트 제작 사례입니다.',
  },
  {
    id: '3',
    title: '프리미엄 카페 브랜딩',
    category: 'Branding',
    imageUrl: 'https://picsum.photos/seed/brand1/800/600',
    description: '카페의 아이덴티티를 통합적으로 구축한 브랜딩 프로젝트입니다.',
  },
  {
    id: '4',
    title: '패션 매거진 레이아웃',
    category: 'Website',
    imageUrl: 'https://picsum.photos/seed/web2/800/600',
    description: '감각적인 비주얼 중심의 매거진 스타일 웹사이트입니다.',
  },
];

export const INITIAL_BLOG: BlogPost[] = [
  {
    id: '1',
    title: '2024년 웹 디자인 트렌드 분석',
    date: '2024-03-20',
    excerpt: '올해 주목해야 할 디자인 요소와 사용자 경험 트렌드를 소개합니다.',
    content: '상세 내용이 여기에 들어갑니다...',
    imageUrl: 'https://picsum.photos/seed/blog1/800/400',
  },
  {
    id: '2',
    title: '로고 디자인이 브랜드 가치에 미치는 영향',
    date: '2024-03-15',
    excerpt: '잘 만들어진 로고 하나가 비즈니스 성장에 어떤 도움을 주는지 알아봅니다.',
    content: '상세 내용이 여기에 들어갑니다...',
    imageUrl: 'https://picsum.photos/seed/blog2/800/400',
  },
];
