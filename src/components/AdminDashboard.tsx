import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  Settings, 
  MessageSquare, 
  X, 
  Plus, 
  Trash2, 
  Edit2,
  BarChart3
} from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { PortfolioItem, BlogPost } from '../types';

export default function AdminDashboard({ onClose }: { onClose: () => void }) {
  const { 
    config, updateConfig, 
    portfolio, addPortfolio, updatePortfolio, deletePortfolio,
    blog, addBlog, updateBlog, deleteBlog,
    inquiries 
  } = useSite();
  
  const [activeTab, setActiveTab] = useState<'stats' | 'config' | 'portfolio' | 'blog' | 'inquiries'>('stats');

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex"
    >
      {/* Sidebar */}
      <div className="w-64 border-r border-border p-6 flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-primary">관리자 모드</h2>
          <button onClick={onClose} className="p-1 hover:bg-surface rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          <TabButton active={activeTab === 'stats'} onClick={() => setActiveTab('stats')} icon={<BarChart3 size={18} />} label="통계 요약" />
          <TabButton active={activeTab === 'config'} onClick={() => setActiveTab('config')} icon={<Settings size={18} />} label="사이트 설정" />
          <TabButton active={activeTab === 'portfolio'} onClick={() => setActiveTab('portfolio')} icon={<Briefcase size={18} />} label="포트폴리오 관리" />
          <TabButton active={activeTab === 'blog'} onClick={() => setActiveTab('blog')} icon={<FileText size={18} />} label="블로그 관리" />
          <TabButton active={activeTab === 'inquiries'} onClick={() => setActiveTab('inquiries')} icon={<MessageSquare size={18} />} label="문의 내역" />
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-10">
        <AnimatePresence mode="wait">
          {activeTab === 'stats' && <StatsView inquiries={inquiries} />}
          {activeTab === 'config' && <ConfigView config={config} updateConfig={updateConfig} />}
          {activeTab === 'portfolio' && <PortfolioView items={portfolio} onAdd={addPortfolio} onUpdate={updatePortfolio} onDelete={deletePortfolio} />}
          {activeTab === 'blog' && <BlogView posts={blog} onAdd={addBlog} onUpdate={updateBlog} onDelete={deleteBlog} />}
          {activeTab === 'inquiries' && <InquiriesView inquiries={inquiries} />}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function TabButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        active ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-400 hover:bg-surface hover:text-white'
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );
}

function StatsView({ inquiries }: { inquiries: any[] }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
      <h3 className="text-2xl font-bold">방문자 통계 요약</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="오늘 방문자" value="128" trend="+12%" />
        <StatCard label="누적 방문자" value="4,290" trend="+5%" />
        <StatCard label="새로운 문의" value={inquiries.length.toString()} trend="New" />
      </div>
      <div className="bg-surface border border-border rounded-2xl p-8 h-64 flex items-center justify-center text-gray-500">
        차트 플레이스홀더 (D3.js 연동 가능)
      </div>
    </motion.div>
  );
}

function StatCard({ label, value, trend }: { label: string, value: string, trend: string }) {
  return (
    <div className="bg-surface border border-border p-6 rounded-2xl">
      <p className="text-gray-400 text-sm mb-1">{label}</p>
      <div className="flex items-end justify-between">
        <h4 className="text-3xl font-bold">{value}</h4>
        <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full">{trend}</span>
      </div>
    </div>
  );
}

