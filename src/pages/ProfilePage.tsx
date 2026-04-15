import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { MOCK_MANGA, getBookmarks, getReadingProgress } from '@/data/manga';

interface ProfilePageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export default function ProfilePage({ onNavigate }: ProfilePageProps) {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [progress, setProgress] = useState<Record<string, number>>({});

  useEffect(() => {
    setBookmarks(getBookmarks());
    setProgress(getReadingProgress());
  }, []);

  const chaptersRead = Object.values(progress).reduce((sum, ch) => sum + ch, 0);
  const mangaStarted = Object.keys(progress).length;
  const mangaCompleted = Object.entries(progress).filter(([id, ch]) => {
    const manga = MOCK_MANGA.find(m => m.id === id);
    return manga && ch >= manga.chapters.length;
  }).length;

  const recentManga = MOCK_MANGA
    .filter(m => progress[m.id])
    .slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-8 pb-24 md:pb-8">
      {/* Profile header */}
      <div className="bg-card border border-border rounded-xl p-6 mb-8 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center flex-shrink-0 animate-pulse-glow">
            <Icon name="User" size={36} className="text-primary" />
          </div>
          <div className="flex-1">
            <h1 className="font-oswald text-2xl font-bold">Гость</h1>
            <p className="font-golos text-muted-foreground text-sm mt-1">Читатель с хорошим вкусом</p>
            <div className="flex gap-4 mt-3">
              <div className="text-center">
                <div className="font-oswald text-lg font-bold text-primary">{bookmarks.length}</div>
                <div className="font-golos text-xs text-muted-foreground">Закладок</div>
              </div>
              <div className="text-center">
                <div className="font-oswald text-lg font-bold text-accent">{chaptersRead}</div>
                <div className="font-golos text-xs text-muted-foreground">Глав прочитано</div>
              </div>
              <div className="text-center">
                <div className="font-oswald text-lg font-bold text-green-400">{mangaCompleted}</div>
                <div className="font-golos text-xs text-muted-foreground">Завершено</div>
              </div>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-secondary border border-border text-sm font-golos text-muted-foreground hover:text-foreground px-4 py-2 rounded-lg transition-all">
            <Icon name="Settings" size={14} />
            Настройки
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Stats */}
        <div className="md:col-span-1 space-y-4">
          <h2 className="font-oswald text-lg font-bold uppercase tracking-wide">Статистика</h2>
          {[
            { label: 'Начато тайтлов', value: mangaStarted, icon: 'BookOpen', color: 'text-blue-400' },
            { label: 'Завершено', value: mangaCompleted, icon: 'CheckCircle', color: 'text-green-400' },
            { label: 'В закладках', value: bookmarks.length, icon: 'Bookmark', color: 'text-primary' },
            { label: 'Глав прочитано', value: chaptersRead, icon: 'FileText', color: 'text-accent' },
          ].map(stat => (
            <div key={stat.label} className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg">
              <Icon name={stat.icon} size={20} className={stat.color} />
              <div className="flex-1">
                <div className="font-golos text-xs text-muted-foreground">{stat.label}</div>
                <div className="font-oswald font-bold text-lg">{stat.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent */}
        <div className="md:col-span-2 space-y-4">
          <h2 className="font-oswald text-lg font-bold uppercase tracking-wide">Недавно читал</h2>
          {recentManga.length > 0 ? (
            <div className="space-y-2">
              {recentManga.map(manga => {
                const lastChapter = progress[manga.id] || 0;
                const totalChapters = manga.chapters.length;
                const pct = Math.round((lastChapter / totalChapters) * 100);
                return (
                  <div
                    key={manga.id}
                    onClick={() => onNavigate('manga', { id: manga.id })}
                    className="flex gap-4 p-3 bg-card border border-border rounded-lg hover:border-primary/40 cursor-pointer transition-all group"
                  >
                    <img src={manga.cover} alt={manga.titleRu} className="w-12 h-16 object-cover rounded flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-oswald font-semibold text-sm group-hover:text-primary transition-colors">{manga.titleRu}</h3>
                      <p className="font-golos text-xs text-muted-foreground mt-0.5">Глава {lastChapter} / {totalChapters}</p>
                      <div className="mt-2 h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                    <button
                      onClick={e => { e.stopPropagation(); onNavigate('reader', { id: manga.id, chapter: String(lastChapter) }); }}
                      className="self-center bg-primary text-white px-3 py-1.5 rounded text-xs font-oswald uppercase tracking-wide hover:bg-primary/90 transition-all"
                    >
                      Читать
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 bg-card border border-border rounded-lg">
              <Icon name="BookOpen" size={40} className="text-muted-foreground mx-auto mb-3" />
              <p className="font-golos text-sm text-muted-foreground">Ты ещё ничего не читал</p>
              <button
                onClick={() => onNavigate('catalog')}
                className="mt-4 bg-primary text-white px-4 py-2 rounded font-oswald text-sm uppercase tracking-wide hover:bg-primary/90 transition-all"
              >
                В каталог
              </button>
            </div>
          )}

          {/* Preferences */}
          <div className="bg-card border border-border rounded-lg p-4 mt-4">
            <h3 className="font-oswald font-semibold mb-4 uppercase tracking-wide text-sm">Настройки чтения</h3>
            <div className="space-y-3">
              {[
                { label: 'Тёмная тема', active: true },
                { label: 'Вертикальное чтение', active: true },
                { label: 'Уведомления о новых главах', active: false },
              ].map(opt => (
                <div key={opt.label} className="flex items-center justify-between">
                  <span className="font-golos text-sm">{opt.label}</span>
                  <div className={`w-10 h-5 rounded-full flex items-center transition-all ${opt.active ? 'bg-primary' : 'bg-secondary'}`}>
                    <div className={`w-4 h-4 bg-white rounded-full transition-all mx-0.5 ${opt.active ? 'translate-x-5' : 'translate-x-0'}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
