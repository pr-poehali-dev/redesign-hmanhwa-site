import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface NavItem {
  id: string;
  label: string;
  icon: string;
}

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

const ANIME_GIRL_LEFT = 'https://cdn.poehali.dev/projects/890dfb9b-4803-4b66-ae9a-6aa6aac2bc72/files/36f6e2dd-5578-4a52-95f8-563b2e1d576a.jpg';
const ANIME_GIRL_RIGHT = 'https://cdn.poehali.dev/projects/890dfb9b-4803-4b66-ae9a-6aa6aac2bc72/files/139b81ff-45dc-4dad-a456-ad823c3bb734.jpg';

export default function Layout({ children, currentPage, onNavigate }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { id: 'home', label: 'Главная', icon: 'Home' },
    { id: 'catalog', label: 'Каталог', icon: 'BookOpen' },
    { id: 'search', label: 'Поиск', icon: 'Search' },
    { id: 'bookmarks', label: 'Закладки', icon: 'Bookmark' },
    { id: 'news', label: 'Новости', icon: 'Newspaper' },
    { id: 'profile', label: 'Профиль', icon: 'User' },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-x-hidden">

      {/* ─── Sci-fi global grid background ─── */}
      <div className="fixed inset-0 grid-bg pointer-events-none z-0 opacity-60" />

      {/* ─── Anime girls side decorations (only 2xl+) ─── */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 w-40 pointer-events-none z-10 hidden 2xl:block animate-float">
        <div className="relative">
          <img
            src={ANIME_GIRL_LEFT}
            alt=""
            className="w-full h-auto object-cover"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.9) 70%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.9) 70%, transparent 100%)',
              filter: 'drop-shadow(0 0 20px rgba(0,255,255,0.4)) drop-shadow(0 0 40px rgba(0,255,255,0.2))',
            }}
          />
          {/* Neon vertical line left */}
          <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-60" />
        </div>
      </div>

      <div className="fixed right-0 top-1/2 -translate-y-1/2 w-40 pointer-events-none z-10 hidden 2xl:block animate-float" style={{ animationDelay: '2s' }}>
        <div className="relative">
          <img
            src={ANIME_GIRL_RIGHT}
            alt=""
            className="w-full h-auto object-cover scale-x-[-1]"
            style={{
              maskImage: 'linear-gradient(to left, transparent 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.9) 70%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to left, transparent 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.9) 70%, transparent 100%)',
              filter: 'drop-shadow(0 0 20px rgba(0,255,128,0.4)) drop-shadow(0 0 40px rgba(0,255,128,0.2))',
            }}
          />
          {/* Neon vertical line right */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-green-400 to-transparent opacity-60" />
        </div>
      </div>

      {/* ─── Header ─── */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur-md" style={{ borderColor: 'hsl(180 100% 50% / 0.2)' }}>
        {/* Top neon accent line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-70" />

        <div className="container mx-auto px-4 h-16 flex items-center justify-between relative">
          {/* Logo */}
          <button onClick={() => onNavigate('home')} className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded flex items-center justify-center relative overflow-hidden border border-cyan-500/50 glow-cyan-sm group-hover:glow-cyan transition-all" style={{ background: 'hsl(180 100% 50%)' }}>
              <span className="font-oswald font-bold text-sm text-black relative z-10">M</span>
            </div>
            <span className="font-oswald font-bold text-xl tracking-wider animate-neon-flicker">
              MANGA<span className="text-primary" style={{ textShadow: '0 0 12px hsl(180 100% 50% / 0.8)' }}>VERSE</span>
            </span>
          </button>

          {/* Decorative sci-fi element center */}
          <div className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-500/50" />
            <div className="flex gap-1">
              {[1,2,3].map(i => (
                <div key={i} className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
              ))}
            </div>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-500/50" />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded text-sm font-golos font-medium transition-all relative ${
                  currentPage === item.id
                    ? 'text-black font-bold'
                    : 'text-muted-foreground hover:text-cyan-300'
                }`}
                style={currentPage === item.id ? {
                  background: 'hsl(180 100% 50%)',
                  boxShadow: '0 0 12px hsl(180 100% 50% / 0.5)',
                } : undefined}
              >
                <Icon name={item.icon} size={15} />
                {item.label}
                {currentPage === item.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
                )}
              </button>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-muted-foreground hover:text-cyan-400 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Icon name={mobileMenuOpen ? 'X' : 'Menu'} size={24} />
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-background/98 backdrop-blur-md animate-fade-in" style={{ borderColor: 'hsl(180 100% 50% / 0.2)' }}>
            <nav className="container mx-auto px-4 py-3 flex flex-col gap-1">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => { onNavigate(item.id); setMobileMenuOpen(false); }}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded text-sm font-golos font-medium transition-all text-left ${
                    currentPage === item.id
                      ? 'text-black font-bold'
                      : 'text-muted-foreground hover:text-cyan-300 hover:bg-secondary'
                  }`}
                  style={currentPage === item.id ? {
                    background: 'hsl(180 100% 50%)',
                    boxShadow: '0 0 12px hsl(180 100% 50% / 0.4)',
                  } : undefined}
                >
                  <Icon name={item.icon} size={16} />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* ─── Main content ─── */}
      <main className="flex-1 relative z-10">
        {children}
      </main>

      {/* ─── Footer ─── */}
      <footer className="relative z-10 mt-16" style={{ borderTop: '1px solid hsl(180 100% 50% / 0.2)', background: 'hsl(220 20% 6%)' }}>
        {/* Top neon line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50" />

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: 'hsl(180 100% 50%)', boxShadow: '0 0 8px hsl(180 100% 50% / 0.5)' }}>
                <span className="text-black font-oswald font-bold text-xs">M</span>
              </div>
              <span className="font-oswald font-bold text-sm tracking-wider">
                MANGA<span className="text-primary" style={{ textShadow: '0 0 8px hsl(180 100% 50% / 0.6)' }}>VERSE</span>
              </span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              © 2025 MangaVerse — читай мангу онлайн
            </div>
            <div className="flex gap-4">
              {['О сайте', 'Правила', 'Контакты'].map(link => (
                <button key={link} className="text-muted-foreground hover:text-cyan-400 text-sm transition-colors">
                  {link}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ─── Bottom mobile nav ─── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 backdrop-blur-md" style={{ borderTop: '1px solid hsl(180 100% 50% / 0.25)', background: 'hsl(220 20% 5% / 0.97)' }}>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50" />
        <nav className="flex items-center justify-around h-16 px-2">
          {navItems.slice(0, 5).map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded transition-all ${
                currentPage === item.id ? '' : 'text-muted-foreground'
              }`}
              style={currentPage === item.id ? {
                color: 'hsl(180 100% 50%)',
                filter: 'drop-shadow(0 0 6px hsl(180 100% 50% / 0.7))',
              } : undefined}
            >
              <Icon name={item.icon} size={20} />
              <span className="text-[10px] font-golos">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