function ConfigView({ config, updateConfig }: { config: any, updateConfig: any }) {
  const [formData, setFormData] = useState(config);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfig(formData);
    alert('설정이 저장되었습니다.');
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="max-w-2xl">
      <h3 className="text-2xl font-bold mb-8">사이트 기본 설정</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">사이트 제목</label>
            <input 
              type="text" 
              value={formData.title} 
              onChange={e => setFormData({...formData, title: e.target.value})}
              className="w-full bg-surface border border-border rounded-xl px-4 py-3 focus:border-primary outline-none transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">포인트 컬러 (Primary)</label>
            <div className="flex gap-2">
              <input 
                type="color" 
                value={formData.colors.primary} 
                onChange={e => setFormData({...formData, colors: { ...formData.colors, primary: e.target.value }})}
                className="w-12 h-12 bg-transparent border-none cursor-pointer"
              />
              <input 
                type="text" 
                value={formData.colors.primary} 
                onChange={e => setFormData({...formData, colors: { ...formData.colors, primary: e.target.value }})}
                className="flex-1 bg-surface border border-border rounded-xl px-4 py-3 focus:border-primary outline-none transition-colors"
              />
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">히어로 타이틀</label>
          <textarea 
            value={formData.hero.title} 
            onChange={e => setFormData({...formData, hero: { ...formData.hero, title: e.target.value }})}
            className="w-full bg-surface border border-border rounded-xl px-4 py-3 focus:border-primary outline-none transition-colors h-32"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">히어로 서브타이틀</label>
          <textarea 
            value={formData.hero.subtitle} 
            onChange={e => setFormData({...formData, hero: { ...formData.hero, subtitle: e.target.value }})}
            className="w-full bg-surface border border-border rounded-xl px-4 py-3 focus:border-primary outline-none transition-colors h-24"
          />
        </div>
        <button type="submit" className="bg-primary hover:bg-primary/80 text-white font-bold py-4 px-8 rounded-xl transition-all">
          변경사항 저장
        </button>
      </form>
    </motion.div>
  );
}

