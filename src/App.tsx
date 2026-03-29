import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { 
  Instagram, 
  Mail, 
  MessageCircle, 
  ArrowRight, 
  ChevronRight,
  ExternalLink,
  Menu,
  X,
  Settings
} from 'lucide-react';
import { useSite } from './context/SiteContext';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  const { config, portfolio, blog, addInquiry } = useSite();
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);

  // Apply dynamic primary color to CSS variable
  useEffect(() => {
    document.documentElement.style.setProperty('--color-primary', config.colors.primary);
    // Calculate a slightly lighter version for secondary if not explicitly provided
    document.documentElement.style.setProperty('--color-secondary', config.colors.primary + 'CC');
  }, [config.colors.primary]);

  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary/30">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg rotate-12 flex items-center justify-center shadow-[0_0_15px_rgba(var(--color-primary),0.5)]">
              <span className="font-black text-white -rotate-12">S</span>
            </div>
            <span className="text-xl font-bold tracking-tighter">{config.title}</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <NavLink href="#services">서비스</NavLink>
            <NavLink href="#portfolio">포트폴리오</NavLink>
            <NavLink href="#blog">소식</NavLink>
            <NavLink href="#contact">문의하기</NavLink>
            <button 
              onClick={() => setIsAdminOpen(true)}
              className="p-2 hover:bg-surface rounded-full transition-colors text-gray-400 hover:text-primary"
            >
              <Settings size={20} />
            </button>
          </div>

          <button 
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background pt-24 px-6 flex flex-col gap-6"
          >
            <MobileNavLink href="#services" onClick={() => setIsMobileMenuOpen(false)}>서비스</MobileNavLink>
            <MobileNavLink href="#portfolio" onClick={() => setIsMobileMenuOpen(false)}>포트폴리오</MobileNavLink>
            <MobileNavLink href="#blog" onClick={() => setIsMobileMenuOpen(false)}>소식</MobileNavLink>
            <MobileNavLink href="#contact" onClick={() => setIsMobileMenuOpen(false)}>문의하기</MobileNavLink>
            <button 
              onClick={() => { setIsAdminOpen(true); setIsMobileMenuOpen(false); }}
              className="flex items-center gap-2 text-xl font-medium text-gray-400"
            >
              <Settings size={24} /> 관리자 설정
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/10 blur-[120px] rounded-full -z-10" />
        
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6 border border-primary/20">
              Logo & Web Design Studio
            </span>
            <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-[1.1] whitespace-pre-line mb-8">
              {config.hero.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
              {config.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="#contact"
                className="w-full sm:w-auto px-10 py-5 bg-primary hover:bg-primary/80 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 group shadow-lg shadow-primary/20"
              >
                {config.hero.ctaText}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#portfolio"
                className="w-full sm:w-auto px-10 py-5 bg-surface hover:bg-surface/80 text-white font-bold rounded-2xl border border-border transition-all flex items-center justify-center gap-2"
              >
                포트폴리오 보기
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-6 bg-surface/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div>
              <h2 className="text-4xl md:text-6xl font-black mb-4">Our Services</h2>
              <p className="text-gray-400 text-lg">우리는 브랜드의 본질을 담아내는 디자인을 추구합니다.</p>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-primary font-bold">01</div>
              <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-gray-600 font-bold">02</div>
              <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-gray-600 font-bold">03</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ServiceCard 
              title="Logo Design" 
              description="브랜드의 철학과 가치를 하나의 심볼에 담아냅니다. 시대를 타지 않는 미니멀하고 강력한 로고를 제작합니다."
              features={["심볼형/워드마크형", "브랜드 가이드라인", "고해상도 원본 제공"]}
            />
            <ServiceCard 
              title="Web Design" 
              description="사용자 경험을 최우선으로 생각하는 현대적인 웹사이트를 제작합니다. 모든 기기에서 완벽하게 작동합니다."
              features={["반응형 레이아웃", "SEO 최적화", "인터랙티브 애니메이션"]}
            />
            <ServiceCard 
              title="Branding" 
              description="로고부터 폰트, 컬러, 그래픽 모티프까지 브랜드의 전체적인 시각적 언어를 구축합니다."
              features={["비주얼 아이덴티티", "패키지 디자인", "마케팅 에셋"]}
            />
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-6">Portfolio</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {['All', 'Logo', 'Website', 'Branding'].map(cat => (
                <button key={cat} className="px-6 py-2 rounded-full border border-border hover:border-primary hover:text-primary transition-all font-medium">
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {portfolio.map((item, idx) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-surface mb-6 hover-glow transition-all duration-500">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-10">
                    <div className="flex items-center gap-2 text-white font-bold">
                      상세보기 <ExternalLink size={18} />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-primary font-bold text-sm mb-1">{item.category}</p>
                    <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">{item.title}</h3>
                  </div>
                  <ArrowRight className="text-gray-600 group-hover:text-primary group-hover:translate-x-2 transition-all" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-32 px-6 bg-surface/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black mb-16">Latest News</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {blog.map((post) => (
              <div 
                key={post.id} 
                className="flex flex-col md:flex-row gap-8 group cursor-pointer"
                onClick={() => setSelectedPost(post)}
              >
                <div className="w-full md:w-64 h-48 overflow-hidden rounded-2xl shrink-0">
                  <img 
                    src={post.imageUrl} 
                    alt="" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-sm text-gray-500 mb-2">{post.date}</span>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="text-gray-400 line-clamp-2 mb-4">{post.excerpt}</p>
                  <div className="flex items-center gap-1 text-primary font-bold text-sm">
                    더 읽어보기 <ChevronRight size={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Detail Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl overflow-y-auto p-6 md:p-20"
          >
            <div className="max-w-4xl mx-auto">
              <button 
                onClick={() => setSelectedPost(null)}
                className="fixed top-8 right-8 p-3 bg-surface rounded-full hover:bg-primary transition-colors z-[110]"
              >
                <X size={24} />
              </button>
              
              <img src={selectedPost.imageUrl} alt="" className="w-full aspect-video object-cover rounded-[40px] mb-12" />
              <span className="text-primary font-bold mb-4 block">{selectedPost.date}</span>
              <h2 className="text-4xl md:text-6xl font-black mb-12">{selectedPost.title}</h2>
              
              <div className="prose prose-invert prose-purple max-w-none">
                <ReactMarkdown>{selectedPost.content}</ReactMarkdown>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-4xl md:text-6xl font-black mb-8">Let's Create<br />Something Great</h2>
              <p className="text-gray-400 text-lg mb-12 leading-relaxed">
                새로운 프로젝트를 시작할 준비가 되셨나요? <br />
                아이디어를 현실로 만들어 드립니다. 편하게 문의해 주세요.
              </p>
              
              <div className="space-y-6">
                <ContactInfo icon={<Instagram />} label="Instagram" value="@sunhwa_design" />
                <ContactInfo icon={<MessageCircle />} label="KakaoTalk" value="선화디자인" />
                <ContactInfo icon={<Mail />} label="Email" value="contact@sunhwa.com" />
              </div>
            </div>

            <div className="bg-surface border border-border p-8 md:p-12 rounded-[40px]">
              <form className="space-y-6" onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                addInquiry({
                  id: Date.now().toString(),
                  name: formData.get('name') as string,
                  email: formData.get('email') as string,
                  phone: formData.get('phone') as string,
                  message: formData.get('message') as string,
                  date: new Date().toLocaleDateString(),
                });
                alert('문의가 성공적으로 접수되었습니다.');
                (e.target as HTMLFormElement).reset();
              }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-400">성함</label>
                    <input name="name" required type="text" className="w-full bg-background border border-border rounded-2xl px-6 py-4 focus:border-primary outline-none transition-colors" placeholder="홍길동" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-400">이메일</label>
                    <input name="email" required type="email" className="w-full bg-background border border-border rounded-2xl px-6 py-4 focus:border-primary outline-none transition-colors" placeholder="example@email.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400">핸드폰 번호</label>
                  <input name="phone" required type="tel" className="w-full bg-background border border-border rounded-2xl px-6 py-4 focus:border-primary outline-none transition-colors" placeholder="010-0000-0000" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400">문의 내용</label>
                  <textarea name="message" required className="w-full bg-background border border-border rounded-2xl px-6 py-4 focus:border-primary outline-none transition-colors h-40" placeholder="프로젝트에 대해 설명해 주세요." />
                </div>
                <button type="submit" className="w-full py-5 bg-primary hover:bg-primary/80 text-white font-black rounded-2xl transition-all shadow-lg shadow-primary/20">
                  문의 보내기
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
              <span className="text-[10px] font-black text-white">S</span>
            </div>
            <span className="font-bold">{config.title}</span>
          </div>
          <p className="text-gray-500 text-sm">© 2024 Sunhwa Design. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 hover:text-white transition-colors"><Instagram size={20} /></a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors"><MessageCircle size={20} /></a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors"><Mail size={20} /></a>
          </div>
        </div>
      </footer>

      {/* Admin Dashboard Overlay */}
      <AnimatePresence>
        {isAdminOpen && <AdminDashboard onClose={() => setIsAdminOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}

function NavLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <a href={href} className="text-sm font-bold text-gray-400 hover:text-white transition-colors relative group">
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
    </a>
  );
}

function MobileNavLink({ href, children, onClick }: { href: string, children: React.ReactNode, onClick: () => void }) {
  return (
    <a href={href} onClick={onClick} className="text-3xl font-black text-white hover:text-primary transition-colors">
      {children}
    </a>
  );
}

function ServiceCard({ title, description, features }: { title: string, description: string, features: string[] }) {
  return (
    <div className="bg-surface border border-border p-10 rounded-[40px] hover:border-primary/50 transition-all group">
      <h3 className="text-3xl font-bold mb-6 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-gray-400 leading-relaxed mb-8">{description}</p>
      <ul className="space-y-3">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-2 text-sm font-medium text-gray-300">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContactInfo({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-2xl bg-surface border border-border flex items-center justify-center text-primary">
        {icon}
      </div>
      <div>
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{label}</p>
        <p className="text-lg font-bold">{value}</p>
      </div>
    </div>
  );
}
