import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteConfig, PortfolioItem, BlogPost, Inquiry } from '../types';
import { INITIAL_SITE_CONFIG, INITIAL_PORTFOLIO, INITIAL_BLOG } from '../constants';

interface SiteContextType {
  config: SiteConfig;
  portfolio: PortfolioItem[];
  blog: BlogPost[];
  inquiries: Inquiry[];
  updateConfig: (newConfig: SiteConfig) => void;
  addPortfolio: (item: PortfolioItem) => void;
  updatePortfolio: (item: PortfolioItem) => void;
  deletePortfolio: (id: string) => void;
  addBlog: (post: BlogPost) => void;
  updateBlog: (post: BlogPost) => void;
  deleteBlog: (id: string) => void;
  addInquiry: (inquiry: Inquiry) => void;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SiteConfig>(INITIAL_SITE_CONFIG);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(INITIAL_PORTFOLIO);
  const [blog, setBlog] = useState<BlogPost[]>(INITIAL_BLOG);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  // Load from localStorage if available
  useEffect(() => {
    const savedConfig = localStorage.getItem('site_config');
    const savedPortfolio = localStorage.getItem('site_portfolio');
    const savedBlog = localStorage.getItem('site_blog');
    const savedInquiries = localStorage.getItem('site_inquiries');

    if (savedConfig) setConfig(JSON.parse(savedConfig));
    if (savedPortfolio) setPortfolio(JSON.parse(savedPortfolio));
    if (savedBlog) setBlog(JSON.parse(savedBlog));
    if (savedInquiries) setInquiries(JSON.parse(savedInquiries));
  }, []);

  // Save to localStorage on changes
  useEffect(() => {
    localStorage.setItem('site_config', JSON.stringify(config));
    localStorage.setItem('site_portfolio', JSON.stringify(portfolio));
    localStorage.setItem('site_blog', JSON.stringify(blog));
    localStorage.setItem('site_inquiries', JSON.stringify(inquiries));
  }, [config, portfolio, blog, inquiries]);

  const updateConfig = (newConfig: SiteConfig) => setConfig(newConfig);
  
  const addPortfolio = (item: PortfolioItem) => setPortfolio([...portfolio, item]);
  const updatePortfolio = (item: PortfolioItem) => setPortfolio(portfolio.map(p => p.id === item.id ? item : p));
  const deletePortfolio = (id: string) => setPortfolio(portfolio.filter(p => p.id !== id));

  const addBlog = (post: BlogPost) => setBlog([...blog, post]);
  const updateBlog = (post: BlogPost) => setBlog(blog.map(b => b.id === post.id ? post : b));
  const deleteBlog = (id: string) => setBlog(blog.filter(b => b.id !== id));

  const addInquiry = (inquiry: Inquiry) => setInquiries([inquiry, ...inquiries]);

  return (
    <SiteContext.Provider value={{
      config, portfolio, blog, inquiries,
      updateConfig, addPortfolio, updatePortfolio, deletePortfolio,
      addBlog, updateBlog, deleteBlog, addInquiry
    }}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) throw new Error('useSite must be used within a SiteProvider');
  return context;
};
