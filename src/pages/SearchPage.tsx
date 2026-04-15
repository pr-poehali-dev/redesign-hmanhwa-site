import { useState } from 'react';
import MangaCard from '@/components/MangaCard';
import Icon from '@/components/ui/icon';
import { MOCK_MANGA, ALL_TAGS, ALL_GENRES } from '@/data/manga';

interface SearchPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export default function SearchPage({ onNavigate }: SearchPageProps) {
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState('');

  const results = MOCK_MANGA.filter(m => {
    const q = query.toLowerCase();
    const matchesQuery = !q ||
      m.titleRu.toLowerCase().includes(q) ||
      m.title.toLowerCase().includes(q) ||
      m.author.toLowerCase().includes(q) ||
      m.genres.some(g => g.toLowerCase().includes(q));
    const matchesTag = !activeTag || m.tags.includes(activeTag) || m.genres.includes(activeTag);
    return matchesQuery && matchesTag;
  });

  return (
    <div className="container mx-auto px-4 py-8 pb-24 md:pb-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1 h-6 bg-primary rounded-full" />
        <h1 className="font-oswald text-3xl font-bold uppercase tracking-wide">Поиск</h1>
      </div>

      {/* Search input */}
      <div className="relative max-w-2xl mb-8">
        <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Название, автор, жанр..."
          className="w-full pl-12 pr-4 py-4 bg-card border border-border rounded-lg font-golos text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors text-lg"
          autoFocus
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <Icon name="X" size={16} />
          </button>
        )}
      </div>

      {/* Popular tags */}
      <div className="mb-8">
        <h3 className="font-oswald text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          Популярные теги
        </h3>
        <div className="flex flex-wrap gap-2">
          {[...ALL_GENRES.slice(0, 6), ...ALL_TAGS.slice(0, 8)].map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? '' : tag)}
              className={`text-sm px-3 py-1.5 rounded-full border transition-all font-golos ${
                activeTag === tag
                  ? 'bg-primary border-primary text-white'
                  : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {query || activeTag ? (
        <>
          <div className="flex items-center gap-2 mb-4">
            <span className="font-golos text-muted-foreground text-sm">
              Найдено: <strong className="text-foreground">{results.length}</strong>
            </span>
          </div>
          {results.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
              {results.map((manga, i) => (
                <div key={manga.id} className={`animate-fade-in stagger-${Math.min(i + 1, 6)}`}>
                  <MangaCard manga={manga} onNavigate={onNavigate} size="sm" />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Icon name="SearchX" size={48} className="text-muted-foreground mx-auto mb-4" />
              <p className="font-oswald text-xl text-muted-foreground">Ничего не найдено</p>
              <p className="font-golos text-sm text-muted-foreground mt-2">Попробуйте другой запрос</p>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-5 bg-accent rounded-full" />
            <h2 className="font-oswald text-xl font-bold uppercase tracking-wide">Все тайтлы</h2>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {MOCK_MANGA.map((manga, i) => (
              <div key={manga.id} className={`animate-fade-in stagger-${Math.min(i + 1, 6)}`}>
                <MangaCard manga={manga} onNavigate={onNavigate} size="sm" />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
