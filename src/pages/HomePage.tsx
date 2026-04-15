import { useState, useEffect } from 'react';
import MangaCard from '@/components/MangaCard';
import Icon from '@/components/ui/icon';
import { MOCK_MANGA, MOCK_NEWS } from '@/data/manga';

interface HomePageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

const GENRES = [
  { label: 'Экшен', icon: 'Swords', count: 1240 },
  { label: 'Фэнтези', icon: 'Sparkles', count: 980 },
  { label: 'Романтика', icon: 'Heart', count: 870 },
  { label: 'Приключения', icon: 'Compass', count: 760 },
  { label: 'Драма', icon: 'Drama', count: 650 },
  { label: 'Комедия', icon: 'Laugh', count: 590 },
  { label: 'Ужасы', icon: 'Ghost', count: 430 },
  { label: 'Исторические', icon: 'Landmark', count: 380 },
];

const RECENT_UPDATES = [
  { mangaId: '1', chapter: 187, chapterTitle: 'Монарх теней', date: '2 мин назад', views: '12.4K' },
  { mangaId: '3', chapter: 590, chapterTitle: 'Игра в смерть', date: '14 мин назад', views: '8.1K' },
  { mangaId: '4', chapter: 161, chapterTitle: 'Контракт с дьяволом', date: '31 мин назад', views: '15.2K' },
  { mangaId: '2', chapter: 374, chapterTitle: '', date: '1 час назад', views: '6.3K' },
  { mangaId: '5', chapter: 180, chapterTitle: 'Звезда сценария', date: '2 часа назад', views: '9.7K' },
  { mangaId: '6', chapter: 315, chapterTitle: 'Путь самурая', date: '3 часа назад', views: '4.2K' },
  { mangaId: '7', chapter: 205, chapterTitle: 'Дыхание пламени', date: '4 часа назад', views: '18.9K' },
  { mangaId: '8', chapter: 178, chapterTitle: 'Пробуждение', date: '5 часов назад', views: '7.6K' },
];

