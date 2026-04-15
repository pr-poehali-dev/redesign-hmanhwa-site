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

const ANIME_GIRL_LEFT = 'https://cdn.poehali.dev/projects/890dfb9b-4803-4b66-ae9a-6aa6aac2bc72/files/527abc44-5f21-42a7-afdf-f8c18470557b.jpg';
const ANIME_GIRL_RIGHT = 'https://cdn.poehali.dev/projects/890dfb9b-4803-4b66-ae9a-6aa6aac2bc72/files/f9e879a9-45b3-4c16-8a6a-cb0b75977048.jpg';

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

      {/* ─── Anime girls — bottom anchored, 50vh tall ─── */}
      {/* LEFT GIRL */}
      <div
        className="fixed bottom-0 left-0 pointer-events-none z-10 hidden xl:block animate-float"
        style={{ width: '18vw', maxWidth: '260px', minWidth: '160px' }}
      >
        {/* Neon ground glow */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16 rounded-full blur-2xl opacity-50"
          style={{ background: 'radial-gradient(ellipse, rgba(0,255,255,0.4) 0%, transparent 70%)', transform: 'scaleX(1.5)' }}
        />
        {/* Vertical edge line */}
        <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-400/60 to-cyan-400/20" />
        <img
          src={ANIME_GIRL_LEFT}
          alt=""
          className="w-full object-contain object-bottom"
          style={{
            height: '50vh',
            minHeight: '320px',
            maskImage: 'linear-gradient(to right, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.85) 35%, rgba(0,0,0,1) 65%, rgba(0,0,0,0.6) 85%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.85) 35%, rgba(0,0,0,1) 65%, rgba(0,0,0,0.6) 85%, transparent 100%)',
            filter: 'drop-shadow(0 0 18px rgba(0,255,255,0.5)) drop-shadow(0 0 40px rgba(0,255,255,0.25)) brightness(1.05)',
          }}
        />
      </div>

      {/* RIGHT GIRL */}
      <div
        className="fixed bottom-0 right-0 pointer-events-none z-10 hidden xl:block animate-float"
        style={{ width: '18vw', maxWidth: '260px', minWidth: '160px', animationDelay: '1.8s' }}
      >
        {/* Neon ground glow */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16 rounded-full blur-2xl opacity-50"
          style={{ background: 'radial-gradient(ellipse, rgba(0,255,128,0.4) 0%, transparent 70%)', transform: 'scaleX(1.5)' }}
        />
        {/* Vertical edge line */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-green-400/60 to-green-400/20" />
        <img
          src={ANIME_GIRL_RIGHT}
          alt=""
          className="w-full object-contain object-bottom scale-x-[-1]"
          style={{
            height: '50vh',
            minHeight: '320px',
            maskImage: 'linear-gradient(to left, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.85) 35%, rgba(0,0,0,1) 65%, rgba(0,0,0,0.6) 85%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.85) 35%, rgba(0,0,0,1) 65%, rgba(0,0,0,0.6) 85%, transparent 100%)',
            filter: 'drop-shadow(0 0 18px rgba(0,255,128,0.5)) drop-shadow(0 0 40px rgba(0,255,128,0.25)) brightness(1.05)',
          }}
        />
      </div>

      {/* ─── Header ─── */}
      <header className="sticky top-0 z-50 backdrop-blur-xl" style={{ background: 'hsl(220 20% 6% / 0.92)', borderBottom: '1px solid hsl(180 100% 50% / 0.15)' }}>
        {/* Top neon accent line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60" />

        <div className="container mx-auto px-6 h-16 flex items-center justify-between relative">
          {/* Logo */}
          <button onClick={() => onNavigate('home')} className="flex items-center gap-2.5 group">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all group-hover:scale-105"
              style={{ background: 'hsl(180 100% 50%)', boxShadow: '0 0 16px hsl(180 100% 50% / 0.5)' }}
            >
              <span className="font-oswald font-bold text-sm text-black">M</span>
            </div>
            <span className="font-oswald font-bold text-xl tracking-wider">
              MANGA<span className="text-primary" style={{ textShadow: '0 0 12px hsl(180 100% 50% / 0.8)' }}>VERSE</span>
            </span>
          </button>

          {/* Desktop Nav — pill style like Crunchyroll */}
          <nav className="hidden md:flex items-center gap-1 p-1 rounded-2xl" style={{ background: 'hsl(220 20% 10% / 0.8)', border: '1px solid hsl(180 100% 50% / 0.1)' }}>
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-sm font-golos font-medium transition-all"
                style={currentPage === item.id ? {
                  background: 'hsl(180 100% 50%)',
                  color: '#000',
                  fontWeight: 700,
                  boxShadow: '0 0 14px hsl(180 100% 50% / 0.45)',
                } : { color: 'hsl(210 30% 55%)' }}
                onMouseEnter={e => { if (currentPage !== item.id) (e.currentTarget as HTMLButtonElement).style.color = 'hsl(180 100% 75%)'; }}
                onMouseLeave={e => { if (currentPage !== item.id) (e.currentTarget as HTMLButtonElement).style.color = 'hsl(210 30% 55%)'; }}
              >
                <Icon name={item.icon} size={14} />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right side icons */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => onNavigate('search')}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
              style={{ background: 'hsl(220 20% 12%)', border: '1px solid hsl(180 100% 50% / 0.15)', color: 'hsl(180 60% 65%)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'hsl(180 100% 50% / 0.5)'; (e.currentTarget as HTMLButtonElement).style.color = 'hsl(180 100% 65%)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'hsl(180 100% 50% / 0.15)'; (e.currentTarget as HTMLButtonElement).style.color = 'hsl(180 60% 65%)'; }}
            >
              <Icon name="Search" size={16} />
            </button>
            <button
              onClick={() => onNavigate('profile')}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
              style={{ background: 'hsl(180 100% 50% / 0.12)', border: '1px solid hsl(180 100% 50% / 0.3)', color: 'hsl(180 100% 60%)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'hsl(180 100% 50% / 0.2)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'hsl(180 100% 50% / 0.12)'; }}
            >
              <Icon name="User" size={16} />
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center transition-all"
            style={{ background: 'hsl(220 20% 12%)', border: '1px solid hsl(180 100% 50% / 0.2)', color: 'hsl(180 60% 65%)' }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Icon name={mobileMenuOpen ? 'X' : 'Menu'} size={18} />
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden backdrop-blur-xl animate-fade-in px-4 pb-3" style={{ borderTop: '1px solid hsl(180 100% 50% / 0.15)' }}>
            <nav className="flex flex-col gap-1 pt-3">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => { onNavigate(item.id); setMobileMenuOpen(false); }}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-golos font-medium transition-all text-left"
                  style={currentPage === item.id ? {
                    background: 'hsl(180 100% 50%)',
                    color: '#000',
                    fontWeight: 700,
                    boxShadow: '0 0 12px hsl(180 100% 50% / 0.4)',
                  } : { color: 'hsl(210 30% 55%)' }}
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
      <footer className="relative z-10 mt-16" style={{ borderTop: '1px solid hsl(180 100% 50% / 0.12)', background: 'hsl(220 20% 5%)' }}>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-xl flex items-center justify-center" style={{ background: 'hsl(180 100% 50%)', boxShadow: '0 0 10px hsl(180 100% 50% / 0.4)' }}>
                <span className="text-black font-oswald font-bold text-xs">M</span>
              </div>
              <span className="font-oswald font-bold text-sm tracking-wider">
                MANGA<span className="text-primary" style={{ textShadow: '0 0 8px hsl(180 100% 50% / 0.6)' }}>VERSE</span>
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              © 2025 MangaVerse
            </div>
            <div className="flex gap-2">
              {['О сайте', 'Правила', 'Контакты'].map(link => (
                <button
                  key={link}
                  className="px-3 py-1 rounded-lg text-sm transition-all"
                  style={{ color: 'hsl(210 30% 50%)', border: '1px solid hsl(180 100% 50% / 0.1)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = 'hsl(180 100% 65%)'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'hsl(180 100% 50% / 0.35)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'hsl(210 30% 50%)'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'hsl(180 100% 50% / 0.1)'; }}
                >
                  {link}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ─── Bottom mobile nav ─── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 backdrop-blur-xl" style={{ background: 'hsl(220 20% 5% / 0.97)', borderTop: '1px solid hsl(180 100% 50% / 0.18)' }}>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
        <nav className="flex items-center justify-around h-16 px-3">
          {navItems.slice(0, 5).map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-all"
              style={currentPage === item.id ? {
                color: 'hsl(180 100% 50%)',
                filter: 'drop-shadow(0 0 6px hsl(180 100% 50% / 0.7))',
              } : { color: 'hsl(210 25% 40%)' }}
            >
              <Icon name={item.icon} size={19} />
              <span className="text-[10px] font-golos">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}