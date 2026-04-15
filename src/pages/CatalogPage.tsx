import { useState } from 'react';
import MangaCard from '@/components/MangaCard';
import Icon from '@/components/ui/icon';
import { MOCK_MANGA, ALL_GENRES } from '@/data/manga';

interface CatalogPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

type SortKey = 'rating' | 'views' | 'chapters' | 'title';

export default function CatalogPage({ onNavigate }: CatalogPageProps) {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortKey>('rating');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const toggleGenre = (g: string) =>
    setSelectedGenres(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]);

  const filtered = MOCK_MANGA
    .filter(m => !selectedGenres.length || selectedGenres.some(g => m.genres.includes(g)))
    .filter(m => !selectedStatus || m.status === selectedStatus)
    .filter(m => !selectedType || m.type === selectedType)
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'views') return b.views - a.views;
      if (sortBy === 'chapters') return b.chapters.length - a.chapters.length;
      return a.titleRu.localeCompare(b.titleRu);
    });

  return (
    <div className="container mx-auto px-4 py-8 pb-24 md:pb-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1 h-6 bg-primary rounded-full" />
        <h1 className="font-oswald text-3xl font-bold uppercase tracking-wide">Каталог</h1>
        <span className="text-muted-foreground text-sm font-golos">({filtered.length} тайтлов)</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters */}
        <aside className="lg:w-56 flex-shrink-0">
          <div className="bg-card border border-border rounded-lg p-4 space-y-5 sticky top-20">
            {/* Status */}
            <div>
              <h3 className="font-oswald text-sm font-semibold uppercase tracking-wider mb-3 text-muted-foreground">Статус</h3>
              <div className="space-y-1">
                {[
                  { value: '', label: 'Все' },
                  { value: 'ongoing', label: 'Выходит' },
                  { value: 'completed', label: 'Завершён' },
                  { value: 'hiatus', label: 'Пауза' },
                ].map(s => (
                  <button
                    key={s.value}
                    onClick={() => setSelectedStatus(s.value)}
                    className={`w-full text-left px-2 py-1.5 rounded text-sm font-golos transition-all ${
                      selectedStatus === s.value ? 'bg-primary text-white' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Type */}
            <div>
              <h3 className="font-oswald text-sm font-semibold uppercase tracking-wider mb-3 text-muted-foreground">Тип</h3>
              <div className="space-y-1">
                {[
                  { value: '', label: 'Все' },
                  { value: 'manga', label: 'Манга' },
                  { value: 'manhwa', label: 'Манхва' },
                  { value: 'manhua', label: 'Маньхуа' },
                ].map(t => (
                  <button
                    key={t.value}
                    onClick={() => setSelectedType(t.value)}
                    className={`w-full text-left px-2 py-1.5 rounded text-sm font-golos transition-all ${
                      selectedType === t.value ? 'bg-primary text-white' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Genres */}
            <div>
              <h3 className="font-oswald text-sm font-semibold uppercase tracking-wider mb-3 text-muted-foreground">Жанры</h3>
              <div className="flex flex-wrap gap-1.5">
                {ALL_GENRES.slice(0, 12).map(g => (
                  <button
                    key={g}
                    onClick={() => toggleGenre(g)}
                    className={`text-xs px-2 py-1 rounded-full border transition-all font-golos ${
                      selectedGenres.includes(g)
                        ? 'bg-primary border-primary text-white'
                        : 'border-border text-muted-foreground hover:border-primary hover:text-foreground'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Reset */}
            {(selectedGenres.length || selectedStatus || selectedType) ? (
              <button
                onClick={() => { setSelectedGenres([]); setSelectedStatus(''); setSelectedType(''); }}
                className="w-full text-xs text-primary hover:text-primary/80 font-golos transition-colors"
              >
                Сбросить фильтры
              </button>
            ) : null}
          </div>
        </aside>

        {/* Content */}
        <div className="flex-1">
          {/* Sort & View */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground font-golos">Сортировка:</span>
              {([
                ['rating', 'Рейтинг'],
                ['views', 'Просмотры'],
                ['chapters', 'Главы'],
                ['title', 'Название'],
              ] as [SortKey, string][]).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setSortBy(key)}
                  className={`text-xs px-2 py-1 rounded font-golos transition-all ${
                    sortBy === key ? 'bg-primary text-white' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="flex gap-1">
              <button onClick={() => setView('grid')} className={`p-1.5 rounded transition-all ${view === 'grid' ? 'bg-primary text-white' : 'text-muted-foreground hover:text-foreground'}`}>
                <Icon name="Grid3X3" size={14} />
              </button>
              <button onClick={() => setView('list')} className={`p-1.5 rounded transition-all ${view === 'list' ? 'bg-primary text-white' : 'text-muted-foreground hover:text-foreground'}`}>
                <Icon name="List" size={14} />
              </button>
            </div>
          </div>

          {view === 'grid' ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
              {filtered.map((manga, i) => (
                <div key={manga.id} className={`animate-fade-in stagger-${Math.min(i + 1, 6)}`}>
                  <MangaCard manga={manga} onNavigate={onNavigate} size="sm" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((manga, i) => (
                <div
                  key={manga.id}
                  onClick={() => onNavigate('manga', { id: manga.id })}
                  className={`flex gap-4 p-4 bg-card border border-border rounded-lg hover:border-primary/40 cursor-pointer transition-all group animate-fade-in stagger-${Math.min(i + 1, 6)}`}
                >
                  <img src={manga.cover} alt={manga.titleRu} className="w-16 h-24 object-cover rounded flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-oswald font-semibold group-hover:text-primary transition-colors">{manga.titleRu}</h3>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Icon name="Star" size={12} className="text-accent fill-accent" />
                        <span className="font-oswald font-bold text-sm">{manga.rating}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-xs font-golos mt-1">{manga.author} · {manga.year}</p>
                    <p className="text-muted-foreground text-xs font-golos mt-2 line-clamp-2">{manga.description}</p>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {manga.genres.slice(0, 3).map(g => (
                        <span key={g} className="text-[10px] bg-secondary text-muted-foreground px-2 py-0.5 rounded-full font-golos">{g}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <Icon name="SearchX" size={48} className="text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground font-golos">Ничего не найдено. Попробуйте изменить фильтры.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
