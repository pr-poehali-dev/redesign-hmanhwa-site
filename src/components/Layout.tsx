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
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center glow-red-sm group-hover:glow-red transition-all">
              <span className="text-white font-oswald font-bold text-sm">M</span>
            </div>
            <span className="font-oswald font-bold text-xl tracking-wider">
              MANGA<span className="text-primary">VERSE</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-golos font-medium transition-all ${
                  currentPage === item.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                <Icon name={item.icon} size={15} />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Icon name={mobileMenuOpen ? 'X' : 'Menu'} size={24} />
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background/95 animate-fade-in">
            <nav className="container mx-auto px-4 py-3 flex flex-col gap-1">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => { onNavigate(item.id); setMobileMenuOpen(false); }}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-golos font-medium transition-all text-left ${
                    currentPage === item.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  <Icon name={item.icon} size={16} />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Main */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                <span className="text-white font-oswald font-bold text-xs">M</span>
              </div>
              <span className="font-oswald font-bold text-sm tracking-wider">
                MANGA<span className="text-primary">VERSE</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              © 2025 MangaVerse — читай мангу онлайн
            </p>
            <div className="flex gap-4">
              {['О сайте', 'Правила', 'Контакты'].map(link => (
                <button key={link} className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  {link}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Bottom mobile nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-sm">
        <nav className="flex items-center justify-around h-16 px-2">
          {navItems.slice(0, 5).map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded transition-all ${
                currentPage === item.id ? 'text-primary' : 'text-muted-foreground'
              }`}
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
