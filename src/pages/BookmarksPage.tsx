import { useState, useEffect } from 'react';
import MangaCard from '@/components/MangaCard';
import Icon from '@/components/ui/icon';
import { MOCK_MANGA, getBookmarks, getReadingProgress } from '@/data/manga';

interface BookmarksPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export default function BookmarksPage({ onNavigate }: BookmarksPageProps) {
  const [bookmarkIds, setBookmarkIds] = useState<string[]>([]);
  const [progress, setProgress] = useState<Record<string, number>>({});

  useEffect(() => {
    setBookmarkIds(getBookmarks());
    setProgress(getReadingProgress());
  }, []);

  const bookmarked = MOCK_MANGA.filter(m => bookmarkIds.includes(m.id));
  const reading = bookmarked.filter(m => progress[m.id]);
  const notStarted = bookmarked.filter(m => !progress[m.id]);

  return (
    <div className="container mx-auto px-4 py-8 pb-24 md:pb-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1 h-6 bg-primary rounded-full" />
        <h1 className="font-oswald text-3xl font-bold uppercase tracking-wide">Закладки</h1>
        <span className="text-muted-foreground text-sm font-golos">({bookmarked.length})</span>
      </div>

      {bookmarked.length === 0 ? (
        <div className="text-center py-20">
          <Icon name="Bookmark" size={56} className="text-muted-foreground mx-auto mb-4" />
          <h2 className="font-oswald text-2xl text-muted-foreground mb-2">Закладок пока нет</h2>
          <p className="font-golos text-sm text-muted-foreground mb-6">
            Добавляйте мангу в закладки, чтобы не потерять
          </p>
          <button
            onClick={() => onNavigate('catalog')}
            className="bg-primary text-white px-6 py-3 rounded font-oswald uppercase tracking-wide hover:bg-primary/90 transition-all"
          >
            Перейти в каталог
          </button>
        </div>
      ) : (
        <div className="space-y-10">
          {/* Reading */}
          {reading.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1 h-5 bg-green-500 rounded-full" />
                <h2 className="font-oswald text-xl font-bold uppercase tracking-wide">Читаю</h2>
                <span className="text-muted-foreground text-sm font-golos">({reading.length})</span>
              </div>
              <div className="space-y-2">
                {reading.map(manga => {
                  const lastChapter = progress[manga.id];
                  const totalChapters = manga.chapters.length;
                  const progressPct = Math.round((lastChapter / totalChapters) * 100);
                  return (
                    <div
                      key={manga.id}
                      onClick={() => onNavigate('manga', { id: manga.id })}
                      className="flex items-center gap-4 p-3 bg-card border border-border rounded-lg hover:border-primary/40 cursor-pointer transition-all group"
                    >
                      <img src={manga.cover} alt={manga.titleRu} className="w-12 h-16 object-cover rounded flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-oswald font-semibold text-sm group-hover:text-primary transition-colors truncate">
                          {manga.titleRu}
                        </h3>
                        <p className="text-muted-foreground text-xs font-golos mt-0.5">
                          Глава {lastChapter} из {totalChapters}
                        </p>
                        <div className="mt-2 h-1 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full transition-all"
                            style={{ width: `${progressPct}%` }}
                          />
                        </div>
                        <p className="text-muted-foreground text-[10px] font-golos mt-1">{progressPct}% прочитано</p>
                      </div>
                      <button
                        onClick={e => { e.stopPropagation(); onNavigate('reader', { id: manga.id, chapter: String(lastChapter) }); }}
                        className="flex-shrink-0 bg-primary hover:bg-primary/90 text-white px-3 py-1.5 rounded text-xs font-oswald uppercase tracking-wide transition-all"
                      >
                        Продолжить
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Not started */}
          {notStarted.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1 h-5 bg-muted-foreground rounded-full" />
                <h2 className="font-oswald text-xl font-bold uppercase tracking-wide">Планирую</h2>
                <span className="text-muted-foreground text-sm font-golos">({notStarted.length})</span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                {notStarted.map((manga, i) => (
                  <div key={manga.id} className={`animate-fade-in stagger-${Math.min(i + 1, 6)}`}>
                    <MangaCard manga={manga} onNavigate={onNavigate} size="sm" />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