export default function HomePage({ onNavigate }: HomePageProps) {
  const [heroIndex, setHeroIndex] = useState(0);
  const featured = MOCK_MANGA.slice(0, 5);
  const hero = featured[heroIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex(i => (i + 1) % featured.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [featured.length]);

  return (
    <div className="pb-20 md:pb-0">
      {/* ─── HERO ─── */}
      <section className="relative h-[480px] md:h-[560px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700 scale-105"
          style={{ backgroundImage: `url(${hero.cover})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/20" />

        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-lg animate-fade-in">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-primary text-white text-[10px] font-oswald font-bold px-2 py-0.5 rounded uppercase tracking-widest animate-pulse-glow">
                ★ В тренде
              </span>
              <span className="text-muted-foreground text-xs font-golos">#{heroIndex + 1} эта неделя</span>
            </div>
            <h1 className="font-oswald text-4xl md:text-6xl font-bold leading-none mb-2 text-glow">
              {hero.titleRu.toUpperCase()}
            </h1>
            <p className="font-golos text-xs text-muted-foreground mb-4 tracking-widest uppercase">
              {hero.title} · {hero.author} · {hero.year}
            </p>
            <p className="font-golos text-muted-foreground leading-relaxed mb-5 line-clamp-2 text-sm max-w-md">
              {hero.description}
            </p>
            <div className="flex flex-wrap gap-1.5 mb-5">
              {hero.genres.slice(0, 3).map(g => (
                <span key={g} className="text-xs bg-secondary/80 border border-border/50 text-foreground px-2.5 py-0.5 rounded-full font-golos">
                  {g}
                </span>
              ))}
            </div>
            <div className="flex gap-2 mb-4">
              <div className="flex items-center gap-1 bg-black/40 px-2.5 py-1 rounded">
                <Icon name="Star" size={12} className="text-yellow-400 fill-yellow-400" />
                <span className="font-oswald font-bold text-sm text-white">{hero.rating}</span>
              </div>
              <div className="flex items-center gap-1 bg-black/40 px-2.5 py-1 rounded">
                <Icon name="Eye" size={12} className="text-muted-foreground" />
                <span className="font-golos text-xs text-white">{(hero.views / 1000000).toFixed(1)}M</span>
              </div>
              <div className="flex items-center gap-1 bg-black/40 px-2.5 py-1 rounded">
                <Icon name="FileText" size={12} className="text-muted-foreground" />
                <span className="font-golos text-xs text-white">{hero.chapters.length} гл.</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onNavigate('manga', { id: hero.id })}
                className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded font-oswald font-semibold uppercase tracking-wide transition-all glow-red text-sm"
              >
                <Icon name="BookOpen" size={15} />
                Читать
              </button>
              <button
                onClick={() => onNavigate('manga', { id: hero.id })}
                className="flex items-center gap-2 bg-black/40 hover:bg-black/60 border border-white/20 text-white px-5 py-2.5 rounded font-oswald font-semibold uppercase tracking-wide transition-all text-sm"
              >
                <Icon name="Info" size={15} />
                Подробнее
              </button>
            </div>
          </div>
        </div>

        {/* Thumbnail strip */}
        <div className="absolute right-4 bottom-8 hidden lg:flex gap-2">
          {featured.map((m, i) => (
            <button
              key={m.id}
              onClick={() => setHeroIndex(i)}
              className={`relative overflow-hidden rounded transition-all duration-300 ${i === heroIndex ? 'ring-2 ring-primary scale-105' : 'opacity-50 hover:opacity-80'}`}
            >
              <img src={m.cover} alt={m.titleRu} className="w-12 h-16 object-cover" />
            </button>
          ))}
        </div>

        {/* Dots mobile */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 lg:hidden">
          {featured.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroIndex(i)}
              className={`h-1 rounded-full transition-all ${i === heroIndex ? 'w-5 bg-primary' : 'w-1 bg-white/30'}`}
            />
          ))}
        </div>
      </section>

      <div className="container mx-auto px-4 py-6 space-y-10">

        {/* ─── GENRES ─── */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-0.5 h-5 bg-primary" />
              <h2 className="font-oswald text-xl font-bold uppercase tracking-wide">Жанры</h2>
            </div>
            <button onClick={() => onNavigate('catalog')} className="text-primary text-xs font-golos hover:underline flex items-center gap-1">
              Все <Icon name="ChevronRight" size={12} />
            </button>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {GENRES.map((g, i) => (
              <button
                key={g.label}
                onClick={() => onNavigate('catalog')}
                className={`group flex flex-col items-center gap-1.5 py-3 px-1 bg-card border border-border rounded-lg hover:border-primary/60 hover:bg-primary/5 transition-all animate-fade-in stagger-${Math.min(i + 1, 6)}`}
              >
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/20 transition-all">
                  <Icon name={g.icon} size={16} className="text-primary" />
                </div>
                <span className="font-golos text-[10px] text-foreground leading-none">{g.label}</span>
                <span className="font-golos text-[9px] text-muted-foreground">{g.count.toLocaleString()}</span>
              </button>
            ))}
          </div>
        </section>

        {/* ─── POPULAR BY VIEWS ─── */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-0.5 h-5 bg-orange-500" />
              <h2 className="font-oswald text-xl font-bold uppercase tracking-wide">Популярное по просмотрам</h2>
            </div>
            <button onClick={() => onNavigate('catalog')} className="text-primary text-xs font-golos hover:underline flex items-center gap-1">
              Все <Icon name="ChevronRight" size={12} />
            </button>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-8 gap-3">
            {MOCK_MANGA.map((manga, i) => (
              <div key={manga.id} className={`animate-fade-in stagger-${Math.min(i + 1, 6)}`}>
                <MangaCard
                  manga={manga}
                  onNavigate={onNavigate}
                  size="sm"
                  badge={i === 0 ? 'hot' : i === 1 ? 'top' : undefined}
                  rank={i + 1}
                />
              </div>
            ))}
          </div>
        </section>

        {/* ─── MAIN GRID: updates + news ─── */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Recent chapter updates */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-0.5 h-5 bg-accent" />
                <h2 className="font-oswald text-xl font-bold uppercase tracking-wide">Лента новых глав</h2>
              </div>
              <button onClick={() => onNavigate('catalog')} className="text-primary text-xs font-golos hover:underline flex items-center gap-1">
                Ещё <Icon name="ChevronRight" size={12} />
              </button>
            </div>

            <div className="bg-card border border-border rounded-lg overflow-hidden divide-y divide-border">
              {RECENT_UPDATES.map((upd, i) => {
                const manga = MOCK_MANGA.find(m => m.id === upd.mangaId);
                if (!manga) return null;
                return (
                  <div
                    key={`${upd.mangaId}-${upd.chapter}`}
                    onClick={() => onNavigate('reader', { id: manga.id, chapter: String(upd.chapter) })}
                    className={`flex items-center gap-3 px-3 py-2.5 hover:bg-secondary/50 cursor-pointer transition-all group ${i % 2 === 0 ? '' : 'bg-secondary/20'}`}
                  >
                    <img src={manga.cover} alt={manga.titleRu} className="w-10 h-14 object-cover rounded flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-oswald font-semibold text-xs group-hover:text-primary transition-colors truncate">
                        {manga.titleRu}
                      </h4>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-primary text-[10px] font-golos font-medium">
                          Глава {upd.chapter}
                          {upd.chapterTitle ? `: ${upd.chapterTitle}` : ''}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-muted-foreground text-[10px] font-golos">{upd.date}</span>
                        <span className="text-muted-foreground text-[10px] flex items-center gap-0.5">
                          <Icon name="Eye" size={9} />{upd.views}
                        </span>
                      </div>
                    </div>
                    <Icon name="ChevronRight" size={14} className="text-muted-foreground group-hover:text-primary flex-shrink-0" />
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => onNavigate('catalog')}
              className="w-full mt-2 py-2.5 bg-secondary border border-border rounded-lg text-xs font-golos text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
            >
              Загрузить ещё
            </button>
          </div>

          {/* News sidebar */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-0.5 h-5 bg-blue-500" />
                <h2 className="font-oswald text-xl font-bold uppercase tracking-wide">Новости</h2>
              </div>
              <button onClick={() => onNavigate('news')} className="text-primary text-xs font-golos hover:underline flex items-center gap-1">
                Все <Icon name="ChevronRight" size={12} />
              </button>
            </div>

            <div className="space-y-3">
              {MOCK_NEWS.slice(0, 4).map((news, i) => (
                <article
                  key={news.id}
                  onClick={() => onNavigate('newsItem', { id: news.id })}
                  className="group flex gap-3 cursor-pointer"
                >
                  <div className="relative w-20 h-16 flex-shrink-0 rounded overflow-hidden">
                    <img src={news.cover} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    {i === 0 && (
                      <div className="absolute top-0 left-0 bg-primary text-white text-[9px] font-oswald px-1 py-0.5">
                        ГЛАВНОЕ
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] text-primary font-oswald uppercase tracking-wide">{news.category}</span>
                    <h4 className="font-golos font-medium text-xs leading-snug mt-0.5 line-clamp-2 group-hover:text-primary transition-colors">
                      {news.title}
                    </h4>
                    <span className="text-[10px] text-muted-foreground font-golos mt-1 block">{news.date}</span>
                  </div>
                </article>
              ))}
            </div>

            {/* Popular by bookmarks */}
            <div className="mt-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-0.5 h-5 bg-primary" />
                <h2 className="font-oswald text-xl font-bold uppercase tracking-wide">По закладкам</h2>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {MOCK_MANGA.slice(0, 6).map((manga, i) => (
                  <div key={manga.id} className={`animate-fade-in stagger-${Math.min(i + 1, 6)}`}>
                    <MangaCard
                      manga={manga}
                      onNavigate={onNavigate}
                      size="sm"
                      badge={i === 0 ? 'new' : undefined}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ─── MANHWA ON HUB ─── */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-0.5 h-5 bg-green-500" />
              <h2 className="font-oswald text-xl font-bold uppercase tracking-wide">Манхва на хабе</h2>
            </div>
            <button onClick={() => onNavigate('catalog')} className="text-primary text-xs font-golos hover:underline flex items-center gap-1">
              Все <Icon name="ChevronRight" size={12} />
            </button>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-8 gap-3">
            {MOCK_MANGA.filter(m => m.type === 'manhwa').map((manga, i) => (
              <div key={manga.id} className={`animate-fade-in stagger-${Math.min(i + 1, 6)}`}>
                <MangaCard
                  manga={manga}
                  onNavigate={onNavigate}
                  size="sm"
                  badge={i === 0 ? 'new' : i === 1 ? 'hot' : undefined}
                />
              </div>
            ))}
          </div>
        </section>

        {/* ─── LATEST CHAPTER LIST ─── */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-0.5 h-5 bg-primary" />
              <h2 className="font-oswald text-xl font-bold uppercase tracking-wide">Лента новых глав</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-1.5">
            {[...RECENT_UPDATES, ...RECENT_UPDATES].slice(0, 16).map((upd, i) => {
              const manga = MOCK_MANGA.find(m => m.id === upd.mangaId);
              if (!manga) return null;
              return (
                <div
                  key={`list-${i}`}
                  onClick={() => onNavigate('reader', { id: manga.id, chapter: String(upd.chapter) })}
                  className="flex items-center gap-2.5 px-3 py-2 bg-card border border-border rounded hover:border-primary/40 cursor-pointer transition-all group"
                >
                  <img src={manga.cover} alt={manga.titleRu} className="w-8 h-11 object-cover rounded flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-oswald font-semibold text-[11px] group-hover:text-primary transition-colors truncate">{manga.titleRu}</h4>
                    <span className="text-primary text-[10px] font-golos">Глава {upd.chapter}</span>
                  </div>
                  <span className="text-muted-foreground text-[10px] font-golos flex-shrink-0">{upd.date}</span>
                </div>
              );
            })}
          </div>
          <button
            onClick={() => onNavigate('catalog')}
            className="w-full mt-3 py-3 bg-secondary border border-border rounded-lg text-xs font-oswald uppercase tracking-widest text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
          >
            Загрузить ещё
          </button>
        </section>

      </div>
    </div>
  );
}
