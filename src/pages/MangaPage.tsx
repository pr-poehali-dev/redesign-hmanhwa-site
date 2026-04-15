import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { MOCK_MANGA, getReadingProgress, saveReadingProgress, getBookmarks, toggleBookmark } from '@/data/manga';

interface MangaPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
  params?: Record<string, string>;
}

const STATUS_MAP = {
  ongoing: { label: 'Выходит', color: 'text-green-400 border-green-400/30 bg-green-400/10' },
  completed: { label: 'Завершён', color: 'text-blue-400 border-blue-400/30 bg-blue-400/10' },
  hiatus: { label: 'Пауза', color: 'text-accent border-accent/30 bg-accent/10' },
};

export default function MangaPage({ onNavigate, params }: MangaPageProps) {
  const manga = MOCK_MANGA.find(m => m.id === params?.id) || MOCK_MANGA[0];
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [lastChapter, setLastChapter] = useState<number | null>(null);
  const [showAllChapters, setShowAllChapters] = useState(false);

  useEffect(() => {
    setIsBookmarked(getBookmarks().includes(manga.id));
    const p = getReadingProgress();
    setLastChapter(p[manga.id] || null);
  }, [manga.id]);

  const handleBookmark = () => {
    const result = toggleBookmark(manga.id);
    setIsBookmarked(result);
  };

  const handleRead = (chapterNumber: number) => {
    saveReadingProgress(manga.id, chapterNumber);
    setLastChapter(chapterNumber);
    onNavigate('reader', { id: manga.id, chapter: String(chapterNumber) });
  };

  const displayedChapters = showAllChapters ? manga.chapters : manga.chapters.slice(0, 20);

  return (
    <div className="pb-24 md:pb-0">
      {/* Banner */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${manga.cover})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
        <button
          onClick={() => onNavigate('catalog')}
          className="absolute top-4 left-4 flex items-center gap-1 bg-black/50 hover:bg-black/70 text-white px-3 py-1.5 rounded font-golos text-sm transition-all"
        >
          <Icon name="ArrowLeft" size={14} />
          Назад
        </button>
      </div>

      <div className="container mx-auto px-4 -mt-24 relative">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Cover */}
          <div className="md:w-48 flex-shrink-0">
            <img
              src={manga.cover}
              alt={manga.titleRu}
              className="w-36 md:w-48 rounded-lg border-2 border-border shadow-2xl"
            />
          </div>

          {/* Info */}
          <div className="flex-1 pt-4 md:pt-16">
            <h1 className="font-oswald text-3xl md:text-4xl font-bold leading-tight mb-1">{manga.titleRu}</h1>
            <p className="font-golos text-muted-foreground text-sm mb-4">{manga.title} · {manga.author}</p>

            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span className={`text-xs px-2.5 py-1 rounded-full border font-golos font-medium ${STATUS_MAP[manga.status].color}`}>
                {STATUS_MAP[manga.status].label}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full border border-border text-muted-foreground font-golos">
                {manga.type === 'manhwa' ? 'Манхва' : manga.type === 'manga' ? 'Манга' : 'Маньхуа'}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full border border-border text-muted-foreground font-golos">
                {manga.year}
              </span>
              <div className="flex items-center gap-1">
                <Icon name="Star" size={14} className="text-accent fill-accent" />
                <span className="font-oswald font-bold text-sm">{manga.rating}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3 mb-6">
              <button
                onClick={() => handleRead(lastChapter || manga.chapters[manga.chapters.length - 1]?.number || 1)}
                className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded font-oswald font-semibold uppercase tracking-wide transition-all glow-red"
              >
                <Icon name="BookOpen" size={16} />
                {lastChapter ? `Продолжить (гл. ${lastChapter})` : 'Читать с начала'}
              </button>
              <button
                onClick={handleBookmark}
                className={`flex items-center gap-2 px-5 py-2.5 rounded font-oswald font-semibold uppercase tracking-wide transition-all border ${
                  isBookmarked
                    ? 'bg-primary/20 border-primary text-primary'
                    : 'bg-secondary border-border text-muted-foreground hover:border-primary hover:text-primary'
                }`}
              >
                <Icon name="Bookmark" size={16} className={isBookmarked ? 'fill-primary' : ''} />
                {isBookmarked ? 'В закладках' : 'В закладки'}
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded font-oswald font-semibold uppercase tracking-wide transition-all border border-border bg-secondary text-muted-foreground hover:text-foreground">
                <Icon name="Share2" size={16} />
              </button>
            </div>

            {/* Description */}
            <p className="font-golos text-muted-foreground leading-relaxed text-sm mb-5">
              {manga.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {[...manga.genres, ...manga.tags].map(tag => (
                <button
                  key={tag}
                  onClick={() => onNavigate('tags', { tag })}
                  className="text-xs px-2.5 py-1 bg-secondary border border-border rounded-full text-muted-foreground hover:border-primary/50 hover:text-primary font-golos transition-all"
                >
                  #{tag}
                </button>
              ))}
            </div>

            {/* Stats */}
            <div className="flex gap-6 pt-4 border-t border-border">
              {[
                { label: 'Просмотры', value: (manga.views / 1000).toFixed(0) + 'K', icon: 'Eye' },
                { label: 'Закладки', value: (manga.bookmarks / 1000).toFixed(0) + 'K', icon: 'Bookmark' },
                { label: 'Глав', value: manga.chapters.length, icon: 'FileText' },
              ].map(s => (
                <div key={s.label} className="flex items-center gap-2">
                  <Icon name={s.icon} size={14} className="text-muted-foreground" />
                  <div>
                    <div className="font-oswald font-bold text-sm">{s.value}</div>
                    <div className="font-golos text-[10px] text-muted-foreground">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chapters list */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-1 h-5 bg-primary rounded-full" />
              <h2 className="font-oswald text-xl font-bold uppercase tracking-wide">
                Главы <span className="text-muted-foreground text-base">({manga.chapters.length})</span>
              </h2>
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            {displayedChapters.map((chapter, i) => {
              const isRead = lastChapter !== null && chapter.number <= lastChapter;
              return (
                <div
                  key={chapter.id}
                  onClick={() => handleRead(chapter.number)}
                  className={`flex items-center gap-4 px-4 py-3 border-b border-border last:border-0 hover:bg-secondary cursor-pointer transition-all group ${
                    i % 2 === 0 ? '' : 'bg-secondary/30'
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${isRead ? 'bg-primary/40' : 'bg-muted-foreground/30'}`} />
                  <div className="flex-1 min-w-0">
                    <span className={`font-golos text-sm transition-colors ${isRead ? 'text-muted-foreground' : 'text-foreground group-hover:text-primary'}`}>
                      {chapter.title}
                    </span>
                  </div>
                  <span className="font-golos text-xs text-muted-foreground flex-shrink-0">{chapter.date}</span>
                  {lastChapter === chapter.number && (
                    <span className="text-[10px] bg-primary text-white px-1.5 py-0.5 rounded font-oswald">Здесь</span>
                  )}
                </div>
              );
            })}
          </div>
          {manga.chapters.length > 20 && (
            <button
              onClick={() => setShowAllChapters(!showAllChapters)}
              className="w-full mt-3 py-3 bg-secondary border border-border rounded-lg text-sm font-golos text-muted-foreground hover:text-foreground transition-all"
            >
              {showAllChapters ? 'Скрыть' : `Показать все ${manga.chapters.length} глав`}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