function PortfolioView({ items, onAdd, onUpdate, onDelete }: { items: PortfolioItem[], onAdd: any, onUpdate: any, onDelete: any }) {
  const [isEditing, setIsEditing] = useState<PortfolioItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const item = {
      id: isEditing?.id || Date.now().toString(),
      title: formData.get('title') as string,
      category: formData.get('category') as any,
      imageUrl: formData.get('imageUrl') as string,
      description: formData.get('description') as string,
    };

    if (isEditing) {
      onUpdate(item);
    } else {
      onAdd(item);
    }
    setIsEditing(null);
    setIsAdding(false);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">포트폴리오 관리</h3>
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 bg-primary px-4 py-2 rounded-lg font-bold text-sm"
        >
          <Plus size={16} /> 항목 추가
        </button>
      </div>

      {(isAdding || isEditing) && (
        <div className="bg-surface border border-primary/30 p-6 rounded-2xl space-y-4">
          <h4 className="font-bold text-lg">{isEditing ? '항목 수정' : '새 항목 추가'}</h4>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="title" defaultValue={isEditing?.title} placeholder="제목" required className="bg-background border border-border rounded-xl px-4 py-2 outline-none focus:border-primary" />
              <select name="category" defaultValue={isEditing?.category || 'Logo'} className="bg-background border border-border rounded-xl px-4 py-2 outline-none focus:border-primary">
                <option value="Logo">Logo</option>
                <option value="Website">Website</option>
                <option value="Branding">Branding</option>
              </select>
            </div>
            <input name="imageUrl" defaultValue={isEditing?.imageUrl} placeholder="이미지 URL" required className="w-full bg-background border border-border rounded-xl px-4 py-2 outline-none focus:border-primary" />
            <textarea name="description" defaultValue={isEditing?.description} placeholder="설명" className="w-full bg-background border border-border rounded-xl px-4 py-2 outline-none focus:border-primary h-24" />
            <div className="flex gap-2">
              <button type="submit" className="bg-primary px-6 py-2 rounded-lg font-bold">저장</button>
              <button type="button" onClick={() => { setIsEditing(null); setIsAdding(false); }} className="bg-border px-6 py-2 rounded-lg font-bold">취소</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map(item => (
          <div key={item.id} className="bg-surface border border-border p-4 rounded-xl flex gap-4 items-center">
            <img src={item.imageUrl} alt="" className="w-20 h-20 object-cover rounded-lg" />
            <div className="flex-1">
              <h4 className="font-bold">{item.title}</h4>
              <p className="text-xs text-gray-400">{item.category}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setIsEditing(item)} className="p-2 hover:bg-white/10 rounded-lg text-gray-400"><Edit2 size={16} /></button>
              <button onClick={() => onDelete(item.id)} className="p-2 hover:bg-red-500/10 rounded-lg text-red-500"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function BlogView({ posts, onAdd, onUpdate, onDelete }: { posts: BlogPost[], onAdd: any, onUpdate: any, onDelete: any }) {
  const [isEditing, setIsEditing] = useState<BlogPost | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const post = {
      id: isEditing?.id || Date.now().toString(),
      title: formData.get('title') as string,
      date: isEditing?.date || new Date().toISOString().split('T')[0],
      excerpt: formData.get('excerpt') as string,
      content: formData.get('content') as string,
      imageUrl: formData.get('imageUrl') as string,
    };

    if (isEditing) {
      onUpdate(post);
    } else {
      onAdd(post);
    }
    setIsEditing(null);
    setIsAdding(false);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">블로그 관리</h3>
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 bg-primary px-4 py-2 rounded-lg font-bold text-sm"
        >
          <Plus size={16} /> 새 글 작성
        </button>
      </div>

      {(isAdding || isEditing) && (
        <div className="bg-surface border border-primary/30 p-6 rounded-2xl space-y-4">
          <h4 className="font-bold text-lg">{isEditing ? '글 수정' : '새 글 작성'}</h4>
          <form onSubmit={handleSave} className="space-y-4">
            <input name="title" defaultValue={isEditing?.title} placeholder="제목" required className="w-full bg-background border border-border rounded-xl px-4 py-2 outline-none focus:border-primary" />
            <input name="imageUrl" defaultValue={isEditing?.imageUrl} placeholder="이미지 URL" required className="w-full bg-background border border-border rounded-xl px-4 py-2 outline-none focus:border-primary" />
            <textarea name="excerpt" defaultValue={isEditing?.excerpt} placeholder="요약 (리스트 노출용)" className="w-full bg-background border border-border rounded-xl px-4 py-2 outline-none focus:border-primary h-20" />
            <textarea name="content" defaultValue={isEditing?.content} placeholder="내용 (마크다운 지원)" className="w-full bg-background border border-border rounded-xl px-4 py-2 outline-none focus:border-primary h-48 font-mono text-sm" />
            <div className="flex gap-2">
              <button type="submit" className="bg-primary px-6 py-2 rounded-lg font-bold">저장</button>
              <button type="button" onClick={() => { setIsEditing(null); setIsAdding(false); }} className="bg-border px-6 py-2 rounded-lg font-bold">취소</button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {posts.map(post => (
          <div key={post.id} className="bg-surface border border-border p-4 rounded-xl flex justify-between items-center">
            <div>
              <h4 className="font-bold">{post.title}</h4>
              <p className="text-xs text-gray-400">{post.date}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setIsEditing(post)} className="p-2 hover:bg-white/10 rounded-lg text-gray-400"><Edit2 size={16} /></button>
              <button onClick={() => onDelete(post.id)} className="p-2 hover:bg-red-500/10 rounded-lg text-red-500"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function InquiriesView({ inquiries }: { inquiries: any[] }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
      <h3 className="text-2xl font-bold">문의 내역 확인</h3>
      {inquiries.length === 0 ? (
        <div className="bg-surface border border-border rounded-2xl p-12 text-center text-gray-500">
          아직 접수된 문의가 없습니다.
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.map(inquiry => (
            <div key={inquiry.id} className="bg-surface border border-border p-6 rounded-2xl">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-bold text-lg">{inquiry.name}</h4>
                  <p className="text-sm text-primary">{inquiry.email} | {inquiry.phone}</p>
                </div>
                <span className="text-xs text-gray-500">{inquiry.date}</span>
              </div>
              <p className="text-gray-300 leading-relaxed">{inquiry.message}</p>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
