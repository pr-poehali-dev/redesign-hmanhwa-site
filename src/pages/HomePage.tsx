import { useState, useEffect } from 'react';
import MangaCard from '@/components/MangaCard';
import Icon from '@/components/ui/icon';
import { MOCK_MANGA } from '@/data/manga';

interface HomePageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const [heroIndex, setHeroIndex] = useState(0);
  const featured = MOCK_MANGA.slice(0, 4);
  const hero = featured[heroIndex];
  const trending = MOCK_MANGA.slice(0, 6);
  const newUpdates = MOCK_MANGA.slice(2, 8);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex(i => (i + 1) % featured.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [featured.length]);

  return (
    <div className="pb-20 md:pb-0">
      {/* Hero */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700"
          style={{ backgroundImage: `url(${hero.cover})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        <div className="grid-bg absolute inset-0 opacity-30" />

        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-xl animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-primary text-white text-xs font-oswald font-bold px-2 py-1 rounded uppercase tracking-wider">
                В тренде
              </span>
              <div className="flex items-center gap-1">
                <Icon name="Star" size={14} className="text-accent fill-accent" />
                <span className="text-accent font-oswald font-bold">{hero.rating}</span>
              </div>
            </div>

            <h1 className="font-oswald text-5xl md:text-6xl font-bold leading-none mb-3 text-glow">
              {hero.titleRu.toUpperCase()}
            </h1>
            <p className="font-golos text-xs text-muted-foreground mb-2 uppercase tracking-widest">
              {hero.title} · {hero.author} · {hero.year}
            </p>
            <p className="font-golos text-muted-foreground leading-relaxed mb-6 line-clamp-3 max-w-md">
              {hero.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {hero.genres.slice(0, 3).map(g => (
                <span key={g} className="text-xs bg-secondary border border-border text-foreground px-3 py-1 rounded-full font-golos">
                  {g}
                </span>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => onNavigate('manga', { id: hero.id })}
                className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded font-oswald font-semibold uppercase tracking-wide transition-all glow-red hover:glow-red"
              >
                <Icon name="BookOpen" size={16} />
                Читать
              </button>
              <button
                onClick={() => onNavigate('manga', { id: hero.id })}
                className="flex items-center gap-2 bg-secondary hover:bg-secondary/80 text-foreground px-6 py-3 rounded font-oswald font-semibold uppercase tracking-wide transition-all border border-border"
              >
                <Icon name="Info" size={16} />
                Подробнее
              </button>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {featured.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroIndex(i)}
              className={`h-1.5 rounded-full transition-all ${i === heroIndex ? 'w-6 bg-primary' : 'w-1.5 bg-muted-foreground/50'}`}
            />
          ))}
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Trending */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-primary rounded-full" />
              <h2 className="font-oswald text-2xl font-bold uppercase tracking-wide">Популярное</h2>
            </div>
            <button
              onClick={() => onNavigate('catalog')}
              className="flex items-center gap-1 text-primary hover:text-primary/80 text-sm font-golos transition-colors"
            >
              Все <Icon name="ChevronRight" size={14} />
            </button>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {trending.map((manga, i) => (
              <div key={manga.id} className={`animate-fade-in stagger-${Math.min(i + 1, 6)}`}>
                <MangaCard manga={manga} onNavigate={onNavigate} size="sm" />
              </div>
            ))}
          </div>
        </section>

        {/* New updates */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-accent rounded-full" />
              <h2 className="font-oswald text-2xl font-bold uppercase tracking-wide">Новые главы</h2>
            </div>
            <button
              onClick={() => onNavigate('catalog')}
              className="flex items-center gap-1 text-primary hover:text-primary/80 text-sm font-golos transition-colors"
            >
              Все <Icon name="ChevronRight" size={14} />
            </button>
          </div>
          <div className="space-y-2">
            {newUpdates.map((manga, i) => (
              <div
                key={manga.id}
                onClick={() => onNavigate('manga', { id: manga.id })}
                className={`flex items-center gap-4 p-3 rounded-lg bg-card border border-border hover:border-primary/40 cursor-pointer transition-all animate-fade-in stagger-${Math.min(i + 1, 6)} group`}
              >
                <img src={manga.cover} alt={manga.titleRu} className="w-12 h-16 object-cover rounded" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-oswald font-semibold text-sm group-hover:text-primary transition-colors truncate">
                    {manga.titleRu}
                  </h3>
                  <p className="text-muted-foreground text-xs font-golos mt-0.5">{manga.author}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-primary font-golos">Глава {manga.chapters[0]?.number}</span>
                    <span className="text-xs text-muted-foreground font-golos">{manga.chapters[0]?.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Icon name="Eye" size={14} />
                  <span className="text-xs font-golos">{(manga.views / 1000).toFixed(0)}K</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stats banner */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Тайтлов', value: '12,400+', icon: 'BookOpen' },
            { label: 'Читателей', value: '340K+', icon: 'Users' },
            { label: 'Глав', value: '890K+', icon: 'FileText' },
            { label: 'Обновлений в день', value: '200+', icon: 'Zap' },
          ].map((stat, i) => (
            <div key={stat.label} className={`bg-card border border-border rounded-lg p-4 text-center animate-fade-in stagger-${i + 1}`}>
              <Icon name={stat.icon} size={24} className="text-primary mx-auto mb-2" />
              <div className="font-oswald text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="font-golos text-xs text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
